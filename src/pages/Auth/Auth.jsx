import React from 'react';
import './Auth.scss'
import { LoginForm,RegistrForm } from '../../modules/index';
import {Route} from 'react-router-dom'

const Auth = ({onLogin, socket}) => {
    return (
        <section className="auth">
            <div className="auth__content">
                <Route exact path={["/", "/login"]} render={(props) => <LoginForm onLogin={onLogin} socket={socket} />} />
                <Route exact path="/register" component={RegistrForm}/>
            </div>
        </section>
    );
}


export default Auth;
