import React from 'react';
import { Button, Block } from '../../../components/Components'
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';




const Auth = (props) => {
    const [isLoading, setLoading] = React.useState(false);
    const field = React.useRef();
    let history = useHistory();
    const onFinish = async (values) => {  //function inputing name
        if (values.userName.match(/^[ ]+$/)) { // В значении только пробелы
            field.current.value = '';
            alert("Введите имя пользователя");
        }else{
            setLoading(true);
            localStorage.userName = values.userName;  //writing name in local storage
            history.push("/room");      //going to the rooms page
        }
        
    };

    React.useEffect(() => {
        if (localStorage.userName !== undefined || localStorage.userName === "") {  //if inputted name, going to the rooms page
            history.push("/room");
        }
    }, [])

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
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} ref={field} placeholder="Name" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">{!isLoading ? 'Перейти в комнаты' : 'Переход в комнаты...'}</Button>
                        </Form.Item>
                    </Form>
                </Block>
            </div>
        </ section>
    );
}


export default Auth;
