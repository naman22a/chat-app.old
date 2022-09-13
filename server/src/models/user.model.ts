import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.model';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude({
        toPlainOnly: true,
    })
    password: string;

    @OneToMany(() => Message, (message) => message.user, {
        onDelete: 'CASCADE',
    })
    messages: Message[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
