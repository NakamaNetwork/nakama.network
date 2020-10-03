import { enumFlagTestSuite } from "src/modules/__tests__/enum-flag-converter.test";
import { UnitFlag, unitFlagConverter } from "..";

describe('unit-flag-converter',()=>{
    enumFlagTestSuite(UnitFlag, unitFlagConverter);
  })