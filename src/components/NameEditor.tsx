import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeroState} from "../model/HeroState";
import { Container, Col, Form, FormGroup, Input } from "reactstrap"
import {HeroSetupAction, heroSetupMsg} from "../actions/Actions";

// Players must be able to change their character's name


export const NameEditor = () => {
    const name = useSelector((state: HeroState) => state.name)
    const dispatch = useDispatch()
    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(heroSetupMsg(HeroSetupAction.NameChanged, {newName: e.target.value}))
    }

    return (
        <Container>
            <h2>Hero Name. Hello {name} </h2>
            <Form className="form">
                <Col>
                    <FormGroup>

                        <Input
                            type="text"
                            value={name}
                            placeholder="Your hero name here..."
                            onChange={(e) => nameChanged(e)}
                        />
                    </FormGroup>
                </Col>
            </Form>
        </Container>
    );
};