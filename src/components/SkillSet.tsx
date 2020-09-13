import {useDispatch, useSelector} from "react-redux";
import {getSkill, HeroSkill, HeroState} from "../model/HeroState";
import React from "react";
import { Container, Col, Form, FormGroup, Label, Input} from "reactstrap"
import {HeroSetupAction, heroSetupMsg} from "../actions/Actions";
import {enumKeys} from "../reducers/Reducers";


// Characters have a set of skills that they can train
// Skills have Ranks
// Rank 0: Untrained
// Rank 1: Novice
// Rank 2: Apprentice
// Rank 3: Adept
// Rank 4: Expert
// Rank 5: Master

export interface Props {
    max: number;
    label: string
    value: number
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Rank = (value: number ): string => {
    switch (value) {
        case 0: return "Untrained"
        case 1: return "Novice"
        case 2: return "Apprentice"
        case 3: return "Adept"
        case 4: return "Expert"
        case 5: return "Master"
        default: return "Hacker"
    }
}
const Skill = (props: Props) => {
    return (
    <Col>
        <FormGroup>
            <Label>{props.label} Rank: {Rank(props.value)}</Label>
            <Input
                type="number"
                value={props.value}
                min="0" max={props.max}
                onChange={(e) => props.onClick(e)}
            />
        </FormGroup>
    </Col>
    )
}

export const SkillSet = () => {
    const skills = useSelector((state: HeroState) => state.skills)
    const max = useSelector((state: HeroState) => state.skillsMax)

    const dispatch = useDispatch()
    const skillChanged = (skill: HeroSkill, e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(heroSetupMsg(HeroSetupAction.SkillChanged, {newValue: Number(e.target.value), skill: skill}))
    }

    return (
        <Container className="App">
            <h2>Train Your Skills</h2>
            <Form className="form">
                {enumKeys(HeroSkill).map(key => HeroSkill[key]).map(skill => {
                    return <Skill label={skill}
                                  key={skill}
                                  max={getSkill(max, skill)}
                                  value={getSkill(skills, skill)}
                                  onClick={e => skillChanged(skill,e)}/>
                })}
           </Form>
        </Container>
    )
}