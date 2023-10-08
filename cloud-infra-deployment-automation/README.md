# Automating Evernode Host Provisioning in AWS
This repository contains the automation scripts for deploying the Evernode Host operator on AWS using the Infrastructure as Code (IaC) approach with AWS CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Prerequisites
Before deploying to AWS, make sure you have completed the following steps:

1. You have an AWS account and have created AWS IAM Programmatic Access from your computer.
2. You have a public domain name created using AWS Route 53. docs.aws.amazon.com
3. AWS CLI is installed and configured with the Programmatic Access key created above. docs.aws.amazon.com  
4. Create a SSH Key pair from the AWS console for host access over SSH from your computer
4. NodeJS and AWS CDK tool is installed on your computer. github.com

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk destroy`     Destroy the complete evernode host infrastructures deployed 




# Evernode Host Architecture Diagram in AWS
The following diagram illustrates how to host an Evernode host node on Amazon Web Services (AWS).

![Alt Text](./architecture/aws-host.png)