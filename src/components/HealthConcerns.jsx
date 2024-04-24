import React from "react";

import HealthConcernCard from "./HealthConcernCard";

import Kidney from "../assets/healthConcerns/kidney.jpg";
import Respiratory from "../assets/healthConcerns/racipiratory.jpg";
import Stomach from "../assets/healthConcerns/stomach.webp";
import BonesAndJoints from "../assets/healthConcerns/bonesandjoint.jpg";
import HeartImage from "../assets/healthConcerns/heartImage.png";

const HealthConcerns = () => {
  return (  
    <div className="flex flex-col justify-center bg-white px-[6.25rem] py-14 mb-4">
      <h1 className="text-2xl font-HelveticaNeueBold mb-8 #0F172A">
        Shop by Health Concerns
      </h1>
      <div className="xl:flex grid lg:grid-cols-3 md:grid-cols-2 gap-y-12 sm:place-content-between place-items-center xl:items-center xl:justify-between">
        <HealthConcernCard title="Respiratory Problem" image={Respiratory} healthConcern="respiratory problem" />
        <HealthConcernCard title="Stomach problem" image={Stomach} healthConcern="stomach problem" />
        <HealthConcernCard title="Bones Problem" image={BonesAndJoints} healthConcern="bones problem" />
        <HealthConcernCard title="Heart problem" image={HeartImage} healthConcern="heart problem" />
        <HealthConcernCard title="Kidney Problem" image={Kidney} healthConcern="kidney problem" />
      </div>
    </div>
  );
};

export default HealthConcerns;
