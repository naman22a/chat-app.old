import React from 'react';
import NextLink from 'next/link';
import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery(['users-me'], api.getUser);
    const { mutateAsync: logout } = useMutation(['auth-logout'], api.logout, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users-me']);
        }
    });
    const router = useRouter();

    const handleLogout = async () => {
        const res = await logout();
        if (res.ok) {
            router.push('/login');
        } else {
            alert('Something went wrong');
        }
    };

    return (
        <Flex
            as="header"
            py={5}
            justifyContent="space-between"
            alignItems="center"
            px={10}
        >
            <NextLink href="/chat" passHref>
                <Text fontWeight="semibold" fontSize="xl" cursor="pointer">
                    Chat App
                </Text>
            </NextLink>
            <Flex as="nav" alignItems="center">
                {isLoading || isError || !data.ok ? (
                    <>
                        <NextLink href="/login" passHref>
                            <Link mx={2}>Login</Link>
                        </NextLink>
                        <NextLink href="/register" passHref>
                            <Link mx={2}>Register</Link>
                        </NextLink>
                    </>
                ) : (
                    <>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            textTransform="capitalize"
                        >
                            {data.user?.username}
                        </Text>
                        <Button
                            colorScheme="orange"
                            onClick={handleLogout}
                            ml={4}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default Header;
