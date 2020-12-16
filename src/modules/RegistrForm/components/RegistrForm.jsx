import React from 'react';
import { Button, Block } from '../../../components/Components'
import { Form, Input} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined,InfoCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const RegistrForm = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const success = false;
    return (
        < section className="auth" >
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Регистрация</h2>
                    <p>Для входа в чат, вам нужно зарегистрироваться</p>
                </div>
                <Block>
                    {!success ? (
                    <Form
                        name="normal_auth"
                        className="auth-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            validateStatus="success"
                            hasFeedback
                            name="mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} size="large" placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="name"
                                size="large"
                                placeholder="Your name"
                            />
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
                        <Form.Item
                            name="repeatPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please repeat input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size="large"
                                placeholder="Repeat Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" size="large">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Form.Item>
                        <Link className="auth__register-link" to='/login'>Войти в аккаунт</Link>
                        </Form.Item>
                    </Form>
                    ) : (
                        <div className="auth__success-block">
                            <div><InfoCircleTwoTone /></div>
                            <h2>Подтвердите свой аккаунт</h2>
                            <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                        </div>
                    )}
                </Block>
            </div>
        </section >
    );
}


export default RegistrForm;
