export const objToStr = (obj: any) => {
  let str = "";
  for (const key in obj) {
    if (!["name", "color", "thickness", "coverage"].includes(key)) continue;
    str += obj[key] + " ";
  }
  return str.trim();
};

export const dateToStr = (date: number) => {
  const dt = new Date(date);
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
};

export const numberRoundTwo = (i: number) => {
  return Math.round(i * 100) / 100;
};
