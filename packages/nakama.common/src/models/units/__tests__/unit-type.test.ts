import { enumFlagTestSuite } from "src/modules/__tests__/enum-flag-converter.test";
import { UnitType, unitTypeConverter } from "..";

describe('unit-type-converter', () => {
  enumFlagTestSuite(UnitType, unitTypeConverter);
});
