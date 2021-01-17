import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import path from 'path';

export const buildImageScraperLambda = (stack: cdk.Stack, assetBucket: s3.Bucket) => {
  const func = new lambda.Function(stack, 'ImageScraper', {
    runtime: lambda.Runtime.NODEJS_12_X,
    handler: 'index.sniffImages',
    code: new lambda.AssetCode(
      path.join(__dirname, '../../../../nakama.scrapers/dist/modules/units/image-scraper')
    ),
    timeout: cdk.Duration.minutes(5),
    memorySize: 3072,
    environment: {
      ASSET_BUCKET: assetBucket.bucketName
    }
  });
  assetBucket.grantReadWrite(func);
  return func;
};
