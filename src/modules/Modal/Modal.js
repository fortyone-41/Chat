import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Server from '../../addresServer'

const Modal = ({ onJoin }) => {
    let history = useHistory();
    const [isLoading, setLoading] = React.useState(false);
    const onFinish = async (values) => {  //function joining in room
        setLoading(true);
        await axios.post(Server + "/rooms", values);
        setTimeout(() => {      //loading current room with delay in 3sec
            setLoading(false)
            onJoin(values);
            history.push("/room/" + values.roomId);  //change location on current room
        }, 1500)
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
                style={{ margin: "auto" }}
            >
                <Form.Item
                    name="roomId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Room!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Room" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">{!isLoading ? 'Войти в чат' : 'Вход в чат...'}</Button>
                </Form.Item>
            </Form>
        </div >
    );
}

export default Modal;
