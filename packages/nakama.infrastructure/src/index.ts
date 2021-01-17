import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NakamaInfrastructureStack } from './stack/nakama-infrastructure-stack';

const getVersion = () => {
  const trigger = process.env.CODEBUILD_SOURCE_VERSION;
  console.log('Trigger: ', trigger);
  switch (trigger) {
    case 'branch/master':
      return 'prod';
    default:
      return 'test';
  }
};

const stackName = `nakama-stack-${getVersion()}`;
console.log(`Deploying ${stackName}`);

const app = new cdk.App();
new NakamaInfrastructureStack(app, stackName);
