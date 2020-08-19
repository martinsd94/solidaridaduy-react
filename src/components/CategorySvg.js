import React from "react";

/* Svgs */
import cookingPotIcon from "../assets/svgs/initiativeIcons/cooking_pot.svg";
import basketIcon from "../assets/svgs/initiativeIcons/basket.svg";
import donationPointIcon from "../assets/svgs/initiativeIcons/donation_point.svg";
import teaTimeIcon from "../assets/svgs/initiativeIcons/tea_time.svg";
import emergencyIcon from "../assets/svgs/initiativeIcons/emergency.svg";

const CategorySvg = ({ category, emergency }) => {
  // TODO: add missing svgs
  if (emergency) {
    return <img src={emergencyIcon} alt="" />;
  } else {
    switch (category) {
      case "Olla":
        return <img src={cookingPotIcon} alt="" />;
      case "Merienda":
        return <img src={teaTimeIcon} alt="" />;
      case "Canasta":
        return <img src={basketIcon} alt="" />;
      case "Punto de Donación":
        return <img src={donationPointIcon} alt="" />;
      default:
        return null;
    }
  }
};

export default CategorySvg;
