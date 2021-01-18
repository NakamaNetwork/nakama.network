import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { getVersion } from '../../utils/get-version';

export const buildRunScrapersEvent = (stack: cdk.Stack, ...lambdas: lambda.Function[]) => {
  const rule = new events.Rule(stack, 'RunScrapers', {
    schedule: events.Schedule.cron({
      hour: '0',
      minute: '0',
      day: getVersion() === 'prod' ? '*' : '1',
      month: '*'
    })
  });
  for (const lambda of lambdas) {
    rule.addTarget(new targets.LambdaFunction(lambda));
  }
  return rule;
};
