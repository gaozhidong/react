import React, { Component } from 'react';
import './login.css';
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'
import errorInfo from './error'
import SignUpForm from './SignUpForm' //将 SignUpForm 抽离成一个组件
import SignInForm from './SignInForm' //将SignInForm 抽离成一个组件
import ForgotPasswordForm from './ForgotPasswordForm' //将忘记密码表单抽离成一个组件

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTsb: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e) {
        if (!this.state.formData.username || !this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        e.preventDefault()
        let { email, username, password } = this.state.formData
        let success = (user) => {
            // console.log(success)
            this.props.onSignUp.call(null, user)
        }
        let error = (error) => {
            errorInfo(error)
        }
        signUp(email, username, password, success, error)
    }
    signIn(e) {
        if (!this.state.formData.username || !this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            // console.log(success)
            this.props.onSignIn.call(null, user)
        }
        let error = (error) => {
            //console.log(error.code)
            errorInfo(error)
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {

        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)}
                        /> 注册</label>
                    <label>
                        <input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)}
                        /> 登录</label>
                </nav>
                <div className="panes">

                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.state.formData}
                            onSubmit={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                        />
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.state.formData}
                            onChange={this.changeFormData.bind(this)}
                            onSubmit={this.signIn.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        />
                        : null}

                </div>
            </div>
        )

        return (
            <div className="login">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                        signInOrSignUp :
                        <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />}

                </div>
            </div>
        )
    }
    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    //返回登录
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e) {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }

}
export default Login