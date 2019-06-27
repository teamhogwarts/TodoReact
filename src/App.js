import React, {Component} from 'react';

import {ToDoItem} from "./components/ToDoItem";
import {ToDoForm} from "./components/ToDoForm"


export default class App extends Component {

    state = {
        todos: [],
        creator: '',
        text: ''
    }

    textHandler = (inputVale) => {
        this.setState({text: inputVale})
    }
    creatorHandler = (inputVale) => {
        this.setState({creator: inputVale})
    }

    componentDidMount() {
        this.getAllTodos()
    }

    render() {
        return (
            <div>
                <h1>Eingabe</h1>
                <ToDoForm createButton={this.createToDo}
                          textInput={e => this.textHandler(e)}
                          creatorInput={e => this.creatorHandler(e)}
                />
                <h1>ToDo Liste</h1>
                {this.state.todos.map((todo, i) => <ToDoItem key={i}
                                                             handler={id => this.deleteToDoItem(id)}
                                                             todo={todo}
                    />
                )}
            </div>
        )
    }

    async getAllTodos() {
        try {
            const response = await fetch("http://localhost:8080/toDo/toDos");
            if (response.status === 200) {
                const todoList = await response.json();
                this.setState({todos: todoList});
            } else {
                this.setState({todos: []});
            }
        } catch (e) {
            console.error(e);
        }

    }

    async deleteToDoItem(id) {
        try {
            const request = new Request('http://localhost:8080/toDo/delete/' + id,
                {method: 'DELETE'});
            const response = await fetch(request);
            if (response.status !== 200) {
                throw new Error('Something went wrong on api server!');
            } else {
                this.getAllTodos();
            }
        } catch (e) {
            console.log(e);
        }
    }

    createToDo = async () => {
         try {
             const todo = {
                 creator: this.state.creator,
                 text: this.state.text
             };

             const request = new Request('http://localhost:8080/toDo/create',
                 {
                     method: 'POST',
                     headers: new Headers({
                         'Content-Type': 'application/json'
                     }),
                     body: JSON.stringify(todo)
                 });

             const response = await fetch(request);

             if (response.status !== 201) {
                 throw new Error('Something went wrong on api server!');
             } else {
                 this.getAllTodos();
             }
         } catch (e) {
             console.log(e);
         }
    }

}
