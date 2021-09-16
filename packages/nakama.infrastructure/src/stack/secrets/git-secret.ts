import * as secret from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

export const buildGitSecret = (stack: cdk.Stack) => {
  const gitSecret = secret.Secret.fromSecretNameV2(stack, 'GitSecret', 'nakama-bot-github-key');
  return gitSecret;
};
