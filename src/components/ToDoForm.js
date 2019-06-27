import React from 'react';
import {Col, Input, Row} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Button from "reactstrap/es/Button";



export const ToDoForm = ({creatorInput, textInput, createButton}) =>
    <Row>
        <Col md="6">
            <Card body inverse color="dark">
                <CardBody>
                    <CardTitle><strong>ToDo</strong></CardTitle>
                    <Input type="text"
                           placeholder={'Enter creator...'}
                          onChange={e => creatorInput(e.target.value)}
                    />
                    <Input type="text"
                           placeholder={'Enter text...'}
                           onChange={e => textInput(e.target.value)}
                    />
                    <Button color="dark" onClick={() => createButton()}>Create</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;

