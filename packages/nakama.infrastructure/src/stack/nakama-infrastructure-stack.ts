import * as cdk from '@aws-cdk/core';
import { buildAccountTable } from './dynamo-tables/accounts/account-table';
import { buildBoxTable } from './dynamo-tables/accounts/box-table';
import { buildBoxUnitTable } from './dynamo-tables/accounts/box-unit-table';
import { buildEventTable } from './dynamo-tables/data/event-table';
import { buildShipTable } from './dynamo-tables/data/ship-table';
import { buildStageTable } from './dynamo-tables/data/stage-table';
import { buildUnitTable } from './dynamo-tables/data/unit-table';
import { buildTeamTable } from './dynamo-tables/teams/team-table';

export class NakamaInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // -- Dynamo Tables
    // -- -- Account Tables
    buildAccountTable(this);
    buildBoxTable(this);
    buildBoxUnitTable(this);
    // -- -- Data Tables
    buildEventTable(this);
    buildShipTable(this);
    buildStageTable(this);
    buildUnitTable(this);
    // -- -- Team Tables
    buildTeamTable(this);
  }
}
