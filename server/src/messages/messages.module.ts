import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../models/message.model';
import { MessagesGateway } from './gateways/messages.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
