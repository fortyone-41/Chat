import React from 'react';
import { Button, Block } from '../../components/Components'
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Auth.scss'

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
                        hasFeedback
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
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
                            <a className="auth__register-link" href="#">Зарегистрироваться</a>
                        </Form.Item>
                    </Form>
                </Block>
            </div>
        </section >
    );
}


export default Auth;
