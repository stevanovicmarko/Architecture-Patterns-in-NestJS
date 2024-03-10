import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MaterializedAlarmView } from '../../orm/schemas/materialized-alarm-view.schema';
import { Model } from 'mongoose';
import { AlarmReadModel } from '../../../../domain/read-models/alarm.read-model';
import { UpsertMaterializedAlarmRepository } from '../../../../application/ports/upsert-materialized-alarm.repository';

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly materializedAlarmView: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.materializedAlarmView.findOneAndUpdate({ id: alarm.id }, alarm, {
      upsert: true,
    });
  }
}
