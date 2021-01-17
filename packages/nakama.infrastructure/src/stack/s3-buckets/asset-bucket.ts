import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export const buildAssetBucket = (stack: cdk.Stack) => {
  const bucket = new s3.Bucket(stack, 'AssetBucket', {
    encryption: s3.BucketEncryption.UNENCRYPTED
  });
  bucket.addToResourcePolicy(
    new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.AnyPrincipal()]
    })
  );
  return bucket;
};
