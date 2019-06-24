import React from 'react';
import {Col, Input, Row} from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import Button from "reactstrap/es/Button";

export const CreateToDoItem = (createHandler, creatorHandler, textHandler) =>
    <div>
        <h1>Eingabe</h1>
        <Row>
            <Col md="6">
                <Card body inverse color="dark">
                    <CardBody>
                        <CardTitle><strong>Conversation</strong></CardTitle>
                        <Input type="text"
                               placeholder={'Enter creator...'}
                               onChange={e => creatorHandler(e.target.value)}/>
                        <Input type="text"
                               placeholder={'Enter text...'}
                               onChange={e => textHandler(e.target.value)}/>
                        <Button color="dark" onClick={() => createHandler()}>Create</Button>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>