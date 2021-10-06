import * as lambda from '@aws-cdk/aws-lambda';
import * as secret from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';
import path from 'path';

export const buildImageScraperLambda = (stack: cdk.Stack, gitSecret: secret.ISecret) => {
  const func = new lambda.Function(stack, 'ImageScraper', {
    runtime: lambda.Runtime.NODEJS_14_X,
    handler: 'index.sniffImages',
    code: new lambda.AssetCode(
      path.join(__dirname, '../../../../nakama.scrapers/dist/modules/units/image-scraper')
    ),
    timeout: cdk.Duration.minutes(15),
    environment: {
      GITHUB_SECRET: gitSecret.secretArn
    },
    memorySize: 8192,
    layers: [
      // Add lambda layer that provides git binaries.
      //   See also: https://github.com/lambci/git-lambda-layer
      lambda.LayerVersion.fromLayerVersionArn(
        stack,
        'GitLayer',
        `arn:aws:lambda:${stack.region}:553035198032:layer:git-lambda2:8`
      )
    ]
  });
  gitSecret.grantRead(func);
  return func;
};
