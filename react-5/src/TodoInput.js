import React,{ Component } from 'react';


export default class TodoInput extends Component{
    render(){
        return <input type="text" value={this.props.content} placeholder="输入代办事项"
        className="TodoInput"
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e);
        }
    }
    changeTitle(e){
        this.props.onChange(e);
    }
}