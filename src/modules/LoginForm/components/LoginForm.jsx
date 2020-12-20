import React from 'react';
import { Button, Block } from '../../../components/Components'
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios';




const Auth = (props) => {
    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await axios.post("/rooms", values);
        props.onLogin(values);
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
                            name="roomId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} value={roomId} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="userName"
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
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">{!isLoading ? 'Войти в чат' : 'Вход в чат...'}</Button>
                            <Link className="auth__register-link" to='/register'>Зарегистрироваться</Link>
                        </Form.Item>
                    </Form>
                </Block>
            </div>
        </ section>
    );
}


export default Auth;
