
export enum HeroBaseAttribute {
    strength = "strength",
    dexterity = "dexterity",
    mind = "mind",
    presence = "presence",
}

interface Dictionary<T> {
    [Key: string]: T;
}
// TODO array of tuples now. Found a better way with typed immutable dictionary
export type HeroBaseAttributes = [HeroBaseAttribute, number][]

export function getAttribute(attrs: HeroBaseAttributes, attr: HeroBaseAttribute) : number {
    return attrs.find(value => value[0] === attr)![1];
}
export function setAttribute(attrs: HeroBaseAttributes, attr: HeroBaseAttribute, value: number) {
    const i = attrs.findIndex(value => value[0] === attr)
    attrs[i][1] = value
}


export interface CombatAttributes {
    Vitality: number
    Evasion: number
    Armor: number
    Alacrity: number
    Tenacity: number
    Power: number
}

export interface HeroDamageState {
    damageTaken: number
}

export interface HeroTenacityExchangeState {
    // Characters can use Tenacity and recieve Tenacity, so allow players to increment this value
    tenacityAcquired: number
}

export enum HeroSkill {
    fighting = "fighting",
    thievery = "thievery",
    stealth = "stealth",
    archery = "archery",
    learned = "learned",
    survival = "survival",
    perception = "perception",
    apothecary = "apothecary",
    intimidation = "intimidation",
    performance = "performance",
    manipulation = "manipulation",
    insight = "insight",
    power = "power"
}

export type HeroSkillSet = [HeroSkill, number][]

export function getSkill(skills: HeroSkillSet, skill: HeroSkill) : number {
    return skills.find(value => value[0] === skill)![1];
}
export function setSkill(attrs: HeroSkillSet, attr: HeroSkill, value: number) {
    const i = attrs.findIndex(value => value[0] === attr)
    attrs[i][1] = value
}


export interface HeroState {
    name: string
    baseAttributes: HeroBaseAttributes
    combatAttributes: CombatAttributes
    damageState: HeroDamageState
    tenacityState: HeroTenacityExchangeState
    skills: HeroSkillSet
    skillsMax: HeroSkillSet
}
