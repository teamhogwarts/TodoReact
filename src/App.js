import React, {Component} from 'react';

import {ToDoItem} from "./components/ToDoItem";


class App extends Component {

    state = {
        todos : [{creator : "Beni", text : "Task", isDone : true}, {creator : "Pascal", text : "Task2", isDone : false}]
    }

    componentDidMount() {
        this.getAllTodos()
    }

    render() {
        return(
            <div>
            <h1>ToDo Liste</h1>
                {this.state.todos.map((todo, i) => <ToDoItem key={i} handler={id => this.deleteToDoItem(id)} todo={todo}/>)}
            </div>
        )
    }

    async getAllTodos(){
        try{
            const response = await fetch("http://localhost:8080/toDo/toDos");
            if(response.status === 200){
                const todoList = await response.json();
                this.setState({todos: todoList});
            }
            else{
                this.setState({todos: []});
            }
        }
        catch (e) {
            console.error(e);
        }

    }

    async deleteToDoItem(id){
        try {
            const request = new Request('http://localhost:8080/toDo/delete/' + id,
                {method: 'DELETE'});
            const response = await fetch(request);
            if(response.status !== 200){
                throw new Error('Something went wrong on api server!');
            }
            else{
                this.getAllTodos();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default App;
