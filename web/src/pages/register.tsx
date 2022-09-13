import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import { InputField } from '../components';
import { Button, Container, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import * as api from '../api';
import { mapToErrors } from '../utils';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
    const { mutateAsync: register } = useMutation(
        ['auth-register'],
        api.register
    );
    const router = useRouter();
    const queryClient = useQueryClient();

    return (
        <Container maxW="sm" height="100vh" mt={20}>
            <Head>
                <title>Register</title>
            </Head>
            <Text
                fontSize="2xl"
                fontWeight="semibold"
                mb={10}
                textAlign="center"
            >
                Register
            </Text>
            <Formik
                initialValues={{ username: '', password: '', cpassword: '' }}
                onSubmit={async (
                    { username, password, cpassword },
                    { setErrors }
                ) => {
                    if (password !== cpassword) {
                        setErrors({
                            password: 'Passwords must be same'
                        });
                        return;
                    }
                    const res = await register({ username, password });

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
                        <InputField
                            name="cpassword"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                        />
                        <Button
                            colorScheme="blue"
                            mt={7}
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Register;
