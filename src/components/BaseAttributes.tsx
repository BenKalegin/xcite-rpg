import {useDispatch, useSelector} from "react-redux";
import {getAttribute, HeroBaseAttribute, HeroState} from "../model/HeroState";
import React from "react";
import { Container, Col, Form, FormGroup, Label, Input} from "reactstrap"
import {HeroSetupAction, heroSetupMsg} from "../actions/Actions";
import {enumKeys} from "../reducers/Reducers";

// Players must be able to alter their character's Base Attributes
// The main attributes that can be directly adjusted are Strength, Dexterity, Mind, and Presence
// The default value for any attribute is 0

export interface Props {
    label: string
    value: number
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Attr = (props: Props) => {
    return (
        <Col>
            <FormGroup>
                <Label>{props.label}</Label>
                <Input
                    type="number"
                    value={props.value}
                    min="0" max="10"
                    onChange={(e) => props.onClick(e)}
                />
            </FormGroup>
        </Col>
    )
}
export const BaseAttributes = () => {
    const baseAttrs = useSelector((state: HeroState) => state.baseAttributes)

    const dispatch = useDispatch()
    const attributeChanged = (attr: HeroBaseAttribute, e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(heroSetupMsg(HeroSetupAction.BaseAttributeChanged, {newValue: Number(e.target.value), attr: attr}))
    }

    return (
        <Container className="App">
            <h2>Base Attributes</h2>
            <Form className="form">
                {enumKeys(HeroBaseAttribute).map(key => HeroBaseAttribute[key]).map(attr => {
                    return <Attr label={attr}
                                 key={attr}
                                 value={getAttribute(baseAttrs, attr)}
                                 onClick={e => attributeChanged(attr,e)}/>
                })}
            </Form>
        </Container>
    )
}