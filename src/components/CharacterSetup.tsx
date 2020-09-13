import React from "react";
import {NameEditor} from "./NameEditor";
import {BaseAttributes} from "./BaseAttributes";
import {CombatAttributes} from "./CombatAttributes";
import {SkillSet} from "./SkillSet";

export function HeroSetup() {
  return (
    <div className="rpgui-container framed">
      <NameEditor/>
      <BaseAttributes/>
      <CombatAttributes/>
      <SkillSet/>
    </div>
  );
}