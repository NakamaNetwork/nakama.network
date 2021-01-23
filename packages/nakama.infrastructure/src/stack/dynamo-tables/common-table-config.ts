import * as dynamodb from '@aws-cdk/aws-dynamodb';

export const commonTableConfig: Partial<dynamodb.TableProps> = {
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
};
