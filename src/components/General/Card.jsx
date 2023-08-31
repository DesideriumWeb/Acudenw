import React from "react";

const Card = ({ children }) => {
  return (
    <div
      className="bg-white rounded-lg"
      style={{ boxShadow: "0px 0px 4px #aaa" }}
    >
      {children}
    </div>
  );
};

export default Card;
