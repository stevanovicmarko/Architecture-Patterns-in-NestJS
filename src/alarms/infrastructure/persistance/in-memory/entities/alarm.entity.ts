import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  isAcknowledged: boolean;
  triggeredAt: Date;
  items: Array<AlarmItemEntity>;
}
