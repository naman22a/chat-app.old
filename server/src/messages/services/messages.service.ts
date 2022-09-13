import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../models/message.model';
import { Repository } from 'typeorm';
import { MessageDto } from '../dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {}
    async findAll() {
        return await this.messagesRepository.find({
            relations: {
                user: true,
            },
        });
    }

    async create(msg: MessageDto) {
        const message = await this.messagesRepository
            .create({
                text: msg.text,
                user: {
                    id: msg.userId,
                },
            })
            .save();

        const newMessage = await this.messagesRepository.findOne({
            where: { id: message.id },
            relations: {
                user: true,
            },
        });

        return newMessage;
    }
}
