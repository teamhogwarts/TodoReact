import React from 'react';
import {Col, Input, Row, Card, CardBody, CardTitle, Button} from "reactstrap";


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
                    <Button color="primary" onClick={() => createButton()}>Create</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;

