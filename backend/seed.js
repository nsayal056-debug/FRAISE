require("dotenv").config();

const { connectDB, getDB } = require("./config/db");

const productos = [

  // =====================================================
  // TORTAS BÁSICAS
  // =====================================================

  {
    nombre: "Brownie",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Brownie húmedo e intenso de chocolate, cubierto con una generosa capa de dulce de leche y crema suave.",
    descripcion:
      "Brownie húmedo e intenso de chocolate, con una textura bien chocolatosa, cubierto con una generosa capa de dulce de leche y crema suave que aporta el equilibrio perfecto.",
    opciones: [
      {
        tamaño: "16 cm",
        porciones: "8 - 10 porciones",
        precio: null
      },
      {
        tamaño: "20 cm",
        porciones: "16 - 18 porciones",
        precio: 30500
      },
      {
        tamaño: "24 cm",
        porciones: "22 - 24 porciones",
        precio: 42000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/brownie.png"
  },

  {
    nombre: "Matilda",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Torta de chocolate húmeda y súper chocolatosa, rellena con dos capas de crema Bariloche.",
    descripcion:
      "Torta de chocolate húmeda, intensa y súper chocolatosa, con una textura irresistible y dos generosas capas de crema Bariloche, logrando una combinación bien cremosa y llena de sabor.",
    opciones: [
      {
        tamaño: "16 cm",
        porciones: "10 - 12 porciones",
        precio: null
      },
      {
        tamaño: "20 cm",
        porciones: "18 - 20 porciones",
        precio: 37000
      },
      {
        tamaño: "24 cm",
        porciones: "28 - 30 porciones",
        precio: 51000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/matilda.png"
  },

  {
    nombre: "Choco Oreo",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Base de Oreos y una mezcla de dulce de leche con crema de leche.",
    descripcion:
      "Base de galletitas Oreo y un cremoso relleno de dulce de leche y crema de leche, combinados en capas para lograr una torta suave, cremosa y con todo el sabor de la Oreo.",
    opciones: [
      {
        tamaño: "16 cm",
        porciones: "12 porciones",
        precio: null
      },
      {
        tamaño: "20 cm",
        porciones: "20 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "30 porciones",
        precio: 45000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/choco Oreo.png"
  },

  {
    nombre: "Chocotorta",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Base de Chocolinas y una mezcla de dulce de leche con crema de leche.",
    descripcion:
      "Clásicas galletitas Chocolinas combinadas con una cremosa mezcla de dulce de leche y crema de leche, formando capas irresistibles en una de las tortas más elegidas.",
    opciones: [
      {
        tamaño: "16 cm",
        porciones: "12 porciones",
        precio: null
      },
      {
        tamaño: "20 cm",
        porciones: "20 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "30 porciones",
        precio: 45000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/chocoTorta.png"
  },

  {
    nombre: "Rogel",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Capas finas y crocantes con dulce de leche y merengue italiano.",
    descripcion:
      "Delicadas capas finas y crocantes de masa, intercaladas con abundante dulce de leche y coronadas con un suave merengue italiano. Un clásico argentino, dulce y elegante.",
    opciones: [
      {
        tamaño: "18 cm",
        porciones: "12 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "18 - 20 porciones",
        precio: 36000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/rogel.png"
  },

  {
    nombre: "Oreo",
    categoria: "Tortas básicas",
    descripcionCorta: "Torta elaborada a base de galletitas Oreo.",
    descripcion:
      "El catálogo incluye esta torta, pero los archivos suministrados no detallan su composición completa.",
    opciones: [
      {
        tamaño: "Consultar",
        porciones: "Consultar",
        precio: 41000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/Oreo.png"
  },

  {
    nombre: "Red Velvet",
    categoria: "Tortas básicas",
    descripcionCorta: "Torta Red Velvet.",
    descripcion:
      "El catálogo incluye esta torta, pero los archivos suministrados no detallan su composición, tamaño ni rendimiento.",
    opciones: [
      {
        tamaño: "Consultar",
        porciones: "Consultar",
        precio: 34000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/Red velvet.png"
  },

  {
    nombre: "Sableé de almendras",
    categoria: "Tortas básicas",
    descripcionCorta:
      "Sableé de almendras acompañado con frutos rojos.",
    descripcion:
      "El catálogo identifica este producto como sableé de almendras con frutos rojos.",
    opciones: [
      {
        tamaño: "Consultar",
        porciones: "Consultar",
        precio: 46000
      }
    ],
    disponible: true,
    foto: "./img/Tortas Basicas/Sable de almendras.png"
  },


  // =====================================================
  // TARTAS
  // =====================================================

  {
    nombre: "Lemon Pie",
    categoria: "Tartas",
    descripcionCorta:
      "Base crocante con crema de limón y merengue italiano.",
    descripcion:
      "Base de masa sablée crocante, rellena con una suave y cremosa preparación de limón, coronada con abundante merengue italiano. Un equilibrio perfecto entre lo ácido, lo dulce y lo delicado.",
    opciones: [
      {
        tamaño: "10 cm",
        porciones: "4 porciones",
        precio: null
      },
      {
        tamaño: "26 cm",
        porciones: "24 porciones",
        precio: 32000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Lemon Pie.png"
  },

  {
    nombre: "Banana Split",
    categoria: "Tartas",
    descripcionCorta:
      "Base crocante con dulce de leche, bananas frescas y crema de leche suave.",
    descripcion:
      "Base de masa sablée crocante, cubierta con una generosa capa de dulce de leche, bananas frescas y una suave crema de leche. Una combinación clásica, fresca y deliciosa.",
    opciones: [
      {
        tamaño: "10 cm",
        porciones: "4 porciones",
        precio: null
      },
      {
        tamaño: "26 cm",
        porciones: "24 porciones",
        precio: 32000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Banana Split.png"
  },

  {
    nombre: "Coco y dulce de leche",
    categoria: "Tartas",
    descripcionCorta:
      "Base crocante con dulce de leche y coco.",
    descripcion:
      "Base de masa sablée crocante con dulce de leche y coco.",
    opciones: [
      {
        tamaño: "10 cm",
        porciones: "4 porciones",
        precio: null
      },
      {
        tamaño: "26 cm",
        porciones: "22 porciones",
        precio: 27200
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Coco y dulce de leche.png"
  },

  {
    nombre: "Duraznos con crema",
    categoria: "Tartas",
    descripcionCorta:
      "Base crocante con crema y duraznos, decorada con picos de crema.",
    descripcion:
      "Base de masa sablée crocante, rellena con suave crema de leche y duraznos, finalizada con delicados picos de crema. Una tarta fresca, suave y clásica.",
    opciones: [
      {
        tamaño: "10 cm",
        porciones: "4 porciones",
        precio: null
      },
      {
        tamaño: "26 cm",
        porciones: "24 porciones",
        precio: 22500
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Duraznos con crema.png"
  },

  {
    nombre: "Ricota",
    categoria: "Tartas",
    descripcionCorta:
      "Suave masa casera rellena con una crema de ricota.",
    descripcion:
      "Suave masa casera que envuelve un delicado relleno de ricota, logrando una tarta cremosa, equilibrada y con ese sabor casero que la hace irresistible.",
    opciones: [
      {
        tamaño: "26 cm",
        porciones: "24 porciones",
        precio: 28000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Ricota.png"
  },

  {
    nombre: "Toffi",
    categoria: "Tartas",
    descripcionCorta:
      "Base crocante con dulce de leche, cubierta con ganache de chocolate.",
    descripcion:
      "Base de masa sablée crocante, rellena con una generosa capa de dulce de leche y cubierta con una suave ganache de chocolate. Una combinación intensa y equilibrada para los amantes del chocolate y el dulce de leche.",
    opciones: [
      {
        tamaño: "10 cm",
        porciones: "4 porciones",
        precio: null
      },
      {
        tamaño: "26 cm",
        porciones: "24 porciones",
        precio: 26000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Toffi.png"
  },

  {
    nombre: "Frutillas",
    categoria: "Tartas",
    descripcionCorta: "Tarta de frutillas.",
    descripcion:
      "El catálogo incluye esta variedad, pero no especifica precio ni descripción detallada.",
    opciones: [
      {
        tamaño: "27 cm",
        porciones: "Consultar",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Frutillas.png"
  },

  {
    nombre: "Frutillas con pastelera",
    categoria: "Tartas",
    descripcionCorta:
      "Tarta de frutillas con crema pastelera.",
    descripcion:
      "El catálogo incluye esta variedad, pero no especifica precio ni descripción detallada.",
    opciones: [
      {
        tamaño: "27 cm",
        porciones: "Consultar",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Frutillas con pastelera.png"
  },

  {
    nombre: "Crema pastelera y frutas",
    categoria: "Tartas",
    descripcionCorta:
      "Tarta con crema pastelera y frutas.",
    descripcion:
      "Tarta clásica con crema pastelera y frutas.",
    opciones: [
      {
        tamaño: "27 cm",
        porciones: "Consultar",
        precio: 26000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Crema pastelera y frutas.png"
  },

  {
    nombre: "Nueces",
    categoria: "Tartas",
    descripcionCorta: "Tarta de nueces.",
    descripcion:
      "Tarta clásica de nueces incluida en el catálogo FRAISE.",
    opciones: [
      {
        tamaño: "27 cm",
        porciones: "Consultar",
        precio: 26000
      }
    ],
    disponible: true,
    foto: "./img/Tartas/Nueces.png"
  },


  // =====================================================
  // CHEESECAKES
  // =====================================================

  {
    nombre: "Cheesecake Frutos Rojos",
    categoria: "Cheesecakes",
    descripcionCorta:
      "NY Cheesecake con salsa de frutos rojos y frutos rojos por encima.",
    descripcion:
      "Clásico New York Cheesecake, cremoso y delicado, acompañado de una suave salsa de frutos rojos y decorado con frutos rojos frescos. La combinación perfecta entre lo dulce y el toque ácido de las frutas.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "15 porciones",
        precio: 37000
      },
      {
        tamaño: "24 cm",
        porciones: "25 porciones",
        precio: 68000
      }
    ],
    disponible: true,
    foto: "./img/Cheesecakes/Frutos rojos.png"
  },

  {
    nombre: "Cheesecake Limón y frutillas",
    categoria: "Cheesecakes",
    descripcionCorta:
      "Cheesecake sabor a limón con mermelada de frutillas.",
    descripcion:
      "Cheesecake cremoso y suave, con un delicado sabor a limón, acompañado de una deliciosa mermelada de frutillas que aporta el contraste justo entre dulzura y acidez.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "15 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "25 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Cheesecakes/Frutillas.png"
  },

  {
    nombre: "Cheesecake Dulce de Leche",
    categoria: "Cheesecakes",
    descripcionCorta:
      "Cheesecake sabor a dulce de leche con salsa de dulce de leche.",
    descripcion:
      "Cheesecake suave y cremoso con el clásico sabor del dulce de leche, acompañado de una generosa salsa de dulce de leche que lo convierte en una opción irresistible para los más golosos.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "15 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "25 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Cheesecakes/Dulce de leche.png"
  },

  {
    nombre: "Lemon Cheese",
    categoria: "Cheesecakes",
    descripcionCorta:
      "Cheesecake clásico con crema de limón y merengue italiano.",
    descripcion:
      "Cheesecake clásico, cremoso y delicado, combinado con una fresca crema de limón y coronado con suave merengue italiano. Una propuesta equilibrada, fresca y llena de sabor.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "15 porciones",
        precio: null
      },
      {
        tamaño: "24 cm",
        porciones: "25 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Cheesecakes/Lemon cheese.png"
  },


  // =====================================================
  // TORTAS MODERNAS
  // =====================================================

  {
    nombre: "Frambali",
    categoria: "Tortas modernas",
    descripcionCorta:
      "Base sablée de almendras, biscuit de lima, cremoso de frambuesa e hibiscus, gelée de frambuesas y mousse de chocolate blanco y pimienta rosa.",
    descripcion:
      "Una combinación delicada y sofisticada de texturas y sabores: base sablée de almendras, biscuit de lima, cremoso de frambuesa e hibiscus, gelée de frambuesas y una suave mousse de chocolate blanco y pimienta rosa.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "18 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tortas Modernas/Torta Frambali.jpeg"
  },

  {
    nombre: "Doble Mousse",
    categoria: "Tortas modernas",
    descripcionCorta:
      "Base crocante con mousse de chocolate blanco y mousse de chocolate semiamargo.",
    descripcion:
      "Base crocante de chocolate, cubierta con dos mousses suaves y aireadas: una de chocolate blanco y otra de chocolate semiamargo. Un contraste de sabores y texturas pensado para los amantes del chocolate.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "18 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tortas Modernas/Doble Mousse.jpeg"
  },

  {
    nombre: "Charlotte de Frutos Rojos",
    categoria: "Tortas modernas",
    descripcionCorta:
      "Mousse sedosa de frutos rojos, cubierta con vainillas.",
    descripcion:
      "Suave y sedosa mousse de frutos rojos, rodeada y cubierta con delicadas vainillas. Una torta fresca, elegante y liviana, con el característico sabor intenso y ligeramente ácido de los frutos rojos.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "18 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tortas Modernas/Charlotte de frutos rojos.jpeg"
  },

  {
    nombre: "Frambuesa y Queso",
    categoria: "Tortas modernas",
    descripcionCorta:
      "Mousse de queso, biscuit de lima y gelée de frambuesa.",
    descripcion:
      "Una combinación fresca y delicada de mousse de queso, biscuit de lima y gelée de frambuesa. Diferentes texturas y un equilibrio perfecto entre la suavidad del queso, la frescura de la lima y la acidez de la frambuesa.",
    opciones: [
      {
        tamaño: "20 cm",
        porciones: "18 porciones",
        precio: null
      }
    ],
    disponible: true,
    foto: "./img/Tortas Modernas/Frambuesa y Queso edit.png"
  },


  // =====================================================
  // SHOTS DULCES
  // =====================================================

  {
    nombre: "Shots Dulces",
    categoria: "Shots",
    descripcionCorta:
      "Shots individuales en diferentes sabores. Mínimo 6 unidades por sabor.",
    descripcion:
      "Sabores disponibles: Brownie, Lemon Pie, Oreo, Chocotorta, duraznos con dulce de leche, banana con dulce de leche, frutillas con crema, frutillas con pastelera, Matilda, Chocooreo, Tiramisú, mousse de chocolate y dulce de leche y Cheesecake de frutos rojos. Mínimo 6 unidades por sabor.",
    opciones: [
      {
        tamaño: "12 unidades",
        porciones: "Mínimo 6 por sabor",
        precio: 27000
      },
      {
        tamaño: "24 unidades",
        porciones: "Mínimo 6 por sabor",
        precio: 58000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

// =====================================================
// MINI DELICIAS
// =====================================================

{
  nombre: "Mini Delicias",

  categoria: "Mini Delicias",

  descripcionCorta:
    "Armá tu selección de mini pastelería eligiendo cantidad y variedades.",

  descripcion:
    "Elegí las mini delicias que más te gusten y armá tu pedido personalizado. La disponibilidad y el precio se confirman según cantidad y variedades seleccionadas.",

  cantidades: [
    "12 unidades",
    "24 unidades",
    "36 unidades",
    "48 unidades"
  ],

  variedades: [
    "Mini Brownie",
    "Mini Chocotorta",
    "Rogelitos",
    "Mini Lemon Pie",
    "Mini Cheesecake"
  ],

  disponible: true,

  foto: "./img/Mini Pasteleria/mini-delicias.png"
},

// =====================================================
// ALFAJORCITOS
// =====================================================

{
  nombre: "Alfajorcitos",

  categoria: "Alfajorcitos",

  descripcionCorta:
    "Armá tu selección de alfajorcitos eligiendo cantidad y variedades.",

  descripcion:
    "Elegí tus alfajorcitos favoritos y armá tu pedido personalizado. La disponibilidad y el precio se confirman según la cantidad y las variedades seleccionadas.",

  cantidades: [
    "12 unidades",
    "24 unidades",
    "36 unidades",
    "48 unidades"
  ],

  variedades: [
    "Maicena",
    "Sableé clásico",
    "Chocolate",
    "Bon o Bon",
    "Limón",
    "Frutos rojos",
    "Mar del Plata",
    "Alfacookies"
  ],

  disponible: true,

  foto: "./img/Mini Pasteleria/alfajorcitos.png"
},


  // =====================================================
  // OTROS
  // =====================================================

  {
    nombre: "Cupcakes",
    categoria: "Dulces personalizados",
    descripcionCorta: "Cupcakes artesanales.",
    descripcion: "Cupcakes artesanales FRAISE.",
    opciones: [
      {
        tamaño: "6 unidades",
        porciones: "6 unidades",
        precio: 15000
      },
      {
        tamaño: "12 unidades",
        porciones: "12 unidades",
        precio: 27000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

  {
    nombre: "Cookies personalizadas",
    categoria: "Cookies personalizadas",
    descripcionCorta: "Cookies decoradas y personalizadas.",
    descripcion:
      "Cookies personalizadas para celebraciones y eventos.",
    opciones: [
      {
        tamaño: "6 unidades",
        porciones: "6 unidades",
        precio: 15000
      },
      {
        tamaño: "12 unidades",
        porciones: "12 unidades",
        precio: 28000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

  {
    nombre: "Oreos bañadas",
    categoria: "Dulces personalizados",
    descripcionCorta: "Galletitas Oreo bañadas y decoradas.",
    descripcion:
      "Galletitas Oreo bañadas y decoradas artesanalmente.",
    opciones: [
      {
        tamaño: "12 unidades",
        porciones: "12 unidades",
        precio: 19500
      },
      {
        tamaño: "24 unidades",
        porciones: "24 unidades",
        precio: 37000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

  {
    nombre: "Cake Pops",
    categoria: "Dulces personalizados",
    descripcionCorta: "Cake Pops artesanales.",
    descripcion: "Cake Pops artesanales decorados.",
    opciones: [
      {
        tamaño: "12 unidades",
        porciones: "12 unidades",
        precio: 18000
      },
      {
        tamaño: "24 unidades",
        porciones: "24 unidades",
        precio: 35000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

  {
    nombre: "Paletas",
    categoria: "Dulces personalizados",
    descripcionCorta: "Paletas dulces decoradas.",
    descripcion:
      "Paletas dulces artesanales y decoradas.",
    opciones: [
      {
        tamaño: "3 unidades",
        porciones: "3 unidades",
        precio: 18000
      },
      {
        tamaño: "6 unidades",
        porciones: "6 unidades",
        precio: 31000
      }
    ],
    disponible: true,
    foto: "./img/logo.jpg"
  },

  // =====================================================
// SHOTS DULCES
// =====================================================

{
  nombre: "Shots Dulces",

  categoria: "Shots",

  descripcionCorta:
    "Shots individuales en diferentes sabores. Mínimo 6 unidades por sabor.",

  descripcion:
    "Sabores disponibles: Brownie, Lemon Pie, Oreo, Chocotorta, duraznos con dulce de leche, banana con dulce de leche, frutillas con crema, frutillas con pastelera, Matilda, Chocooreo, Tiramisú, mousse de chocolate y dulce de leche y Cheesecake de frutos rojos. Mínimo 6 unidades por sabor.",

  opciones: [
    {
      tamaño: "12 unidades",
      porciones: "Mínimo 6 por sabor",
      precio: 27000
    },
    {
      tamaño: "24 unidades",
      porciones: "Mínimo 6 por sabor",
      precio: 58000
    }
  ],

  disponible: true,

  foto: "./img/Shots/shots-dulces.png"
},

// =====================================================
// COOKIES NY
// =====================================================

{
  nombre: "Cookies NY",

  categoria: "Cookies NY",

  descripcionCorta:
    "Cookies estilo New York, grandes, crocantes por fuera y suaves por dentro.",

  descripcion:
    "Cookies artesanales estilo New York, de textura intensa y abundante relleno. Disponibles en diferentes sabores.",

  opciones: [
    {
      tamaño: "6 unidades",
      porciones: "6 unidades",
      precio: null
    },
    {
      tamaño: "12 unidades",
      porciones: "12 unidades",
      precio: null
    }
  ],

  disponible: true,

  foto: "./img/Cookies NY/cookies-ny.png"
},

  // =====================================================
// TORTAS PERSONALIZADAS
// =====================================================

{
  nombre: "Torta Personalizada",

  categoria: "Tortas personalizadas",

  descripcionCorta:
    "Diseñamos una torta especialmente para tu celebración.",

  descripcion:
    "Enviános una imagen de referencia y contanos cómo imaginás tu torta. Podés elegir temática, colores, tamaño, cantidad de porciones, sabores, rellenos, decoración y todos los detalles que necesites. El precio se cotiza según el diseño solicitado.",

  opciones: [
    {
      tamaño: "Personalizada",
      porciones: "A elección",
      precio: null
    }
  ],

  disponible: true,

  foto: "./img/Personalizadas/torta-personalizada.png"
},
  

];

const cargarProductos = async () => {
  try {
    await connectDB();

    const db = getDB();

    await db.collection("productos").deleteMany({});

    const resultado = await db
      .collection("productos")
      .insertMany(productos);

    console.log(
      `${resultado.insertedCount} productos cargados correctamente`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    process.exit(1);
  }
};

cargarProductos();