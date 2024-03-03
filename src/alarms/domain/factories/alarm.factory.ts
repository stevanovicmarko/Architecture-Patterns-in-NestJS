import { Alarm } from '../alarm';
import { randomUUID } from 'crypto';
import { AlarmSeverity } from '../value-objects/alarm-severity';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AlarmFactory {
  create(name: string, severity: string) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    return new Alarm(alarmId, name, alarmSeverity);
  }
}
