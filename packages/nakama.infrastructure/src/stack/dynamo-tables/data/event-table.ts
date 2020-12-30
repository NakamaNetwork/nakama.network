import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildEventTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'EventTable', {
    partitionKey: { name: 'startDate', type: dynamodb.AttributeType.NUMBER },
    sortKey: { name: 'id', type: dynamodb.AttributeType.STRING }
  });
  return table;
};
