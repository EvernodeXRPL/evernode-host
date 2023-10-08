#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EvernodeHostStack } from '../lib/evernode-host-stack';
import * as dotenv from 'dotenv';
// dotenv.config();


const app = new cdk.App();
/* Uncomment the next line to specialize this stack for the AWS Account
* and Region that are implied by the current CLI configuration. 
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCOUNT = process.env.AWS_ACCOUNT
*/


let variables = {
    ZONE_NAME: "HOSTED ZONE NAME", 
    ZONE_ID: "HOSTED ZONE ID", 
    OS_SPECIFICATION: {
      region: 'us-east-1', 
      image_id: "ami-053b0d53c279acc90" // This IMAGE ID will change on the AWS region that you're deploying from
    }, 
    ssh_key_name: "the ssh key name that you created as part of the pre-requisite steps"
}
new EvernodeHostStack(app, 'EvernodeHostStack', {
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  }, 
  variables: variables

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: AWS_ACCOUNT , region: AWS_REGION },
});