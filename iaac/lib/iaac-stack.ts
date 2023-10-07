import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling'; 
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'; 
import * as iam from 'aws-cdk-lib/aws-iam';



export class IaacStack extends cdk.Stack {
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

    // Set up the AWS Application LoadBalancer to loadblance inbound traffic to backend Evernode Host Service
    const lb = new elbv2.ApplicationLoadBalancer(this, 'HotpotLB', {
      vpc,
      internetFacing: true,
    });
  
    // Create a LB listener with port 443 to handle inbound connection
    const listener = lb.addListener('Listener', {
      port: 443,
      open: true,
      certificates: [
        elbv2.ListenerCertificate.fromArn('arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012')
      ],
    });
  
    // Adding Target to backend Evernode Instnace
    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'HotpotTargetGroup', {
      vpc: new ec2.Vpc(this, 'Vpc'),
      port: 80,
    });
    
    listener.addTargetGroups('HotpotTargetGroup', {
      targetGroups: [targetGroup],
    });

  }
}
