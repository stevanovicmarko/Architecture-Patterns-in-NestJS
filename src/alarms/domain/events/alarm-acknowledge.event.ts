import { AutowiredEvent } from '../../../shared/decorators/autowired-etent.decorator';

@AutowiredEvent
export class AlarmAcknowledgedEvent {
  constructor(public readonly alarmId: string) {}
}
