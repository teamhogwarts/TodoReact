import React from 'react';
import {Col, Row} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import Button from "reactstrap/es/Button";



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
