import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { commonTableConfig } from '../common-table-config';

export const buildShipTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'ShipTable', {
    ...commonTableConfig,
    partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER }
  });
  return table;
};
