import React, {Component} from 'react';

import {ToDoItem} from "./components/ToDoItem";


class App extends Component {

    state = {
        todos : [{creator : "Beni", text : "Task", isDone : true}, {creator : "Pascal", text : "Task2", isDone : false}]
    }

    componentDidMount() {
    }

    render() {
        return(
            <h1>ToDo Liste</h1>

        this.state.todos.map((todo) => <ToDoItem todo={todo}/> )
        );
    }
}

export default App;
