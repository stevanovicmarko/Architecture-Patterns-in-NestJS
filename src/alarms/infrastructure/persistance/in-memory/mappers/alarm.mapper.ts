import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { Alarm } from '../../../../domain/alarm';
import { AlarmItem } from '../../../../domain/alarm-item';
import { AlarmItemEntity } from '../entities/alarm-item.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverity['value'],
    );
    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmModel.items = alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
    return alarmModel;
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = alarm.id;
    alarmEntity.name = alarm.name;
    alarmEntity.severity = alarm.severity.value;
    alarmEntity.isAcknowledged = alarm.isAcknowledged;
    alarmEntity.triggeredAt = alarm.triggeredAt;
    alarmEntity.items = alarm.items.map((item) => {
      const itemEntity = new AlarmItemEntity();
      itemEntity.id = item.id;
      itemEntity.name = item.name;
      itemEntity.type = item.type;
      return itemEntity;
    });

    return alarmEntity;
  }
}
