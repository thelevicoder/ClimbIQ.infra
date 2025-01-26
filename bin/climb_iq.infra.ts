#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ClimbIqInfraStack } from '../lib/climb_iq.infra-stack';

const app = new cdk.App();
new ClimbIqInfraStack(app, 'ClimbIqInfraStack', {
  
});