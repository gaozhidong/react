import React, { Component } from 'react';

import 'normalize.css'
import './reset.css'
import './App.css';

import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'

import deepCopy from './lib/deepCopy'

import AV from  './lib/leancloud.js'
import getAVUser from './lib/getAVUser.js'
import getStorage from './lib/getStorage.js'
import saveStorage from './lib/saveStorage.js'

class App extends Component {
  constructor(props){
    super(props);
		let currentUser = getAVUser();
		this.state = {
			user: currentUser,
			newTodo: '',
			todoList:[]
		}
		if (currentUser.id) {
			this.readTodos();
		}
    console.log(this.state);

  }
  render() {
    let todos = this.state.todoList
			.filter((item)=>!item.deleted)
			.map((item,index)=>{
			return (
				<li key={index}>
					<TodoItem todo={item} 
						onToggle={this.toggle.bind(this)}
						onDelete={this.delete.bind(this)} />
				</li>
			)
		})

    return (
      <div className="App">
				<div className="header">
					<h1>{this.state.user.username||'My'} todos</h1>
					{this.state.user.id ? <button className="logout" 
						onClick={this.signOut.bind(this)}>登出</button> : null}
				</div>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo} 
						onChange={this.changeTitle.bind(this)}
						onSubmit={this.addTodo.bind(this)}/>
				</div>
				<ol className="todoList">
					{todos}
				</ol>
				{this.state.user.id ? null : 
					<UserDialog 
						onSignUp={this.onSignIn.bind(this)}
						onSignIn={this.onSignIn.bind(this)}
					/>}
      </div>
    );
  }
	readTodos(){
		getStorage().then((val)=>{
			let stateCopy = deepCopy(this.state);
			if (val) {	
				stateCopy.user.objId = val.id;
				stateCopy.todoList = val.content;		
			} else {
				stateCopy.user.objId = '';
			}
			this.setState(stateCopy);
		})
	}
	saveTodos(content){
		saveStorage(content,this.state.user.objId).then((val)=>{
			let userCopy = deepCopy(this.state.user);
      userCopy.objId = val.id;
      this.setState(userCopy);
		});
	}
	signOut(){
		AV.User.logOut();
		this.setState({
			user: {},
			newTodo: '',
			todoList: []
		});
	}
	onSignIn(){
		let userCopy = deepCopy(this.state.user);
		let {username,id} = getAVUser();
    userCopy.username = username;
		userCopy.id = id;
    this.setState({user: userCopy});
		this.readTodos();
	}
	componentDidUpdate(){
		
	}
	toggle(e,todo){
		todo.status = todo.status === 'completed' ? '' : 'completed';
		this.setState(this.state);
	}
	changeTitle(e){
		this.setState({
			newTodo: e.target.value,
			todoList: this.state.todoList
		})
	}
	addTodo(event){
		let todoCopy = deepCopy(this.state.todoList) ;
		todoCopy.push({
			title: event.target.value,
			status: null,
			deleted: false
		})
		this.setState({
			newTodo: '',
			todoList: todoCopy
		})
		this.saveTodos(todoCopy);
	}
	delete(event,todo){
		todo.deleted = true;
		this.setState(this.state);
	}
}

export default App;

