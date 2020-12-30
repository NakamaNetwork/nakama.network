import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildUnitTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'UnitTable', {
    partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER }
  });
  return table;
};
