export class AlarmReadModel {
  id: string;
  name: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  severity: string;
  items: Array<{ id: string; name: string }>;
}
