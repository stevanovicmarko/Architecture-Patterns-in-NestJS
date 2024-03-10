import { Injectable } from '@nestjs/common';
import { FindAlarmsRepository } from '../../../../application/ports/find-alarms.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterializedAlarmView } from '../../orm/schemas/materialized-alarm-view.schema';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly materializedAlarmView: Model<MaterializedAlarmView>,
  ) {}
  async findAll(): Promise<AlarmReadModel[]> {
    return this.materializedAlarmView.find();
  }
}
