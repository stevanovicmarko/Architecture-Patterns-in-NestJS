import { AlarmEntity } from './entities/alarm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { OrmAlarmRepository } from './repository/alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      // use OrmAlarmRepository whenever AlarmRepository token is requested
      provide: AlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository], // export AlarmRepository token to be used in other modules
})
export class OrmPersistenceAlarmModule {}
