import { enumFlagTestSuite } from '../../../modules/__tests__/enum-flag-converter.test';
import { UnitClass, unitClassConverter } from '..';

describe('unit-class-converter', () => {
  enumFlagTestSuite(UnitClass, unitClassConverter);
});
