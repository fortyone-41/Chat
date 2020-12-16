import React from 'react';
import { Button, Block } from '../../../components/Components'
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const Auth = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        < section className="auth" >
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Войти в аккаунт</h2>
                    <p>Пожалуйста, войдите в свой аккаунт</p>
                </div>
                <Block>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            validateStatus="success"
                            hasFeedback
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size="large"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" size="large">
                                Войти в аккаунт
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link className="auth__register-link" to='/register'>Зарегистрироваться</Link>
                        </Form.Item>
                    </Form>
                </Block>
            </div>
        </ section>
    );
}


export default Auth;
