import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling'; 
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2'; 
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


  }
}
