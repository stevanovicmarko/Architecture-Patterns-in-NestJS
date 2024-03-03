import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { InMemoryAlarmRepository } from './repository/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      // use InMemoryAlarmRepository whenever AlarmRepository token is requested
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository], // export AlarmRepository token to be used in other modules
})
export class InMemoryPersistenceModule {}
