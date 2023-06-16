type TypeSizes = {
  position: { marginLeft: number; marginTop: number };
  value: number;
  id: number;
  type: "length" | "degree" | "bend" | "square";
};

type TypeProductList = {
  id: number;
  type: 1 | 2;
  // 1 классические изделия
  // 2 дымники

  name: string;
  alias: string;
  arrow: number;
  sizes: TypeSizes[];
  svgPaths: string[];
};
export type { TypeProductList, TypeSizes };

class ProductList {
  public products: TypeProductList[] = [
    {
      id: 1,
      type: 1,
      name: "Яндовая",
      alias: "#яндовая планка #яндовая верхняя #яндовая накладка",
      arrow: 2,
      sizes: [
        {
          position: {
            marginLeft: -20,
            marginTop: 80,
          },
          value: 10,
          id: 1,
          type: "bend",
        },
        {
          position: {
            marginLeft: 270,
            marginTop: 80,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 200,
            marginTop: 150,
          },
          value: 150,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 40,
            marginTop: 150,
          },
          value: 150,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 80,
            marginTop: 200,
          },
          value: 30,
          id: 5,
          type: "length",
        },
        {
          position: {
            marginLeft: 170,
            marginTop: 200,
          },
          value: 30,
          id: 6,
          type: "length",
        },
        {
          position: {
            marginLeft: 120,
            marginTop: 240,
          },
          value: 30,
          id: 7,
          type: "length",
        },
        {
          position: {
            marginLeft: 120,
            marginTop: 120,
          },
          value: 135,
          id: 8,
          type: "degree",
        },
      ],
      svgPaths: [
        "M254.221 103C268.932 100.908 276.841 98.2879 275.251 81.2242C275.17 80.3648 274.106 80.0321 273.541 80.6847L175.244 194.218C175.087 194.4 175 194.632 175 194.873V228.5C175 229.052 174.552 229.5 174 229.5L126 229.5C125.448 229.5 125 229.052 125 228.5V194.873C125 194.632 124.913 194.4 124.756 194.218L26.6226 80.874C26.0336 80.1937 24.9236 80.5844 24.9022 81.484C24.5547 96.036 28.8566 100.902 45.7793 103",
      ],
    },
    {
      id: 2,
      type: 1,
      name: "Яндовая",
      alias: "#яндовая планка #яндовая нижняя",
      arrow: 2,
      sizes: [
        {
          position: {
            marginLeft: 10,
            marginTop: 70,
          },
          value: 10,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 260,
            marginTop: 70,
          },
          value: 10,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 210,
            marginTop: 150,
          },
          value: 150,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 50,
            marginTop: 150,
          },
          value: 150,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 120,
          },
          value: 135,
          id: 5,
          type: "degree",
        },
      ],
      svgPaths: [
        "M258 96H272.444C273.354 96 273.791 97.1169 273.123 97.7345L150.679 210.873C150.296 211.227 149.705 211.227 149.321 210.873L26.8771 97.7345C26.2087 97.1168 26.6457 96 27.5558 96H41",
      ],
    },
    {
      id: 3,
      type: 1,
      name: "Угол наружный",
      alias: "#угол наружный",
      arrow: 4,
      sizes: [
        {
          position: {
            marginLeft: 75,
            marginTop: 60,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 15,
            marginTop: 150,
          },
          value: 50,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 150,
            marginTop: 260,
          },
          value: 50,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 230,
            marginTop: 215,
          },
          value: 10,
          id: 4,
          type: "bend",
        },
        {
          position: {
            marginLeft: 80,
            marginTop: 200,
          },
          value: 90,
          id: 5,
          type: "degree",
        },
      ],
      svgPaths: [
        "M64 83C76.458 69.2235 73.0673 63.5719 65.7546 55.0307C65.1526 54.3275 64 54.7547 64 55.6804V246C64 246.552 64.4477 247 65 247H253.5C254.352 247 254.8 246 254.223 245.374C244.242 234.534 238.842 239.351 229.5 247",
      ],
    },
    {
      id: 4,
      type: 1,
      name: "Угол внутренний",
      alias: "#угол внутренний",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 75,
            marginTop: 60,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 15,
            marginTop: 150,
          },
          value: 50,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 150,
            marginTop: 260,
          },
          value: 50,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 230,
            marginTop: 215,
          },
          value: 10,
          id: 4,
          type: "bend",
        },
        {
          position: {
            marginLeft: 80,
            marginTop: 200,
          },
          value: 90,
          id: 5,
          type: "degree",
        },
      ],
      svgPaths: [
        "M64.0001 83C55.0815 71.7678 52.2171 66.0873 62.3055 54.8199C62.9055 54.1497 64.0001 54.5772 64.0001 55.4767V246C64.0001 246.552 64.4478 247 65.0001 247H253.23C254.122 247 254.563 248.077 253.914 248.69C245.669 256.462 240.063 258.098 229.5 247",
      ],
    },
    {
      id: 5,
      type: 1,
      name: "Снегодержатель",
      alias: "#снегодержатель #снегозадержатель",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 50,
            marginTop: 240,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 230,
            marginTop: 240,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 100,
            marginTop: 120,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 220,
            marginTop: 140,
          },
          value: 80,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 50,
            marginTop: 200,
          },
          value: 20,
          id: 5,
          type: "length",
        },

        {
          position: {
            marginLeft: 230,
            marginTop: 200,
          },
          value: 20,
          id: 6,
          type: "length",
        },
      ],
      svgPaths: [
        "M225.5 234C236.783 241.341 242.545 242.376 249.449 235.624C250.067 235.019 249.622 234 248.757 234L210.431 234C209.907 234 209.471 233.594 209.434 233.071L196.217 47.0587C196.149 46.0935 194.886 45.7787 194.372 46.5988L77.2939 233.531C77.111 233.823 76.7908 234 76.4464 234L41.2171 234C40.2353 234 39.8604 235.252 40.693 235.772C51.8044 242.716 57.1468 241.058 65 234",
      ],
    },
    {
      id: 6,
      type: 1,
      name: "Полоса",
      alias: "#соеденительная полоса #полоса",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 50,
            marginTop: 170,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 230,
            marginTop: 170,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 120,
          },
          value: 100,
          id: 3,
          type: "length",
        },
      ],
      svgPaths: [
        "M79.1555 155C69.8139 162.649 64.4135 167.466 54.432 156.626C53.8555 156 54.304 155 55.1552 155L241.874 155C242.812 155 243.22 156.173 242.482 156.752C229.863 166.643 225.941 164.309 214.156 155",
      ],
    },
    {
      id: 7,
      type: 1,
      name: "Колпак",
      alias: "#колпак на парапет #парапет",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 50,
            marginTop: 220,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 230,
            marginTop: 220,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 180,
          },
          value: 20,
          id: 3,
          type: "length",
        },

        {
          position: {
            marginLeft: 250,
            marginTop: 180,
          },
          value: 20,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 70,
          },
          value: 100,
          id: 5,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 120,
          },
          value: 100,
          id: 6,
          type: "length",
        },
        {
          position: {
            marginLeft: 240,
            marginTop: 120,
          },
          value: 100,
          id: 7,
          type: "length",
        },
      ],
      svgPaths: [
        "M60.9999 201.766C59.3639 216.015 57.3726 222.057 42.2718 222.891C41.3736 222.94 40.902 221.864 41.538 221.228L74.4729 188.293C74.6605 188.105 74.7658 187.851 74.7658 187.586L74.7658 110C74.7658 109.448 75.2135 109 75.7658 109L231.266 109C231.818 109 232.266 109.448 232.266 110L232.266 187.625C232.266 187.867 232.353 188.1 232.512 188.282L261.265 221.258C261.838 221.915 261.345 222.927 260.476 222.858C245.493 221.67 243.724 213.125 244.269 201.766",
      ],
    },
    {
      id: 8,
      type: 1,
      name: "Колпак",
      alias: "#колпак на парапет #парапет",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 90,
            marginTop: 200,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 200,
            marginTop: 200,
          },
          value: 10,
          id: 2,
          type: "bend",
        },

        {
          position: {
            marginLeft: 130,
            marginTop: 70,
          },
          value: 100,
          id: 5,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 150,
          },
          value: 100,
          id: 6,
          type: "length",
        },
        {
          position: {
            marginLeft: 240,
            marginTop: 150,
          },
          value: 100,
          id: 7,
          type: "length",
        },
      ],
      svgPaths: [
        "M74.7658 196C82.8772 204.564 82.0907 213.447 76.481 222.065C75.958 222.869 74.7658 222.481 74.7658 221.523L74.7658 191L74.7658 110C74.7658 109.448 75.2135 109 75.7658 109L231.266 109C231.818 109 232.266 109.448 232.266 110L232.266 188L232.266 221.645C232.266 222.59 231.086 222.992 230.531 222.226C223.467 212.471 224.304 206.348 232.266 196",
      ],
    },
    {
      id: 9,
      type: 1,
      name: "Подкарнизная планка",
      alias: "#подкарнизная планка #угол наружный",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 140,
            marginTop: 50,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 180,
            marginTop: 220,
          },
          value: 10,
          id: 2,
          type: "bend",
        },

        {
          position: {
            marginLeft: 130,
            marginTop: 260,
          },
          value: 50,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 70,
            marginTop: 150,
          },
          value: 150,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 180,
          },
          value: 90,
          id: 5,
          type: "degree",
        },
      ],
      svgPaths: [
        "M176 252.926C186.116 244.761 191.992 240.824 201.717 251.368C202.295 251.995 201.835 252.995 200.983 252.992C170.826 252.881 152.952 252.906 122.012 252.997C121.459 252.999 121 252.55 121 251.997V47.3448C121 46.4639 122.053 46.0204 122.667 46.652C130.892 55.1132 131.11 60.6982 121 71",
      ],
    },
    {
      id: 10,
      type: 1,
      name: "Подкарнизная планка",
      alias: "#подкарнизная планка #угол наружный",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 180,
            marginTop: 220,
          },
          value: 10,
          id: 1,
          type: "bend",
        },

        {
          position: {
            marginLeft: 130,
            marginTop: 260,
          },
          value: 50,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 70,
            marginTop: 150,
          },
          value: 150,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 180,
          },
          value: 90,
          id: 4,
          type: "degree",
        },
      ],
      svgPaths: [
        "M121 45V251.997C121 252.55 121.459 252.999 122.012 252.997C152.952 252.906 170.826 252.881 200.983 252.992C201.835 252.995 202.295 251.995 201.717 251.368C191.992 240.824 186.116 244.761 176 252.926",
      ],
    },
    {
      id: 11,
      type: 1,
      name: "Канек",
      alias: "#канек #канек фигурный",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 140,
            marginTop: 50,
          },
          value: 30,
          id: 1,
          type: "length",
        },

        {
          position: {
            marginLeft: 90,
            marginTop: 90,
          },
          value: 30,
          id: 2,
          type: "length",
        },

        {
          position: {
            marginLeft: 180,
            marginTop: 90,
          },
          value: 30,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 160,
          },
          value: 150,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 230,
            marginTop: 160,
          },
          value: 150,
          id: 5,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 230,
          },
          value: 10,
          id: 6,
          type: "bend",
        },
        {
          position: {
            marginLeft: 240,
            marginTop: 230,
          },
          value: 10,
          id: 7,
          type: "bend",
        },
        {
          position: {
            marginLeft: 120,
            marginTop: 150,
          },
          value: 135,
          id: 8,
          type: "degree",
        },
      ],
      svgPaths: [
        "M45.7792 205.5C47.5247 219.212 43.6599 224.669 27.985 228.768C27.0487 229.012 26.375 227.912 27.0085 227.18L124.756 114.282C124.913 114.1 125 113.868 125 113.627V80.0001C125 79.4478 125.448 79.0001 126 79.0001H174C174.552 79.0001 175 79.4478 175 80.0001V113.627C175 113.868 175.087 114.1 175.244 114.282L273.165 227.381C273.781 228.092 273.155 229.166 272.235 228.973C254.924 225.35 253.869 218.445 254.221 205.5",
      ],
    },
    {
      id: 12,
      type: 1,
      name: "Канек",
      alias: "#канек #канек ребро",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 50,
            marginTop: 100,
          },
          value: 150,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 210,
            marginTop: 100,
          },
          value: 150,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 200,
          },
          value: 10,
          id: 3,
          type: "bend",
        },
        {
          position: {
            marginLeft: 240,
            marginTop: 200,
          },
          value: 10,
          id: 4,
          type: "bend",
        },
        {
          position: {
            marginLeft: 120,
            marginTop: 150,
          },
          value: 135,
          id: 5,
          type: "degree",
        },
      ],
      svgPaths: [
        "M43 177.868C43.983 189.839 37.8201 193.253 27.7954 194.277C26.8605 194.373 26.3674 193.237 27.0577 192.599L149.321 79.6271C149.704 79.273 150.295 79.273 150.679 79.6271L273.093 192.738C273.765 193.359 273.316 194.469 272.402 194.422C259.395 193.754 257.111 188.951 257 177.868",
      ],
    },
    {
      id: 13,
      type: 1,
      name: "Торцевая планка",
      alias: "#торцевая планка #ветровая планка ",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 60,
            marginTop: 259,
          },
          value: 10,
          id: 1,
          type: "bend",
        },
        {
          position: {
            marginLeft: 22,
            marginTop: 207,
          },
          value: 20,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 135,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 159,
            marginTop: 100,
          },
          value: 100,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 264,
            marginTop: 52,
          },
          value: 20,
          id: 5,
          type: "length",
        },
      ],
      svgPaths: [
        "M56.2343 245.266C54.5983 259.515 52.607 265.557 37.5062 266.391C36.608 266.44 36.1363 265.364 36.7724 264.728L69.7073 231.793C69.8948 231.606 70.0002 231.351 70.0002 231.086L70.0002 64.7768C70.0002 63.7897 71.2786 63.3995 71.8298 64.2185L87.2029 87.0586C87.3887 87.3346 87.6997 87.5002 88.0325 87.5002L284.121 87.5001C285.262 87.5001 285.513 85.8971 284.427 85.548L262.5 78.5",
      ],
    },
    {
      id: 14,
      type: 1,
      name: "Торцевая планка",
      alias: "#торцевая планка #ветровая планка ",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 49,
            marginTop: 245,
          },
          value: 10,
          id: 1,
          type: "bend",
        },
        {
          position: {
            marginLeft: 250,
            marginTop: 96,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 15,
            marginTop: 208,
          },
          value: 10,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 20,
            marginTop: 120,
          },
          value: 100,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 150,
            marginTop: 40,
          },
          value: 100,
          id: 5,
          type: "length",
        },
        {
          position: {
            marginLeft: 264,
            marginTop: 52,
          },
          value: 20,
          id: 6,
          type: "length",
        },
      ],
      svgPaths: [
        "M53.2341 225.587C51.5981 239.836 49.6068 245.878 34.506 246.712C33.6078 246.762 33.1361 245.685 33.7722 245.049L66.7071 212.114C66.8946 211.927 67 211.673 67 211.407L67 67C67 66.4477 67.4477 66 68 66L250.637 66.0001C250.871 66.0001 251.099 66.0826 251.278 66.233L276.587 87.3999C277.279 87.9786 276.903 89.096 276.002 89.1249C261.882 89.5775 258.707 84.9343 258.5 72.2728",
      ],
    },
    {
      id: 15,
      type: 1,
      name: "Торцевая планка",
      alias: "#торцевая планка #ветровая планка ",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 86,
            marginTop: 232,
          },
          value: 10,
          id: 1,
          type: "bend",
        },
        {
          position: {
            marginLeft: 249,
            marginTop: 96,
          },
          value: 10,
          id: 2,
          type: "bend",
        },
        {
          position: {
            marginLeft: 78,
            marginTop: 135,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 139,
            marginTop: 40,
          },
          value: 100,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 264,
            marginTop: 52,
          },
          value: 100,
          id: 5,
          type: "length",
        },
      ],
      svgPaths: [
        "M258.5 72.2727C258.707 84.9341 261.882 89.5773 276.002 89.1247C276.903 89.0958 277.279 87.9784 276.587 87.3998L251.279 66.2329C251.099 66.0824 250.872 66 250.637 66L68 65.9999C67.4477 65.9999 67 66.4476 67 66.9999L67 211.822L67.0002 253.031C67.0002 253.988 68.2062 254.378 68.7517 253.591C78.6575 239.294 75.2482 231.036 67 217",
      ],
    },
    {
      id: 16,
      type: 1,
      name: "Карнизная планка",
      alias: "#карнизная планка #планка сопряжения #капельник ",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 149,
            marginTop: 84,
          },
          value: 100,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 228,
            marginTop: 186,
          },
          value: 60,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 160,
            marginTop: 234,
          },
          value: 10,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 175,
            marginTop: 157,
          },
          value: 135,
          id: 4,
          type: "degree",
        },
      ],
      svgPaths: [
        "M57 54L218.513 150.557C218.815 150.738 219 151.064 219 151.416V254.555C219 255.557 217.692 255.936 217.155 255.091L192.871 216.788",
      ],
    },
    {
      id: 17,
      type: 1,
      name: "Планка сопряжения кровли",
      alias: "#карнизная планка #планка сопряжения #капельник ",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 149,
            marginTop: 84,
          },
          value: 100,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 228,
            marginTop: 186,
          },
          value: 100,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 160,
            marginTop: 234,
          },
          value: 10,
          id: 3,
          type: "bend",
        },
        {
          position: {
            marginLeft: 160,
            marginTop: 157,
          },
          value: 135,
          id: 4,
          type: "degree",
        },
      ],
      svgPaths: [
        "M51 48L212.513 144.557C212.815 144.738 213 145.064 213 145.416V249.541C213 250.438 211.917 250.869 211.324 250.195C202.784 240.493 204.59 233.56 213 221",
      ],
    },
    {
      id: 18,
      type: 1,
      name: "Отлив",
      alias: "#отлив #подоконник",
      arrow: 1,
      sizes: [
        {
          position: {
            marginLeft: 30,
            marginTop: 234,
          },
          value: 20,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 1,
            marginTop: 184,
          },
          value: 20,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 119,
            marginTop: 135,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 210,
            marginTop: 116,
          },
          value: 100,
          id: 4,
          type: "degree",
        },
        {
          position: {
            marginLeft: 270,
            marginTop: 104,
          },
          value: 20,
          id: 5,
          type: "length",
        },
      ],
      svgPaths: [
        "M56 222L29.6902 231.396C28.9524 231.66 28.2119 231.011 28.3761 230.245L39.8574 176.666C39.9434 176.264 40.2663 175.956 40.6715 175.889L259.164 139.639C259.646 139.559 260 139.141 260 138.652V92",
      ],
    },
    {
      id: 19,
      type: 1,
      name: "Примыкание",
      alias: "#примыкание ",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 30,
            marginTop: 47,
          },
          value: 20,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 80,
            marginTop: 180,
          },
          value: 90,
          id: 2,
          type: "degree",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 143,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 224,
          },
          value: 100,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 230,
            marginTop: 228,
          },
          value: 10,
          id: 5,
          type: "bend",
        },
      ],
      svgPaths: [
        "M229.5 217C240.063 228.098 245.669 226.462 253.913 218.69C254.563 218.077 254.122 217 253.23 217H65C64.4477 217 64 216.552 64 216V70.5C64 69.9477 63.5523 69.5 63 69.5H29.5",
      ],
    },
    {
      id: 20,
      type: 1,
      name: "Примыкание",
      alias: "#примыкание ",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 80,
            marginTop: 180,
          },
          value: 90,
          id: 2,
          type: "degree",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 143,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 224,
          },
          value: 100,
          id: 4,
          type: "length",
        },
        {
          position: {
            marginLeft: 230,
            marginTop: 228,
          },
          value: 10,
          id: 5,
          type: "bend",
        },
      ],
      svgPaths: [
        "M229.5 217C240.063 228.098 245.669 226.462 253.913 218.69C254.563 218.077 254.122 217 253.23 217H65C64.4477 217 64 216.552 64 216V69.5",
      ],
    },
    {
      id: 21,
      type: 1,
      name: "Примыкание",
      alias: "#примыкание ",
      arrow: 3,
      sizes: [
        {
          position: {
            marginLeft: 80,
            marginTop: 180,
          },
          value: 90,
          id: 1,
          type: "degree",
        },
        {
          position: {
            marginLeft: 30,
            marginTop: 143,
          },
          value: 100,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 130,
            marginTop: 224,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 210,
            marginTop: 240,
          },
          value: 10,
          id: 4,
          type: "bend",
        },
        {
          position: {
            marginLeft: 240,
            marginTop: 209,
          },
          value: 20,
          id: 5,
          type: "length",
        },
      ],
      svgPaths: [
        "M64 69.5V216C64 216.552 64.4477 217 65 217H217.761C217.918 217 218.073 217.037 218.213 217.108L253.69 235.077C254.56 235.518 254.343 236.802 253.374 236.913C239.407 238.509 238.543 234.755 232 224.091",
      ],
    },

    {
      id: 23,
      type: 2,
      name: "Дымник",
      alias: "#дымник #зонт #вентвыход",
      arrow: 0,
      sizes: [
        {
          position: {
            marginLeft: 130,
            marginTop: 230,
          },
          value: 100,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 220,
            marginTop: 120,
          },
          value: 100,
          id: 2,
          type: "length",
        },
      ],
      svgPaths: [
        "M74.5 221H149H223.5M74.5 221V125V29M74.5 221L149 173M223.5 221V125V29M223.5 221L149 173M223.5 29L149 29L74.5 29M223.5 29L149 77M74.5 29L149 77M149 173V125V77",
      ],
    },
    {
      id: 24,
      type: 2,
      name: "Дымник",
      alias: "#дымник #зонт #вентвыход",
      arrow: 0,
      sizes: [
        {
          position: {
            marginLeft: 70,
            marginTop: 240,
          },
          value: 100,
          id: 1,
          type: "length",
        },
        {
          position: {
            marginLeft: 145,
            marginTop: 170,
          },
          value: 100,
          id: 2,
          type: "length",
        },
        {
          position: {
            marginLeft: 245,
            marginTop: 80,
          },
          value: 100,
          id: 3,
          type: "length",
        },
        {
          position: {
            marginLeft: 100,
            marginTop: 10,
          },
          value: 100,
          id: 4,
          type: "length",
        },
      ],
      svgPaths: [
        "M38 232H92H149M38 232V136V40M38 232L92 184M149 232V136M149 232L92 184M38 40H92H166.5H249.5M38 40L92 88M149 136H249.5M149 136L92 88M92 184V136V88M92 88H214M249.5 40V88M249.5 40L214 88M249.5 136V88M249.5 136L214 88M249.5 88H214",
      ],
    },
    {
      id: 1000,
      type: 1,
      name: "?",
      alias: "#?",
      arrow: 0,
      sizes: [
        {
          position: {
            marginLeft: 10,
            marginTop: 50,
          },
          value: 150,
          id: 1,
          type: "length",
        },
      ],
      svgPaths: [
        "M100.5 112V99.5C100.5 71.8858 122.886 49.5 150.5 49.5H160.209C184.67 49.5 204.5 69.3298 204.5 93.7911V93.7911C204.5 105.457 199.898 116.651 191.693 124.944L170.147 146.718C161.972 154.98 156.931 165.833 155.89 177.409L149.847 244.636C149.755 245.665 151.093 246.142 151.672 245.286L174.5 211.5M154.5 257.75V257.75C154.5 255.127 152.373 253 149.75 253H149.25C146.627 253 144.5 255.127 144.5 257.75V257.75C144.5 260.373 146.627 262.5 149.25 262.5H149.75C152.373 262.5 154.5 260.373 154.5 257.75Z",
      ],
    },
  ];
  private _bendWidth: number;
  constructor(bendWidth: number = 10) {
    this._bendWidth = bendWidth;
  }

  getSvg(
    id: number,
    arrow: number,
    size?: number,
    fill?: string,
    stroke?: string,
    strokeWidth?: number
  ) {
    const path = this.products.find((item) => item.id === id)!.svgPaths;

    return this.createSvg(path, arrow, size || 100, fill, stroke, strokeWidth);
  }
  getItems(search?: string | boolean) {
    if (!search) return this.products;
    if (typeof search === "string")
      return this.products.filter((i) => i.alias.indexOf(search, 0) !== -1);
  }
  getItemId(id: number) {
    return this.products.find((item) => item.id === id);
  }
  createSvg(
    path: string[],
    arrow: number,
    size?: number,
    fill?: string,
    stroke?: string,
    strokeWidth?: number
  ) {
    const sideColor = (side: number) => {
      switch (side) {
        case 1:
          return "M63.0135 62.4998C63.2895 62.4924 63.5073 62.2625 63.4998 61.9865L63.3782 57.4881C63.3708 57.2121 63.141 56.9944 62.8649 57.0018C62.5889 57.0093 62.3711 57.2391 62.3786 57.5152L62.4867 61.5137L58.4881 61.6218C58.2121 61.6292 57.9944 61.859 58.0018 62.1351C58.0093 62.4111 58.2391 62.6289 58.5152 62.6214L63.0135 62.4998ZM24.6561 26.363L62.6561 62.363L63.3439 61.637L25.3439 25.637L24.6561 26.363Z";
        case 2:
          return "M145.646 56.6986C145.842 56.8938 146.158 56.8938 146.354 56.6986L149.536 53.5166C149.731 53.3213 149.731 53.0047 149.536 52.8095C149.34 52.6142 149.024 52.6142 148.828 52.8095L146 55.6379L143.172 52.8095C142.976 52.6142 142.66 52.6142 142.464 52.8095C142.269 53.0047 142.269 53.3213 142.464 53.5166L145.646 56.6986ZM145.5 4V56.345H146.5V4H145.5Z";
        case 3:
          return "M252.5 48.0135C252.5 48.2897 252.724 48.5135 253 48.5135L257.5 48.5135C257.776 48.5135 258 48.2897 258 48.0135C258 47.7374 257.776 47.5135 257.5 47.5135H253.5V43.5135C253.5 43.2374 253.276 43.0135 253 43.0135C252.724 43.0135 252.5 43.2374 252.5 43.5135L252.5 48.0135ZM289.66 10.6464L252.647 47.66L253.354 48.3671L290.367 11.3536L289.66 10.6464Z";
        case 4:
          return "M45.5135 258C45.5135 257.724 45.2897 257.5 45.0135 257.5H40.5135C40.2374 257.5 40.0135 257.724 40.0135 258C40.0135 258.276 40.2374 258.5 40.5135 258.5H44.5135V262.5C44.5135 262.776 44.7374 263 45.0135 263C45.2897 263 45.5135 262.776 45.5135 262.5L45.5135 258ZM8.35355 295.367L45.3671 258.354L44.66 257.646L7.64645 294.66L8.35355 295.367Z";
        case 5:
          return "M150.354 247.646C150.158 247.451 149.842 247.451 149.646 247.646L146.464 250.828C146.269 251.024 146.269 251.34 146.464 251.536C146.66 251.731 146.976 251.731 147.172 251.536L150 248.707L152.828 251.536C153.024 251.731 153.34 251.731 153.536 251.536C153.731 251.34 153.731 251.024 153.536 250.828L150.354 247.646ZM150.5 300.345V248H149.5V300.345H150.5Z";
        case 6:
          return "M256 254.5C255.724 254.5 255.5 254.724 255.5 255L255.5 259.5C255.5 259.776 255.724 260 256 260C256.276 260 256.5 259.776 256.5 259.5V255.5H260.5C260.776 255.5 261 255.276 261 255C261 254.724 260.776 254.5 260.5 254.5L256 254.5ZM293.367 291.66L256.354 254.646L255.647 255.354L292.66 292.367L293.367 291.66Z";
        default:
          return "";
      }
    };

    return `
    <svg
      width="${size || 100}"
      height="${size || 100}"
      viewBox="0 0 300 300"
      fill="${fill || "none"}"
      xmlns="http://www.w3.org/2000/svg"
    >
    
     
      <path
    d="${sideColor(arrow)}"
    stroke="${stroke || "black"}"
  />
    
     ${path.map((e) => {
       return `<path
            d="${e}"
            stroke="${stroke || "black"}"
            stroke-width="${strokeWidth || 4}"
          />`;
     })}
      
    </svg>
    `;
  }
}

export default ProductList;

export type { ProductList };
