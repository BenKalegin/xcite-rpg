import {useSelector} from "react-redux";
import {HeroState} from "../model/HeroState";
import React from "react";
import { Container, Col, Form, FormGroup, Label} from "reactstrap"

// Players must be able to alter their character's Base Attributes
// The main attributes that can be directly adjusted are Strength, Dexterity, Mind, and Presence
// The default value for any attribute is 0

export const CombatAttributes = () => {
    const combatAttrs = useSelector((state: HeroState) => state.combatAttributes)

    return (
        <Container>
            <h2>Combat stats</h2>
            <Form className="form">
                <Col>
                    <FormGroup> <Label>Alacrity</Label>
                        <p>{combatAttrs.Alacrity}</p>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup> <Label>Armor</Label>
                        <p>{combatAttrs.Armor}</p>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup> <Label>Evasion</Label>
                        <p>{combatAttrs.Evasion}</p>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup> <Label>Power</Label>
                        <p>{combatAttrs.Power}</p>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup> <Label>Tenacity</Label>
                        <p>{combatAttrs.Tenacity}</p>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup> <Label>Vitality</Label>
                        <p>{combatAttrs.Vitality}</p>
                    </FormGroup>
                </Col>
            </Form>
        </Container>
    )
}