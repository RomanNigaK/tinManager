import React from "react";

interface Icolor {
  color: string;
}
export default function Color({ color }: Icolor) {
  const matches = [
    { rar: "RAL1014", rgb: "#ddc49a", color: "#000000" },
    { rar: "RAL1015", rgb: "#e6d2b5", color: "#000000" },
    { rar: "RAL1018", rgb: "#faca30", color: "#000000" },
    { rar: "RAL2004", rgb: "#e25303", color: "#000000" },
    { rar: "RAL3005", rgb: "#59191f", color: "#ffffff" },
    { rar: "RAL3009", rgb: "#6d342d", color: "#ffffff" },
    { rar: "RAL3011", rgb: "#792423", color: "#ffffff" },
    { rar: "RAL5002", rgb: "#00387b", color: "#ffffff" },
    { rar: "RAL5005", rgb: "#005387", color: "#ffffff" },
    { rar: "RAL5015", rgb: "#007cb0", color: "#000000" },
    { rar: "RAL5021", rgb: "#007577", color: "#000000" },
    { rar: "RAL6002", rgb: "#325928", color: "#ffffff" },
    { rar: "RAL6005", rgb: "#114232", color: "#ffffff" },
    { rar: "RAL6020", rgb: "#37422f", color: "#ffffff" },
    { rar: "RAL7004", rgb: "#9b9b9b", color: "#000000" },
    { rar: "RAL7024", rgb: "#45494e", color: "#ffffff" },
    { rar: "RAL8017", rgb: "#442f29", color: "#ffffff" },
    { rar: "RAL8004", rgb: "#8d4931", color: "#ffffff" },
    { rar: "RAL9002", rgb: "#d7d5cb", color: "#000000" },
    { rar: "RAL9003", rgb: "#ffffff", color: "#000000" },
    { rar: "RAL9005", rgb: "#0e0e10", color: "#ffffff" },
    { rar: "RAL9006", rgb: "#a1a1a0", color: "#000000" },
    { rar: "RAL9003", rgb: "#ffffff", color: "#000000" },
    { rar: "RAL9010", rgb: "#f1ece1", color: "#000000" },
    { rar: "RAL8017", rgb: "#442f29", color: "#ffffff" },
    { rar: "RR32", rgb: "#3d3635", color: "#ffffff" },
    { rar: "RR750", rgb: "#8d4931", color: "#ffffff" },
    { rar: "RR29", rgb: "#6d342d", color: "#ffffff" },
    { rar: "RR23", rgb: "#4f5358", color: "#ffffff" },
    { rar: "RR11", rgb: "#37422f", color: "#ffffff" },
    { rar: "RR35", rgb: "#0f4c64", color: "#ffffff" },
  ];

  const isMatches = matches.find((i) => i.rar === color);

  const styleColor = {
    background: !isMatches ? "#ffffff" : isMatches.rgb,
    color: !isMatches ? "#000000" : isMatches.color,
  };
  return <div style={styleColor}>{color}</div>;
}
