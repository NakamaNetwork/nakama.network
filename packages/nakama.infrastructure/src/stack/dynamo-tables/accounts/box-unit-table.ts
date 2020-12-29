import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildBoxUnitTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'BoxUnitTable', {
    partitionKey: { name: 'boxId', type: dynamodb.AttributeType.STRING },
    sortKey: { name: 'unitId', type: dynamodb.AttributeType.NUMBER }
  });
  return table;
};
