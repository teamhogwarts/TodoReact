import React from 'react';
import {Col, Card, CardBody, CardTitle, CardText, Button} from "reactstrap";


export const ToDoItem = ({todo, handler}) =>
    <Col sm="6">
        <Card body inverse color="dark" className="m-1 p-0">
            <CardBody>
                <input type="checkbox" checked={todo.isDone}/>
                <CardTitle>{todo.creator}</CardTitle>
                <CardText>{todo.text}</CardText>
                <Button onClick={() => handler(todo.id)}>Delete</Button>
            </CardBody>
        </Card>
    </Col>;
