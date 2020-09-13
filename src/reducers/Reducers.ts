import {AllActions, HasInducedActions, HeroSetupAction, HeroSetupActions} from "../actions/Actions";
import {
    CombatAttributes, getAttribute, getSkill,
    HeroBaseAttribute,
    HeroBaseAttributes,
    HeroDamageState,
    HeroSkill,
    HeroSkillSet,
    HeroState,
    HeroTenacityExchangeState, setAttribute, setSkill
} from "../model/HeroState";
import {Action, Reducer} from "redux";


const combatAttributes = (base: HeroBaseAttributes, damage: HeroDamageState, tenacity: HeroTenacityExchangeState): CombatAttributes => {
    const dexterity = getAttribute(base, HeroBaseAttribute.dexterity);
    return {
        // Calculated as 3 + Strength
        Vitality: 3 + getAttribute(base, HeroBaseAttribute.strength) - damage.damageTaken,
        // Evasion: Calculated at 10 + Dexterity
        Evasion: 10 + dexterity,
        // Armor: Calculated as Evasion
        Armor: 10 + dexterity,
        // Alacrity: Calcuated as Dexterity + Mind
        Alacrity: dexterity + getAttribute(base, HeroBaseAttribute.mind),
        // Calculated as 1 + Presence
        // Characters can use Tenacity and recieve Tenacity, so allow players to increment this value
        Tenacity: 1 + getAttribute(base, HeroBaseAttribute.presence) + tenacity.tenacityAcquired,
        // Power: Always 0
        // Currently Unused
        Power: 0
    }
};

const skillDependencies: [HeroSkill, HeroBaseAttribute][] = [
    [HeroSkill.fighting, HeroBaseAttribute.strength],

    [HeroSkill.fighting, HeroBaseAttribute.dexterity],
    [HeroSkill.thievery, HeroBaseAttribute.dexterity],
    [HeroSkill.stealth, HeroBaseAttribute.dexterity],
    [HeroSkill.archery, HeroBaseAttribute.dexterity],

    [HeroSkill.learned, HeroBaseAttribute.mind],
    [HeroSkill.survival, HeroBaseAttribute.mind],
    [HeroSkill.perception, HeroBaseAttribute.mind],
    [HeroSkill.apothecary, HeroBaseAttribute.mind],

    [HeroSkill.intimidation, HeroBaseAttribute.presence],
    [HeroSkill.performance, HeroBaseAttribute.presence],
    [HeroSkill.manipulation, HeroBaseAttribute.presence],
    [HeroSkill.insight, HeroBaseAttribute.presence],
    [HeroSkill.power, HeroBaseAttribute.presence],

    [HeroSkill.power, HeroBaseAttribute.mind],
]

export const enumKeys = <E>(e: E): (keyof E)[] => (Object.keys(e) as (keyof E)[]);

const calcSkillsMax = (base: HeroBaseAttributes): HeroSkillSet => {
    const result = new Array<[HeroSkill, number]>();

    for (const key of enumKeys(HeroSkill)) {
        const skill = HeroSkill[key];
        const dependsOnAttrs = skillDependencies.filter(dep => dep[0] === skill ).map(dep => dep[1])
        const attrValues: number[] = dependsOnAttrs.map(attr => getAttribute(base, attr))
        const maxAllowed = Math.min(...attrValues)
        result.push([skill, maxAllowed])
    }
    return result;
}

const coerceSkills = (skills: HeroSkillSet, maxSkills: HeroSkillSet): HeroSkillSet => {
    const result: [HeroSkill, number][] = [...skills]
    for (let i = 0; i < result.length; i++){
        let skillValue = result[i];
        const skill = skillValue[0];
        const maxValue = getSkill(maxSkills, skill)
        if (maxValue < skillValue[1])
            result[i] = [skill, maxValue]
    }
    return result
}

const createInitialBaseAttributes = () : HeroBaseAttributes => {
    const result = new Array<[HeroBaseAttribute, number]>()
    for (const key of enumKeys(HeroBaseAttribute)) {
        const attr = HeroBaseAttribute[key];
        result.push([attr, 0])
    }
    return result
}

const initialBaseAttributes = createInitialBaseAttributes()

const initialDamageState: HeroDamageState =  {
    damageTaken: 0
}

const initialTenacityState: HeroTenacityExchangeState = {
    tenacityAcquired: 0
}

const createInitialSkillSet = () : HeroSkillSet => {
    const result = new Array<[HeroSkill, number]>()
    for (const key of enumKeys(HeroSkill)) {
        const attr = HeroSkill[key];
        result.push([attr, 0])
    }
    return result
}

const initialSkillsState = createInitialSkillSet()

export const initialState: HeroState = {
    baseAttributes: initialBaseAttributes,
    name:  "",
    damageState: initialDamageState,
    tenacityState: initialTenacityState,
    combatAttributes: combatAttributes(initialBaseAttributes, initialDamageState, initialTenacityState),
    skills: initialSkillsState,
    skillsMax: calcSkillsMax(initialBaseAttributes)
}

const attrChangedReducer = (state: HeroState, attr: HeroBaseAttribute, value: number) : HeroState => {
    const baseAttributes = [...state.baseAttributes]
    setAttribute(baseAttributes, attr, value)
    const skillsMax = calcSkillsMax(baseAttributes);
    return {
        ...state,
        baseAttributes: baseAttributes,
        combatAttributes: combatAttributes(baseAttributes, state.damageState, state.tenacityState),
        skillsMax: skillsMax,
        skills: coerceSkills(state.skills, skillsMax)
    }
}

const skillChangedReducer = (state: HeroState, skill: HeroSkill, value: number) : HeroState => {
    const skills = [...state.skills]
    setSkill(skills, skill, value)
    return {
        ...state,
        skills: coerceSkills(skills, state.skillsMax)
    }
}

export const heroSetupReducer = (state: HeroState, action: HeroSetupActions) : HeroState => {
    switch (action.type) {
        case HeroSetupAction.NameChanged:
            return {
                ...state,
                name: action.payload.newName
                }
        case HeroSetupAction.BaseAttributeChanged:
            return attrChangedReducer(state, action.payload.attr, action.payload.newValue)

        case HeroSetupAction.SkillChanged:
            return skillChangedReducer(state, action.payload.skill, action.payload.newValue)
        default:
            return state;
    }
}

export const rootReducer : Reducer<HeroState, AllActions> = (state:HeroState = initialState, action) => {
    let events: Action[] = [];
    const result = heroSetupReducer(state, action as HeroSetupActions)

    const asyncDispatch = (action as any as HasInducedActions).asyncDispatch;
    if (asyncDispatch)
        asyncDispatch(events);

    return result
}
