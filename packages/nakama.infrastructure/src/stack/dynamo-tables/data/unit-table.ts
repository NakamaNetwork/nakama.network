import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { commonTableConfig } from '../common-table-config';

export const buildUnitTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'UnitTable', {
    ...commonTableConfig,
    partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER }
  });
  return table;
};
