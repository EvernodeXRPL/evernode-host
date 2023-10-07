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

new EvernodeHostStack(app, 'EvernodeHostStack', {
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  }, 
  variables: { 
    ZONE_NAME: "ROUTE 53 ID", 
    ZONE_ID: "ZONE_ID"
  }
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: AWS_ACCOUNT , region: AWS_REGION },
});