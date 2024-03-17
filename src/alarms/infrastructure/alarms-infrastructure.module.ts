import { Module } from '@nestjs/common';
import { InMemoryPersistenceModule } from './persistance/in-memory/in-memory-persistance.module';
import { OrmPersistenceAlarmModule } from './persistance/orm/orm-persistance.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
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
