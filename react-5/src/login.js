import React, { Component } from 'react';
import './login.css';
import { signUp, signIn } from './leanCloud'
import errorInfo from './error'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            formData: {
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
        let {username, password} = this.state.formData
        let success = (user) => {
            // console.log(success)
            this.props.onSignUp.call(null, user)
        }
        let error = (error) => {
            errorInfo(error)
        }
        signUp(username, password, success, error)
    }
    signIn(e) {
        if (!this.state.formData.username||!this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        e.preventDefault()
        let {username, password} = this.state.formData
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
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                    <a href="javascript:;">忘记密码了？</a>
                </div>
            </form>
        )
        return (
            <div className="login">
                <div className="UserDialog">
                    <nav>
                        <label><input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)} /> 注册</label>
                        <label><input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)} /> 登录</label>
                    </nav>
                    <div className="panes">
                        {this.state.selected === 'signUp' ? signUpForm : null}
                        {this.state.selected === 'signIn' ? signInForm : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default Login