import React from "react";

export const Separador = ({ title }) => {
  return (
    <div
      style={{
        paddingLeft: "16px",
        marginTop: "80px", 
        marginBottom: "0", 
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: 0,
          marginBottom: "16px",
        }}
      >
        {title}
      </h1>
    </div>
  );
};
