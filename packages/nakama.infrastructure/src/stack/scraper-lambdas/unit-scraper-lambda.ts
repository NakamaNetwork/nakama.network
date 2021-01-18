import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import path from 'path';

export const buildUnitScraperLambda = (stack: cdk.Stack, unitTable: dynamodb.Table) => {
  const func = new lambda.Function(stack, 'UnitScraper', {
    runtime: lambda.Runtime.NODEJS_12_X,
    handler: 'index.sniffUnits',
    code: new lambda.AssetCode(
      path.join(__dirname, '../../../../nakama.scrapers/dist/modules/units/unit-scraper')
    ),
    timeout: cdk.Duration.minutes(5),
    memorySize: 3072,
    environment: {
      UNIT_TABLE: unitTable.tableName
    }
  });
  unitTable.grantWriteData(func);
  return func;
};
