import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'; 
import * as iam from 'aws-cdk-lib/aws-iam';
import { PublicHostedZone, HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { LoadBalancerTarget} from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import { AutoScalingGroup, HealthCheck } from "aws-cdk-lib/aws-autoscaling";
import {
  AmazonLinuxGeneration,
  AmazonLinuxImage,
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType, 
  Vpc, 
  Peer, 
  Port, 
  SecurityGroup, 
  SubnetSelection,
} from "aws-cdk-lib/aws-ec2";

export class EvernodeHostStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Set up vpc 
    const vpc = new Vpc(this, 'EvernodeVpc', 
      {
        maxAzs: 2, 
        subnetConfiguration: [
          {
            cidrMask: 24, 
            name: 'EvernodePublic', 
            subnetType: SubnetType.PUBLIC, 
          }, 
          {
            cidrMask: 24, 
            name: 'EvernodePrivate', 
            subnetType: SubnetType.PRIVATE_ISOLATED
          },
        ],
      }
    );
  

    // Now let's set up dns record with existing domain name and integrate with load balancer 
    // Get the existing hosted zone
    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'EvernodeHostHostedZone', {
      hostedZoneId: 'YOUR_HOSTED_ZONE_ID',
      zoneName: 'example.com',
    });
    // Request an ACM certificate
    const certValidation = new certificatemanager.Certificate(this, 'EvernodeHostCertificate', {
      domainName: 'hello.example.com',
      certificateName: 'EvernodeHostCert', // Optionally provide an certificate name
      validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
    });


    // Set up the firewall rules for Load Balancer 
    // Create a security group
    const securityGroup = new SecurityGroup(this, 'EvernodeHostSecurityGroup', {
      vpc: vpc,
    });

    // Add an ingress rule to allow port 443 from everywhere
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(443), 'Allow port 443 from everywhere');

    // Set up the AWS Application LoadBalancer to loadblance and handle incoming traffics to backend Evernode Host Service
    const lb = new elbv2.ApplicationLoadBalancer(this, 'EvernodeHostLB', {
      vpc,
      internetFacing: true,
      loadBalancerName: "EvernodeHostLB", 
      securityGroup: securityGroup,
    });

    // Create a LB listener with port 443 to handle inbound connection
    const listener = lb.addListener('Listener', {
      port: 443,
      open: true,
      certificates: [
        elbv2.ListenerCertificate.fromArn(certValidation.certificateArn)
      ],
    });
  
   // Set up Evernode host instance autoscaling 
    const applicationAutoScalingGroup = new AutoScalingGroup(this, "AutoScalingGroup", {
      vpc: vpc,
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE4_GRAVITON,
        InstanceSize.MICRO
      ),
      machineImage: new AmazonLinuxImage({
        generation: AmazonLinuxGeneration.AMAZON_LINUX_2023,
      }),
      allowAllOutbound: true,
      maxCapacity: 2,
      minCapacity: 1,
      desiredCapacity: 1,
      spotPrice: "0.007", // $0.0032 per Hour when writing, $0.0084 per Hour on-demand
      healthCheck: HealthCheck.ec2(),
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_ISOLATED
      }
    });

    applicationAutoScalingGroup.scaleOnCpuUtilization("CpuScaling", {
        targetUtilizationPercent: 90,
        cooldown: cdk.Duration.minutes(1),
        estimatedInstanceWarmup: cdk.Duration.minutes(1),
    });
    // Adding Target to backend Evernode Instnace
    // const targetGroup = new elbv2.ApplicationTargetGroup(this, 'EvernodeHostTargetGroup', {
    //   vpc: vpc,
    //   port: 80,
    //   targetType: elbv2.TargetType.INSTANCE, 
    //   healthCheck: {
    //     enabled: true,
    //   },
    // });
    
    // listener.addTargetGroups('EvernodeHostTargetGroup', {
    //   targetGroups: [targetGroup],
      
    // });
    listener.addTargets('EvernodeHostASGTargets', {
        port: 80,
        targetGroupName: "EvernodeHostASGTargets", 
        targets: [applicationAutoScalingGroup]
      }
    );

    // Set up DNS record that puts the ELB created above 
    new ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: 'www.example.com',
      target: RecordTarget.fromAlias(new LoadBalancerTarget(lb)),
    });  
  }
}
