#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IaacStack } from '../lib/iaac-stack';
import * as dotenv from 'dotenv';
dotenv.config();


const app = new cdk.App();
/* Uncomment the next line to specialize this stack for the AWS Account
* and Region that are implied by the current CLI configuration. 
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCOUNT = process.env.AWS_ACCOUNT
*/

new IaacStack(app, 'IaacStack', {
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: AWS_ACCOUNT , region: AWS_REGION },
});