import React from 'react';
import {Col, Row, Card, CardBody, CardTitle, CardText,Button} from "reactstrap";


export const ToDoItem = ({todo, handler}) =>
    <Row>
        <Col sm="6">
            <Card body inverse color="dark" >
                <CardBody>
                    <input type="checkbox" checked={todo.isDone}/>
                    <CardTitle>{todo.creator}</CardTitle>
                    <CardText>{todo.text}</CardText>
                    <Button onClick={() => handler(todo.id)}>Delete</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;
