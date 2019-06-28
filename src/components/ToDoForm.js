import React from 'react';
import {Col, Input, Row, Card, CardBody, CardTitle, Button} from "reactstrap";


export const ToDoForm = ({creatorHandler, textHandler, createHandler}) =>
    <Row>
        <Col md="6">
            <Card body inverse color="dark">
                <CardBody>
                    <CardTitle><strong>ToDo</strong></CardTitle>
                    <Input type="text"
                           placeholder={'Enter creator...'}
                          onChange={e => creatorHandler(e.target.value)}
                    />
                    <Input type="text"
                           placeholder={'Enter text...'}
                           onChange={e => textHandler(e.target.value)}
                    />
                    <Button color="dark" onClick={() => createHandler()}>Create</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;

