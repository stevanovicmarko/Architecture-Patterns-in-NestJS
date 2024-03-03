import { Module } from '@nestjs/common';
import { InMemoryPersistenceModule } from './persistance/in-memory/in-memory-persistance.module';
import { OrmPersistenceAlarmModule } from './persistance/orm/orm-persistance.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm' ? OrmPersistenceAlarmModule : InMemoryPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
