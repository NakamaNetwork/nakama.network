import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildBoxTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'BoxTable', {
    partitionKey: { name: 'accountId', type: dynamodb.AttributeType.STRING },
    sortKey: { name: 'boxId', type: dynamodb.AttributeType.STRING }
  });
  return table;
};
