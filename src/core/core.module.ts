import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27018/?replicaSet=rs0',
      {
        dbName: 'event-store-db',
        directConnection: true,
        connectionName: EVENT_STORE_CONNECTION, // use separate connection namespace
      },
    ),
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity,
            // but in a real-world application, we would use a configuration service or env
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              database: 'alarms',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://localhost:27017', {
              dbName: 'read-model-db',
              // connectionName: 'read-model-connection',
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
