import React from "react";

/* Svgs */
import cookingPotIcon from "../assets/svgs/initiativeIcons/cooking_pot.svg";
import donationPointIcon from "../assets/svgs/initiativeIcons/donation_point.svg";

const CategorySvg = ({ category, emergency }) => {
  // TODO: add missing svgs
  if (emergency) {
    return null;
  } else {
    switch (category) {
      case "Olla":
        return <img src={cookingPotIcon} alt="" />;
      case "Punto de Donación":
        return <img src={donationPointIcon} alt="" />;
      default:
        return null;
    }
  }
};

export default CategorySvg;
