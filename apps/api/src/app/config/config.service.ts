import { Injectable } from '@nestjs/common';
import { EnvironmentBase } from '../../environments/environment.base';

@Injectable()
export class ConfigService extends EnvironmentBase {}
