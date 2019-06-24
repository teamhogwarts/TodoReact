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
                {this.state.todos.map((todo, i) => <ToDoItem key={i} todo={todo}/>)}
            </div>
        )
    }

    async getAllTodos(){
        try{
            const response = await fetch("http://localhost:8080/toDo/toDos");
            const todoList = await response.json();
            this.setState({todos: todoList});
        }
        catch (e) {
            console.error(e);
        }

    }
}

export default App;
