import React from "react";

const TopBrandsCard = ({ title, image }) => {
  const topBrandsData = {
    "Dabur": "https://www.dabur.com/",
    "Johnson & Johnson": "https://www.jnj.in/",
    "Omron": "https://www.omron.com/global/en/",
    "Becton Dickinson": "https://www.bd.com/en-us",
    "Nivea": "https://www.nivea.in/",
    "Cetaphil": "https://www.cetaphil.com/us/",
    "Meditech": "https://ehr.meditech.com/",
    "Abbott":"https://www.abbott.co.in/",
      "BeatO":"https://www.beatoapp.com/",
      "Dr Morepen":"https://www.morepen.com/",
      "Dr Trust":"https://drtrust.in/",
      "Medtronic":"https://www.medtronic.com/in-en/index.html",
      "OneTouch":"https://www.onetouch.com/",
  };

  
  return (
    <div onClick={() => window.open(topBrandsData[title], "_blank")}  className="flex flex-col justify-between h-full max-h-[12rem] w-auto">
      <div></div>
      <img
        src={image}
        alt={`${title} image`}
        className="rounded-lg cursor-pointer w-[150px] object-contain p-2"
      />
      <h1 className="mt-3 font-HelveticaNeueMedium">{title}</h1>
    </div>
  );
};

export default TopBrandsCard;
