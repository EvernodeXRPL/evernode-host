import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling'; 
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'; 
import * as iam from 'aws-cdk-lib/aws-iam';
import { PublicHostedZone, HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { LoadBalancerTarget} from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';


export class EvernodeHostStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Set up vpc 
    const vpc = new ec2.Vpc(this, 'EvernodeVpc', 
      {
        maxAzs: 2, 
        subnetConfiguration: [
          {
            cidrMask: 24, 
            name: 'EvernodePublic', 
            subnetType: ec2.SubnetType.PUBLIC, 
          }, 
          {
            cidrMask: 24, 
            name: 'EvernodePrivate', 
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED
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
    const securityGroup = new ec2.SecurityGroup(this, 'EvernodeHostSecurityGroup', {
      vpc: vpc,
    });

    // Add an ingress rule to allow port 443 from everywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow port 443 from everywhere');

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
  
    // Adding Target to backend Evernode Instnace
    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'EvernodeHostTargetGroup', {
      vpc: vpc,
      port: 80,
      targetType: elbv2.TargetType.INSTANCE
    });
    
    listener.addTargetGroups('EvernodeHostTargetGroup', {
      targetGroups: [targetGroup],
      
    });

    // Set up DNS record that puts the ELB created above 
    new ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: 'www.example.com',
      target: RecordTarget.fromAlias(new LoadBalancerTarget(lb)),
    });
  
  }
}
