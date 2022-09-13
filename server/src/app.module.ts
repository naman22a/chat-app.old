import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { __prod__ } from './constants';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: !__prod__,
            logging: !__prod__,
        }),
        MessagesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
