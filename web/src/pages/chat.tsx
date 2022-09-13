import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@tanstack/react-query';
import * as api from '../api';
import {
    Button,
    Container,
    Flex,
    Input,
    Spinner,
    Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Message } from '../interfaces';
import Head from 'next/head';

const socket = io('http://localhost:80/messages');

const Chat: NextPage = () => {
    const { data, isLoading, isError } = useQuery(['users-me'], api.getUser);

    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        socket.on('message', (msg: Message) => {
            setMessages(prev => [...prev, msg]);
        });
        socket.emit('findAll', {}, (data: Message[]) => {
            setMessages(data);
        });
    }, [messages]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !data.ok) {
        router.push('/login');
    }

    return (
        <Container maxW="container.sm">
            <Head>
                <title>Chat</title>
            </Head>
            <Text fontSize="2xl" fontWeight="semibold" mb={5}>
                Welcome back {data?.user?.username}
            </Text>

            <Flex flexDirection="column">
                {messages.map(message => (
                    <Text
                        key={message.id}
                        textAlign={
                            message.user.id === data?.user?.id
                                ? 'right'
                                : 'left'
                        }
                    >
                        [{message.user.username}]: {message.text}
                    </Text>
                ))}
            </Flex>

            <Flex alignItems="center">
                <Input
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    my={3}
                />
                <Button
                    colorScheme="purple"
                    onClick={() => {
                        socket.emit('createMessage', {
                            text: msg,
                            userId: data?.user?.id
                        });
                    }}
                    ml={4}
                >
                    Send Message
                </Button>
            </Flex>
        </Container>
    );
};

export default Chat;
