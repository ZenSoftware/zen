import { EnvironmentCommonProd } from '@zen/common';

class EnvironmentImpl extends EnvironmentCommonProd {}

export const environment = new EnvironmentImpl();
