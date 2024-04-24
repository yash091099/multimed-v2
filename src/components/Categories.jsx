import React from "react";
import CategoryCard from "./CategoryCard";

import MedicinesImage from "../assets/categories/medicines.png";
import DevicesImage from "../assets/categories/devices.png";
import essentialsImage from "../assets/categories/essentials.png";
import overTheCounterImage from "../assets/categories/overTheCounter.png";

const Categories = () => {
  return (
    <div className="   mt-2" style={{borderRadius: '10px'}}>
      <div className="grid md:grid-cols-4 grid-cols-2 justify-center gap-[4.5rem]">
        <CategoryCard title="Medicines" image={MedicinesImage} subCategory="medicine" />
        <CategoryCard title="Devices" image={DevicesImage} subCategory={"device"}/>
        <CategoryCard title="Essentials" image={essentialsImage} subCategory="essentials" />
        <CategoryCard title="Over the Counter" image={overTheCounterImage} subCategory="over the counter" />
      </div>
    </div>
  );
};

export default Categories;
