import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildAccountTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'AccountTable', {
    partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
  });
  return table;
};
