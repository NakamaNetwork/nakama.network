import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const buildStageTable = (stack: cdk.Stack) => {
  const table = new dynamodb.Table(stack, 'StageTable', {
    partitionKey: { name: 'stageType', type: dynamodb.AttributeType.STRING },
    sortKey: { name: 'id', type: dynamodb.AttributeType.STRING }
  });
  return table;
};
