import { Alarm } from '../alarm';
import { AutowiredEvent } from '../../../shared/decorators/autowired-etent.decorator';

@AutowiredEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
