import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import UserDialog from './UserDialog'
import { getCurrentUser, signOut } from './leanCloud'
import AV from './leanCloud'
import jsonObj from './jsonObj'



class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			newTodo: '',
			todoList: [],
			currentUser: null
		}
	}


	render() {

		let todos = this.state.todoList
			.filter((item) => !item.deleted)
			.map((item, index) => {
				return (
					<li key={index}>
						<TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
					</li>
				)
			})
		let todo = (
			<div className="todo">
				<h1>{this.state.user.username || "我"}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
				</h1>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo} onChange={this.changeTitle.bind(this)} onSubmit={this.addTodo.bind(this)} />
				</div>
				<ul className="todoList">
					{todos}
				</ul>
			</div>

		)
		return (
			<div className="App">
				{this.state.user.id ? todo : null}
				{this.state.user.id ?
					null :
					<UserDialog
						onSignUp={this.onSignUpOrOnSignIn.bind(this)}
						onSignIn={this.onSignUpOrOnSignIn.bind(this)} />}
			</div>
		)
	}

	fetchTodos() {
		if (this.state.currentUser) {
			var query = new AV.Query('AllTodos');
			query.find()
				.then((todos) => {
					let avAlltodos = todos[0]//因为理论上AllTodos只有一个，所有我们取结果的第一项
					let id = avAlltodos.id
					let stateCopy = jsonObj(this.state)
					stateCopy.todoList = JSON.parse(avAlltodos.attributes.content)//为什么有个attributes？因为从控制台看到的
					stateCopy.todoList.id = id //为什么给todoList这个数组设置id？因为数组也是对象
					this.setState(stateCopy)
				}, function (error) {
					console.error(error)
				})
		}
	}

	updataTodos() {
		let dataString = JSON.stringify(this.state.todoList)
		let avTodos = AV.Object.createWithoutData('AllTodos', this.state.todoList.id)
		avTodos.set('content', dataString)
		avTodos.save().then(() => {
			console.log('更新成功')
		})
	}

	saveTodos() {
		let dataString = JSON.stringify(this.state.todoList)
		var AVTodos = AV.Object.extend('AllTodos');
		var avTodos = new AVTodos();
		var acl = new AV.ACL();
		acl.setReadAccess(AV.User.current(), true)//只有这个user能读
		acl.setWriteAccess(AV.User.current(), true)//只有这个user能写
		avTodos.set('content', dataString);
		avTodos.setACL(acl)//设置访问控制
		avTodos.save().then((todo) => {
			let stateCopy = jsonObj(this.state)
			stateCopy.todoList.id = todo.id //一定记得要把id挂到this.todoList上，否测下次就会调用updateTodos了
			this.setState(stateCopy)
			console.log('保存成功');
		}, function (error) {
			alert('保存失败')
		})
	}

	saveOrUpdateTodos() {
		if (this.state.todoList.id) {
			this.updataTodos()
		} else {
			this.saveTodos()
		}
	}

	signOut() {
		signOut()
		let stateCopy = jsonObj(this.state)
		stateCopy.user = {}
		this.setState(stateCopy)
	}

	onSignUpOrOnSignIn(user) {
		let stateCopy = jsonObj(this.state)
		stateCopy.user = user
		stateCopy.currentUser = getCurrentUser();
		this.setState(stateCopy)
		this.fetchTodos()

	}
	componentDidUpdate() {
		// this.state.currentUser = getCurrentUser()
		// this.setState(this.state)
		// this.fetchTodos()
	}
	delete(event, todo) {
		todo.deleted = true
		this.setState(this.state)
		this.saveOrUpdateTodos()
	}

	toggle(e, todo) {
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
		this.saveOrUpdateTodos()
	}
	changeTitle(e) {
		this.setState({
			newTodo: e.target.value,
			todoList: this.state.todoList
		})

	}

	addTodo(event) {//增加todo
		if (event.target.value === '') {
			alert('请填写内容')
		}
		else {
			this.state.todoList.push({
				id: idMaker(),
				title: event.target.value,
				status: null,
				deleted: false
			})
		}

		this.setState({
			newTodo: "",
			todoList: this.state.todoList
		})
		this.saveOrUpdateTodos()
	}
}

export default App;

let id = 0;

function idMaker() {
	id += 1
	return id
}
