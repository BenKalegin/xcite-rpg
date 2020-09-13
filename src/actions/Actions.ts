import {Action} from 'redux'
import {HeroBaseAttribute, HeroSkill} from "../model/HeroState";

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends Action
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        }
};

export function createMsg<Obj extends { [index: string]: any }>() {
    return function<Key extends keyof Obj>(
        name: Key,
        ...args: Obj[Key] extends undefined ? [] : [Obj[Key]]
    ) {
        if (args.length > 0) {
            return { type: name, payload: args[0] };
        }
        return { type: name };
    };
}


export enum HeroSetupAction {
    NameChanged = "HERO_SETUP_NAME_CHANGED",
    BaseAttributeChanged = "HERO_SETUP_BASE_ATTRIBUTE_CHANGED",
    SkillChanged = "HERO_SETUP_SKILL_CHANGED",
}

type HeroSetupMessages = {
    [HeroSetupAction.NameChanged]: { newName: string };
    [HeroSetupAction.BaseAttributeChanged]: { attr: HeroBaseAttribute, newValue: number };
    [HeroSetupAction.SkillChanged]: { skill: HeroSkill, newValue: number };
}

export enum ApplicationAction {
    StartApplication = "APP_START"
}

type ApplicationMessages = {
    [ApplicationAction.StartApplication]: { };
};

export type HeroSetupActions = ActionMap<HeroSetupMessages>[keyof ActionMap<HeroSetupMessages>];
export type ApplicationActions = ActionMap<ApplicationMessages>[keyof ActionMap<ApplicationMessages>];

export const heroSetupMsg = createMsg<HeroSetupMessages>();
export const applicationMsg = createMsg<ApplicationMessages>();

export type AllActions = HeroSetupActions | ApplicationActions

export interface HasInducedActions {
    asyncDispatch(actions: Action[]): void;
}




