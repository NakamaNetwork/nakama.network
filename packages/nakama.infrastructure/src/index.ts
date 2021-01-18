import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NakamaInfrastructureStack } from './stack/nakama-infrastructure-stack';
import { getVersion } from './utils/get-version';

const stackName = `nakama-stack-${getVersion()}`;
console.log(`Deploying ${stackName}`);

const app = new cdk.App();
new NakamaInfrastructureStack(app, stackName);
