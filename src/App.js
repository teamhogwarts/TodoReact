import React, {Component} from 'react';
import {Row} from "reactstrap"
import {ToDoItem} from "./components/ToDoItem";
import {ToDoForm} from "./components/ToDoForm"


export default class App extends Component {

    state = {
        todos: [],
        creator: '',
        text: ''
    };

    textHandler = (text) => {
        this.setState({text: text})
    };
    creatorHandler = (creator) => {
        this.setState({creator: creator})
    };

    componentDidMount() {
        this.getAllTodos()
    }

    render() {
        return (
            <div>
                <h1>Eingabe</h1>
                <ToDoForm createHandler={this.createToDo}
                          textHandler={text => this.textHandler(text)}
                          creatorHandler={creator => this.creatorHandler(creator)}
                />
                <h1>ToDo Liste</h1>
                <Row>
                    {this.state.todos.map((todo, i) => <ToDoItem key={i}
                                                                 handler={id => this.deleteToDoItem(id)}
                                                                 todo={todo}
                        />
                    )}
                </Row>
            </div>
        )
    }

    async getAllTodos() {
        try {
            const response = await fetch('http://localhost:8080/toDo/toDos');

            if (response.ok) {
                const todoList = await response.json();
                this.setState({todos: todoList});
            } else {
                throw new Error('Something went wrong on api server!');
            }
        } catch (e) {
            console.error(e);
        }
    }

    async deleteToDoItem(id) {
        try {
            const request = new Request(
                'http://localhost:8080/toDo/delete/' + id,
                {method: 'DELETE'});

            const response = await fetch(request);

            if (response.ok) {
                this.getAllTodos();
            } else {
                throw new Error('Something went wrong on api server!');
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

            if (response.status === 201) { // 201 stands for CREATED
                this.getAllTodos();
            } else {
                throw new Error('Something went wrong on api server!');

            }
        } catch (e) {
            console.log(e);
        }
    }

}
