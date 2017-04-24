import React,{Component} from 'react'

import './UserDialog.css'
import deepCopy from './lib/deepCopy'
import AV from './lib/leancloud.js'
import getErrorMessage from  './lib/getErrorMessage'
export default class UserDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
    }
    componentDidUpdate(){
	}
    empty(val){
        let stateCopy = {
            selected: val,
            formData: {
                username: '',
                password: ''
            }
        };
        this.setState(stateCopy);
    }
    switch(e){
        this.empty(e.target.value);
    }
    signUp(e){
        e.preventDefault();
        let {username,password} = this.state.formData;
        let user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.signUp().then(()=>{
            console.log('signUp success');
            AV.User.logIn(username,password)
        },(error)=>{
            console.log(getErrorMessage(error))
        }).then(()=>{
            this.props.onSignIn.call(null);
            this.empty('signUp');
        },(error)=>{
            console.log(getErrorMessage(error))
        })
    }
    signIn(e){
        e.preventDefault();
        let {username,password} = this.state.formData;
        AV.User.logIn(username,password).then(()=>{
            this.props.onSignIn.call(null);
            this.empty('signUp');
        },(error)=>{
            console.log(getErrorMessage(error));
        })
    }
    changeFormData(key,e){
        
        let stateCopy = deepCopy(this.state);
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy);
    }
    render(){
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" defaultValue={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" defaultValue={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <input type="submit" value="注册"/>
                </div>
            </form>
        )

        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" defaultValue={this.state.formData.username} 
                       onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" defaultValue={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <input type="submit" value="登录"/>
                </div>
            </form>
        )

        return (
            <div className="UserDialogWrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch.bind(this)}>
                        <label>
                            <input type="radio" value="signUp" 
                                checked={this.state.selected === 'signUp'}
                                onChange={this.switch.bind(this)}
                            />注册</label>
                        <label>
                            <input type="radio" value="signIn" 
                                checked={this.state.selected === 'signIn'}
                                onChange={this.switch.bind(this)}
                            />登录</label>
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