import benedettaDefault from "./assets/Benedetta.png";
import benedettaHover from "./assets/hover_Benedetta.png";
import benedettaActive from "./assets/active_Benedetta.png";
import benedettaCard from "./assets/card_Benedetta.png";

import giuliaDefault from "./assets/Giulia.png";
import giuliaHover from "./assets/hover_Giulia.png";
import giuliaActive from "./assets/active_Giulia.png";
import giuliaCard from "./assets/card_Giulia.png";

import davideDefault from "./assets/Davide.png";
import davideHover from "./assets/hover_Davide.png";
import davideActive from "./assets/active_Davide.png";
import davideCard from "./assets/card_Davide.png";

import andreaDefault from "./assets/Andrea.png";
import andreaHover from "./assets/hover_Andrea.png";
import andreaActive from "./assets/active_Andrea.png";
import andreaCard from "./assets/card_Andrea.png";

import icon1 from "./assets/icon-1.png";
import icon2 from "./assets/icon-2.png";
import icon3 from "./assets/icon-3.png";
import icon4 from "./assets/icon-4.png";
import icon5 from "./assets/icon-5.png";
import icon6 from "./assets/icon-6.png";
import icon7 from "./assets/icon-7.png";
import icon8 from "./assets/icon-8.png";
import icon9 from "./assets/icon-9.png";
import icon10 from "./assets/icon-10.png";
import icon11 from "./assets/icon-11.png";
import icon12 from "./assets/icon-12.png";
import icon13 from "./assets/icon-13.png";
import icon14 from "./assets/icon-14.png";
import icon15 from "./assets/icon-15.png";
import icon16 from "./assets/icon-16.png";
import icon17 from "./assets/icon-17.png";

const managersData = [
  {
    id: "benedetta",
    name: "Benedetta Premi",
    role: "Growth",
    color: "#0101ff",
    tag: [
      { image: icon1, role: "funnel di vendita" },
      { image: icon2, role: "ecommerce" },
      { image: icon3, role: "analisi dei dati" },
      { image: icon4, role: "social media" },
      { image: icon5, role: "tracciamento" },
    ],
    images: {
      default: benedettaDefault,
      hover: benedettaHover,
      active: benedettaActive,
      card: benedettaCard
    },
    questions: [
      "Conoscere il mercato",
      "Aumentare le vendite online oppure i lead",
      "Comunicare il brand e accrescere notorietà",
      "Validazione e go-to-market"
    ]
  },
  {
    id: "giulia",
    name: "Giulia Proietti",
    role: "Studio Executive Director",
    color: "#771ed6",
    tag: [
      { image: icon6, role: "branding" },
      { image: icon7, role: "user experience" },
      { image: icon8, role: "engagment" },
      { image: icon9, role: "user interface" },
    ],
    images: {
      default: giuliaDefault,
      hover: giuliaHover,
      active: giuliaActive,
      card: giuliaCard 
    },
    questions: [
      "Definire l'immagine del brand",
      "Sviluppo di nuovi contenuti creativi",
    ] 
  },
  {
    id: "andrea",
    name: "Andrea Basso",
    role: "Tech",
    color: "#00d8ae",
    tag: [
      { image: icon10  , role: "performance" },
      { image: icon11  , role: "risultati" },
      { image: icon12  , role: "web & app" },
      { image: icon13   , role: "design creativo" },

    ],
    images: {
      default: andreaDefault,
      hover: andreaHover, 
      active: andreaActive,
      card: andreaCard

    },
    questions: [
      "Creare l'infrastruttura digitale",
      "Ottimizzare l'infrastruttura digitale",
    ]
  },
  {
    id: "davide",
    name: "Davide Rossi",
    role: "Accademy",
    color: "#ff00b7",
    tag: [
      { image: icon14   , role: "growth" },
      { image: icon15   , role: "marketing" },
      { image: icon16   , role: "usabilità" },
      { image: icon17   , role: "analisi dei dati" },
    ],
    images: {
      default: davideDefault,
      hover: davideHover, 
      active: davideActive,
      card: davideCard

    },
    questions: [
      "Elevare le competenze interne",
      "Internalizzare il team di marketing"
    ]
  }
];

const workModes = [
  {
    id: "done_for_you",
    title: "Done for you",
    description: "Gestiamo in maniera completa tutte le attività necessarie per raggiungere i tuoi obiettivi."
  },
  {
    id: "consulenza",
    title: "Consulenza",
    description: "Forniamo supporto strategico su misura per guidarti nel raggiungimento degli obiettivi di crescita."
  },
  {
    id: "fte",
    title: "FTE",
    description: "Ti assegniamo, in maniera esclusiva, un esperto dedicato alle tue esigenze, sia in sede che da remoto."
  }
];

export { workModes, managersData }
