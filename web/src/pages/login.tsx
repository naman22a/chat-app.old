import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import { InputField } from '../components';
import { Button, Container, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import * as api from '../api';
import { mapToErrors } from '../utils';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
    const { mutateAsync: login } = useMutation(['auth-login'], api.login);
    const router = useRouter();
    const queryClient = useQueryClient();

    return (
        <Container maxW="sm" height="100vh" mt={20}>
            <Head>
                <title>Login</title>
            </Head>
            <Text
                fontSize="2xl"
                fontWeight="semibold"
                mb={10}
                textAlign="center"
            >
                Login
            </Text>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await login(values);

                    if (res.ok && !res.errors) {
                        await queryClient.invalidateQueries(['users-me']);
                        await router.push('/chat');
                    } else {
                        setErrors(mapToErrors(res.errors!));
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            label="Username"
                            placeholder="Username"
                        />
                        <InputField
                            name="password"
                            label="Password"
                            placeholder="Password"
                            type="password"
                        />
                        <Button
                            colorScheme="blue"
                            mt={7}
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Login;
