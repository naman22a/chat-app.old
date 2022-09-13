import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from '../services/messages.service';
// ? import { UseGuards } from '@nestjs/common';
// ? import { AuthSocketGuard } from '../../auth/auth.socket.guard';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '../dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
// ? @UseGuards(AuthSocketGuard)
@WebSocketGateway(80, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
    namespace: 'messages',
})
export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private messagesService: MessagesService) {}

    @SubscribeMessage('findAll')
    async messages() {
        return await this.messagesService.findAll();
    }

    @SubscribeMessage('createMessage')
    async createMessage(
        @MessageBody() messageDto: MessageDto,
        @ConnectedSocket() socket: Socket,
    ) {
        const savedMessage = await this.messagesService.create(messageDto);
        socket.emit('message', savedMessage);
    }
}
