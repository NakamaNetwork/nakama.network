import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildShipTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'ShipTable', {
    partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER }
  });
  return table;
};
