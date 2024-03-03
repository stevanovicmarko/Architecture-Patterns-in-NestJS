import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { Alarm } from '../../../../domain/alarm';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverity['value'],
    );
    return new Alarm(alarmEntity.id, alarmEntity.name, alarmSeverity);
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = alarm.id;
    alarmEntity.name = alarm.name;
    alarmEntity.severity = alarm.severity.value;
    return alarmEntity;
  }
}
