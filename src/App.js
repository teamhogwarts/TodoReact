import React, {Component} from 'react';

import {ToDoItem} from "./components/ToDoItem";
import {CreateToDoItem} from "./components/CreateToDoItem";


class App extends Component {

    state = {
        todos : [],
        creator: '',
        text: ''
    }

    creatorHandler(creatorData){
        this.setState({creator: creatorData})
    }

    textHandler(textData){
        this.setState({text: textData})
    }

    componentDidMount() {
        this.getAllTodos()
    }

    render() {
        return(
            <div>
                <CreateToDoItem/>
            <h1>ToDo Liste</h1>
                {this.state.todos.map((todo, i) => <ToDoItem key={i}
                                                             creatorHandler={() => this.creatorHandler()}
                                                             textHandler={() => this.textHandler()}
                                                             createHandler={() => this.createToDoDTO()} handler={id => this.deleteToDoItem(id)} todo={todo}/>)}
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

    async createToDo(toDo){
        try {
            const request = new Request('http://localhost:8080/toDo/create',
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(toDo)
                });

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

    createToDoDTO(){
        this.createToDo({
            creator: this.state.creator,
            text: this.state.text
        }) ;
    }
}

export default App;
