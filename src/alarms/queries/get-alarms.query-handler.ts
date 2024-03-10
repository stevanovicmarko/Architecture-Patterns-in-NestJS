import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { FindAlarmsRepository } from '../application/ports/find-alarms.repository';
import { AlarmReadModel } from '../domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
