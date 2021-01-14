import React, { useState } from 'react';
import { Button, Form, Input  } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import {  useHistory  } from 'react-router-dom';

const Modal = ({onJoin}) => {
    const [roomId, setRoomId] = React.useState('');
    let history = useHistory();
    const [isLoading, setLoading] = React.useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        await axios.post("/rooms", values);
        onJoin(values);
        history.push("/"+values.roomId);
    };
    return (
        <div>
                <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Room!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} value={roomId} placeholder="Room" />
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">{!isLoading ? 'Войти в чат' : 'Вход в чат...'}</Button>
                        </Form.Item>
                    </Form>
        </div >
    );
}

export default Modal;
