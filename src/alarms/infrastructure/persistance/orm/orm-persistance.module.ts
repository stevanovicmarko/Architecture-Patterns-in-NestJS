import { AlarmEntity } from './entities/alarm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { OrmCreateAlarmRepository } from './repository/alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { FindAlarmsRepository } from '../../../application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from '../in-memory/repository/upsert-materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrmFindAlarmsRepository } from '../in-memory/repository/find-alarms.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      // use OrmAlarmRepository whenever AlarmRepository token is requested
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ], // export AlarmRepository token to be used in other modules
})
export class OrmPersistenceAlarmModule {}
