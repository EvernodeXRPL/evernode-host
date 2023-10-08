# Implementing Automation for Evernode Host Infrastructures Deployment within the AWS Ecosystem
This repository contains the automation scripts for deploying the Evernode Host operator on AWS using the Infrastructure as Code (IaC) approach with AWS CDK.

[NOTE]: This module only handles provisioning of the required infrastrcutre resources and it doesn't automate the Evernode host setup.

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




# [NOTE] 

## To deploy the Evernode stack, you need to have prior experience with AWS Environment and understand TypeScript and AWS CDK tool. Here's a brief overview of what you need to know:

AWS Environment: You should be familiar with setting up and managing AWS environments. This includes understanding how to set up AWS accounts, regions, and how to use environment variables for deployment. You'll need to declare your stack's environment, which can be done using AWS CDK's Environment class, where you specify the account and region for your stack docs.aws.amazon.com.
TypeScript: Evernode is built with TypeScript, so you should have a solid understanding of the language. This includes knowledge of TypeScript's syntax, data types, functions, classes, and modules.
AWS CDK Tool: AWS CDK (Cloud Development Kit) is an open-source software development framework to define cloud infrastructure in code and provision it through AWS CloudFormation. You need to understand how to use AWS CDK to define AWS resources and how to deploy these resources using the AWS CDK tool. This includes creating a new AWS CDK project, defining AWS resources in your project, and deploying your project to AWS docs.aws.amazon.com.
By deploying the infrastructure stacks for Evernode, you will incur AWS infrastructure usage costs. These costs will depend on the resources you deploy and their usage. It's important to monitor your AWS usage and costs to avoid unexpected charges. AWS provides tools and features to help you manage and monitor your AWS costs, including AWS Cost Explorer and AWS Budgets aws.amazon.com.

Please note that this is a high-level overview. Depending on your specific needs and the complexity of your deployment, you might need additional knowledge and skills.