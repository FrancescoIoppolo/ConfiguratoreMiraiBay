import benedettaDefault from "./assets/Benedetta.png";
import benedettaMobile from "./assets/card_Benedetta.png";
import benedettaMobileSelected from "./assets/BenedettaMobileSelected.png";
import benedettaHover from "./assets/hover_Benedetta.png";
import benedettaActive from "./assets/active_Benedetta.png";
import benedettaCard from "./assets/card_Benedetta.png";

import giuliaDefault from "./assets/Giulia.png";
import giuliaMobile from "./assets/card_Giulia.png";
import giuliaMobileSelected from "./assets/giuliaMobileSelected.png";
import giuliaHover from "./assets/hover_Giulia.png";
import giuliaActive from "./assets/active_Giulia.png";
import giuliaCard from "./assets/card_Giulia.png";

import davideDefault from "./assets/Davide.png";
import davideMobile from "./assets/card_Davide.png";
import davideMobileSelected from "./assets/davideMobileSelected.png";
import davideHover from "./assets/hover_Davide.png";
import davideActive from "./assets/active_Davide.png";
import davideCard from "./assets/card_Davide.png";

import andreaDefault from "./assets/Andrea.png";
import andreaMobile from "./assets/card_Andrea.png";
import andreaMobileSelected from "./assets/AndreaMobileSelected.png";
import andreaHover from "./assets/hover_Andrea.png";
import andreaActive from "./assets/active_Andrea.png";
import andreaCard from "./assets/card_Andrea.png";

import consulenza from "./assets/consulenza.png";
import done_for_you from "./assets/done_for_you.png";
import fte from "./assets/fte.png";

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
      { image: icon1, role: "Growth Hacking" },
      { image: icon2, role: "Digital Advertising" },
      { image: icon3, role: "Performance Marketing" },
      { image: icon4, role: "Conversion Rate Optimization" },
      { image: icon5, role: "SEO & SEM" },
      { image: icon1, role: "Social Media Ads" },
      { image: icon2, role: "Funnel Marketing" },
      { image: icon3, role: "Customer Acquisition" },
      { image: icon4, role: "Conversion Rate Optimization" },
      { image: icon5, role: "Retention & Loyalty" },
    ],
    images: {
      default: benedettaDefault,
      mobile: benedettaMobile,
      mobileSelected: benedettaMobileSelected,
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
      { image: icon6, role: "Brand Identity" },
      { image: icon7, role: "Content Creation" },
      { image: icon8, role: "Graphic Design" },
      { image: icon9, role: "Video Production" },
      { image: icon6, role: "Storytelling" },
      { image: icon7, role: "Social Media Management" },
      { image: icon8, role: "Copywriting" },
      { image: icon9, role: "Creative Direction" },
      { image: icon9, role: "Visual Strategy" },
    ],
    images: {
      default: giuliaDefault,
      mobile: giuliaMobile,
      mobileSelected: giuliaMobileSelected,
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
      { image: icon10  , role: "Sviluppo Software" },
      { image: icon11  , role: "Web Development" },
      { image: icon12  , role: "App Development" },
      { image: icon13   , role: "UX/UI Design" },
      { image: icon10  , role: "Data Analytics" },
      { image: icon11  , role: "Artificial Intelligence" },
      { image: icon12  , role: "Automation" },
      { image: icon13   , role: "API Integration" },
      { image: icon12  , role: "Cybersecurity"},
      { image: icon13   , role: "Cloud Computing" },
    ],
    images: {
      default: andreaDefault,
      mobile: andreaMobile,
      mobileSelected: andreaMobileSelected,
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
      { image: icon14   , role: "Formazione Aziendale" },
      { image: icon15   , role: "Corporate Training" },
      { image: icon16   , role: "Digital Learning" },
      { image: icon17   , role: "Soft Skills" },
      { image: icon14   , role: "Upskilling & Reskilling" },
      { image: icon15   , role: "Leadership Development" },
      { image: icon16   , role: "Team Coaching" },
      { image: icon17   , role: "Sales Training" },
      { image: icon17   , role: "Comunicazione Efficace" },
    ],
    images: {
      default: davideDefault,
      mobile: davideMobile,
      mobileSelected:davideMobileSelected,
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
    icon: done_for_you,
    description: "Gestiamo in maniera completa tutte le attività necessarie per raggiungere i tuoi obiettivi."
  },
  {
    id: "consulenza",
    title: "Consulenza",
    icon: consulenza,
    description: "Forniamo supporto strategico su misura per guidarti nel raggiungimento degli obiettivi di crescita."
  },
  {
    id: "fte",
    title: "FTE",
    icon: fte,
    description: "Ti assegniamo, in maniera esclusiva, un esperto dedicato alle tue esigenze, sia in sede che da remoto."
  }
];

export { workModes, managersData }
