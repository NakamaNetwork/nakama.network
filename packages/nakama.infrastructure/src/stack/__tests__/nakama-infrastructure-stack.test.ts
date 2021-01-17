import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as NakamaInfrastructure from '../nakama-infrastructure-stack';

test('Stack is Functioning', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new NakamaInfrastructure.NakamaInfrastructureStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          AccountTable95876246: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'id',
                  KeyType: 'HASH'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'id',
                  AttributeType: 'S'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          BoxTableBCABAF11: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'accountId',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'boxId',
                  KeyType: 'RANGE'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'accountId',
                  AttributeType: 'S'
                },
                {
                  AttributeName: 'boxId',
                  AttributeType: 'S'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          BoxUnitTable0B2D546F: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'boxId',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'unitId',
                  KeyType: 'RANGE'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'boxId',
                  AttributeType: 'S'
                },
                {
                  AttributeName: 'unitId',
                  AttributeType: 'N'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          EventTable3F3CD4B2: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'startDate',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'id',
                  KeyType: 'RANGE'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'startDate',
                  AttributeType: 'N'
                },
                {
                  AttributeName: 'id',
                  AttributeType: 'S'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          ShipTableE1AE52B1: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'id',
                  KeyType: 'HASH'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'id',
                  AttributeType: 'N'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          StageTable741AF000: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'stageType',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'id',
                  KeyType: 'RANGE'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'stageType',
                  AttributeType: 'S'
                },
                {
                  AttributeName: 'id',
                  AttributeType: 'S'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          UnitTableFA8005CD: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'id',
                  KeyType: 'HASH'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'id',
                  AttributeType: 'N'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          },
          TeamTable4903B786: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
              KeySchema: [
                {
                  AttributeName: 'id',
                  KeyType: 'HASH'
                }
              ],
              AttributeDefinitions: [
                {
                  AttributeName: 'id',
                  AttributeType: 'S'
                }
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              }
            },
            UpdateReplacePolicy: 'Retain',
            DeletionPolicy: 'Retain'
          }
        }
      },
      MatchStyle.EXACT
    )
  );
});
