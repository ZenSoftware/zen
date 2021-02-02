import { EnvironmentProd } from '@zen/common';

class EnvironmentImpl extends EnvironmentProd {}

export const environment = new EnvironmentImpl();
