import React, {Component} from 'react';

import {ToDoItem} from "./components/ToDoItem";
import {CreateToDoItem} from "./components/CreateToDoItem";
import {Col, Input, Row} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Button from "reactstrap/es/Button";


class App extends Component {

    state = {
        todos: [],
        creator: '',
        text: ''
    }

    creatorHandler(creatorData) {
        this.setState({creator: creatorData})
    };

    textHandler(textData) {
        this.setState({text: textData})
    };

    componentDidMount() {
        this.getAllTodos()
    }

    render() {
        return (
            <div>
                <h1>Eingabe</h1>
                <Row>
                    <Col md="6">
                        <Card body inverse color="dark">
                            <CardBody>
                                <CardTitle><strong>ToDo</strong></CardTitle>
                                <Input type="text"
                                       placeholder={'Enter creator...'}
                                       onChange={e => this.creatorHandler(e.target.value)}/>
                                <Input type="text"
                                       placeholder={'Enter text...'}
                                       onChange={e => this.textHandler(e.target.value)}/>
                                <Button color="dark" onClick={() => this.createToDo()}>Create</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <h1>ToDo Liste</h1>
                {this.state.todos.map((todo, i) => <ToDoItem key={i} handler={id => this.deleteToDoItem(id)}
                                                             todo={todo}/>)}
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

    async createToDo() {
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

export default App;
