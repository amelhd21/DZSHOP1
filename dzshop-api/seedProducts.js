

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    id: "p1",
    title: "SOURIS GAMING LOGITECH G102",
    price: 5500,
    img: "/images/sourisGaming/sourisGaming.png",
    images: [
      "/images/sourisGaming/sourisGaming.png",
      "/images/sourisGaming/sourisGaming2.png",
      "/images/sourisGaming/sourisGaming3.png",
      "/images/sourisGaming/sourisGaming4.png",
      "/images/sourisGaming/sourisGaming5.png"
    ],
    dec: "La Logitech G102 est une souris gaming conçue pour offrir précision, rapidité et confort pendant vos sessions de jeu. Sa forme ergonomique assure une prise en main agréable, tandis que ses boutons facilement accessibles permettent de réagir rapidement en pleine partie. Elle convient aussi bien aux joueurs débutants qu'aux utilisateurs recherchant une souris fiable pour leur ordinateur. Son design sobre et orienté gaming s'intègre facilement à différents setups, que ce soit pour jouer, travailler ou naviguer au quotidien."
  },

  {
    id: "p2",
    title: "CASQUE BLUETOOTH JBL",
    price: 8500,
    img: "/images/casqueBluetooth/casqueBluetooth.png",
    images: [
      "/images/casqueBluetooth/casqueBluetooth.png",
      "/images/casqueBluetooth/casqueBluetooth2.png",
      "/images/casqueBluetooth/casqueBluetooth3.png",
      "/images/casqueBluetooth/casqueBluetooth4.png",
      "/images/casqueBluetooth/casqueBluetooth5.png"
    ],
    dec: "Profitez de votre musique, de vos vidéos et de vos appels avec ce casque Bluetooth JBL au design confortable. Ses coussinets rembourrés permettent une utilisation agréable pendant de longues périodes, tandis que son arceau assure un maintien adapté. La connexion sans fil vous offre davantage de liberté de mouvement et évite l'encombrement des câbles. Grâce à ses commandes intégrées, vous pouvez facilement gérer votre écoute. Son design blanc élégant avec les détails caractéristiques JBL en fait également un accessoire moderne et pratique au quotidien."
  },

  {
    id: "p3",
    title: "CLAVIER GAMING RGB",
    price: 6500,
    img: "/images/clavierGaming/clavierGaming.png",
    images: [
      "/images/clavierGaming/clavierGaming.png",
      "/images/clavierGaming/clavierGaming2.png",
      "/images/clavierGaming/clavierGaming3.png",
      "/images/clavierGaming/clavierGaming4.png",
      "/images/clavierGaming/clavierGaming5.png"
    ],
    dec: "Ce clavier gaming RGB est conçu pour les joueurs qui souhaitent associer confort, réactivité et style. Son rétroéclairage RGB apporte une ambiance gaming à votre bureau et permet de créer un setup plus moderne et immersif. Les touches sont pensées pour offrir une utilisation agréable aussi bien pendant les jeux que pour la saisie quotidienne. Il convient aux jeux vidéo, au travail, aux études et à toutes les activités nécessitant un clavier confortable. Une solution idéale pour améliorer votre espace gaming sans sacrifier la praticité."
  },

  {
    id: "p4",
    title: "ÉCRAN ASUS 24 POUCES",
    price: 30500,
    img: "/images/ecranAsus/ecranAsus.png",
    images: [
      "/images/ecranAsus/ecranAsus.png",
      "/images/ecranAsus/ecranAsus2.png",
      "/images/ecranAsus/ecranAsus3.png",
      "/images/ecranAsus/ecranAsus4.png",
      "/images/ecranAsus/ecranAsus5.png"
    ],
    dec: "Cet écran ASUS 24 pouces constitue une solution polyvalente pour le travail, les études, le gaming et le divertissement. Son format offre un espace d'affichage confortable tout en restant suffisamment compact pour s'intégrer facilement sur un bureau. Il permet de travailler sur plusieurs documents, regarder des vidéos, naviguer sur Internet ou profiter de vos jeux dans de bonnes conditions. Son design moderne s'intègre facilement dans un environnement professionnel ou dans un setup gaming."
  },

  {
    id: "p5",
    title: "WEBCAM FULL HD 1080P",
    price: 7500,
    img: "/images/webcam/webcam.png",
    images: [
      "/images/webcam/webcam.png",
      "/images/webcam/webcam2.png",
      "/images/webcam/webcam3.png",
      "/images/webcam/webcam4.png",
      "/images/webcam/webcam5.png"
    ],
    dec: "Cette webcam Full HD 1080p est idéale pour les visioconférences, les cours en ligne, les réunions à distance et le streaming. Elle permet d'obtenir une image claire et détaillée afin de rester facilement visible pendant vos échanges vidéo. Compacte et pratique, elle peut être installée sur un ordinateur ou un écran compatible. Elle convient aussi bien à une utilisation professionnelle qu'à un usage personnel. Une solution simple pour améliorer la qualité de vos appels vidéo et de vos contenus en ligne."
  },

  {
    id: "p6",
    title: "MANETTE GAMING SANS FIL",
    price: 6500,
    img: "/images/manette/manette.png",
    images: [
      "/images/manette/manette.png",
      "/images/manette/manette2.png",
      "/images/manette/manette3.png",
      "/images/manette/manette4.png",
      "/images/manette/manette5.png"
    ],
    dec: "Cette manette gaming sans fil vous permet de jouer plus confortablement tout en profitant d'une plus grande liberté de mouvement. Sa conception est adaptée à une prise en main naturelle et confortable, ce qui la rend agréable pour les longues sessions de jeu. L'absence de câble encombrant permet de conserver un espace de jeu plus propre et plus pratique. Elle constitue un excellent choix pour les amateurs de jeux vidéo recherchant une expérience plus confortable et une meilleure liberté devant leur écran."
  },

  {
    id: "p7",
    title: "IMPRIMANTE HP DESKJET",
    price: 18500,
    img: "/images/imprimente/imprimante.png",
    images: [
      "/images/imprimente/imprimante.png",
      "/images/imprimente/imprimante2.png",
      "/images/imprimente/imprimante3.png",
      "/images/imprimente/imprimante4.png",
      "/images/imprimente/imprimante5.png"
    ],
    dec: "L'imprimante HP DeskJet est une solution pratique pour les impressions du quotidien à la maison, au bureau ou pour les études. Elle permet d'imprimer facilement différents documents tels que des cours, devoirs, factures, formulaires ou documents professionnels. Son format pratique facilite son installation sur un bureau sans prendre trop de place. Elle convient particulièrement aux utilisateurs qui recherchent une imprimante simple et adaptée aux besoins courants."
  },

  {
    id: "p8",
    title: "ROUTEUR WIFI 6",
    price: 8900,
    img: "/images/routeur/routeur.png",
    images: [
      "/images/routeur/routeur.png",
      "/images/routeur/routeur2.png",
      "/images/routeur/routeur3.png",
      "/images/routeur/routeur4.png",
      "/images/routeur/routeur5.png"
    ],
    dec: "Le routeur Wi-Fi 6 est conçu pour fournir une connexion sans fil rapide et stable à vos différents appareils. Il convient aux maisons, bureaux et espaces nécessitant la connexion simultanée de plusieurs équipements comme les smartphones, ordinateurs, téléviseurs et appareils connectés. Il permet de profiter plus confortablement de la navigation Internet, du streaming, des appels vidéo et des activités en ligne. Une solution moderne pour améliorer la qualité et la stabilité de votre réseau domestique."
  },

  {
    id: "p9",
    title: "ENCEINTE BLUETOOTH JBL",
    price: 12500,
    img: "/images/enceinte/enceinte.png",
    images: [
      "/images/enceinte/enceinte.png",
      "/images/enceinte/enceinte2.png",
      "/images/enceinte/enceinte3.png",
      "/images/enceinte/enceinte4.png"
    ],
    dec: "Cette enceinte Bluetooth JBL est idéale pour profiter de votre musique sans avoir besoin de rester connecté à un câble. Son format pratique permet de l'utiliser à la maison, au bureau ou lors de vos moments de détente. La connexion Bluetooth facilite l'association avec un smartphone, une tablette ou un autre appareil compatible. Son design moderne et son utilisation simple en font un excellent choix pour écouter de la musique, des podcasts ou regarder des contenus multimédias avec davantage de confort."
  },

  {
    id: "p10",
    title: "TAPIS DE SOURIS GAMING XXL",
    price: 3500,
    img: "/images/tapisSouris/tapisSouris.png",
    images: [
      "/images/tapisSouris/tapisSouris.png",
      "/images/tapisSouris/tapisSouris2.png",
      "/images/tapisSouris/tapisSouris3.png",
      "/images/tapisSouris/tapisSouris4.png"
    ],
    dec: "Le tapis de souris gaming XXL offre une grande surface permettant d'accueillir confortablement votre souris et votre clavier. Sa large dimension est particulièrement appréciée par les joueurs qui utilisent de grands mouvements de souris. Il permet également de protéger la surface du bureau contre les rayures et les traces liées à une utilisation quotidienne. Son design gaming complète parfaitement un setup informatique et offre une surface confortable pour jouer, travailler ou naviguer."
  },

  {
    id: "p11",
    title: "MICROPHONE USB GAMING",
    price: 9500,
    img: "/images/microphone/microphone.png",
    images: [
      "/images/microphone/microphone.png",
      "/images/microphone/microphone2.png",
      "/images/microphone/microphone3.png",
      "/images/microphone/microphone4.png"
    ],
    dec: "Ce microphone USB gaming est conçu pour les joueurs, créateurs de contenu, streamers et utilisateurs ayant besoin d'une voix claire lors de leurs échanges. Sa connexion USB facilite son installation et son utilisation avec un ordinateur compatible. Il peut être utilisé pour les discussions vocales, les jeux en ligne, les visioconférences, l'enregistrement audio et le streaming. Son design orienté gaming s'intègre facilement à un setup informatique moderne."
  },

  {
    id: "p12",
    title: "SUPPORT PC PORTABLE",
    price: 4500,
    img: "/images/supportPc/supportPc.png",
    images: [
      "/images/supportPc/supportPc.png",
      "/images/supportPc/supportPc2.png",
      "/images/supportPc/supportPc3.png",
      "/images/supportPc/supportPc4.png",
      "/images/supportPc/supportPc5.png"
    ],
    dec: "Ce support pour ordinateur portable permet de surélever votre écran afin d'améliorer l'organisation et le confort de votre espace de travail. Il contribue à créer une position plus agréable devant l'ordinateur tout en libérant de l'espace sur le bureau. Il convient à une utilisation à la maison, au bureau ou pour les études. Son design pratique permet également d'obtenir un poste de travail plus propre et mieux organisé."
  },

  {
    id: "p13",
    title: "HUB USB MULTIPORT",
    price: 4200,
    img: "/images/hub/hub.png",
    images: [
      "/images/hub/hub.png",
      "/images/hub/hub2.png",
      "/images/hub/hub3.png",
      "/images/hub/hub4.png",
      "/images/hub/hub5.png"
    ],
    dec: "Le hub USB multiport est une solution pratique pour connecter plusieurs périphériques à votre ordinateur à partir d'un seul point de connexion. Il peut être particulièrement utile avec les ordinateurs portables disposant d'un nombre limité de ports. Vous pouvez ainsi faciliter la connexion de périphériques tels qu'une souris, un clavier, une clé USB ou d'autres accessoires compatibles. Compact et facile à transporter, il constitue un accessoire pratique pour le bureau comme pour les déplacements."
  },

  {
    id: "p14",
    title: "CLAVIER SANS FIL",
    price: 5500,
    img: "/images/clavierSansFil/clavierSansFil.jfif",
    images: [
      "/images/clavierSansFil/clavierSansFil.jfif",
      "/images/clavierSansFil/clavierSansFil2.png",
      "/images/clavierSansFil/clavierSansFil3.png",
      "/images/clavierSansFil/clavierSansFil4.png",
      "/images/clavierSansFil/clavierSansFil5.png"
    ],
    dec: "Ce clavier sans fil offre une expérience de frappe pratique tout en permettant de conserver un bureau propre et sans câble encombrant. Il est adapté à différentes utilisations : saisie de documents, navigation Internet, études, travail et utilisation multimédia. Sa conception permet de profiter d'une plus grande liberté de placement devant l'écran. Facile à intégrer dans un espace de travail ou un setup informatique, il constitue un accessoire pratique pour une utilisation quotidienne."
  },

  {
    id: "p15",
    title: "SOURIS SANS FIL",
    price: 3800,
    img: "/images/sourisSansFil/sourisSansFil.jfif",
    images: [
      "/images/sourisSansFil/sourisSansFil.jfif",
      "/images/sourisSansFil/sourisSansFil2.png",
      "/images/sourisSansFil/sourisSansFil3.png",
      "/images/sourisSansFil/sourisSansFil4.png",
      "/images/sourisSansFil/sourisSansFil5.png"
    ],
    dec: "Cette souris sans fil est conçue pour offrir une utilisation confortable et pratique au quotidien. Son design ergonomique permet une prise en main agréable, tandis que la connexion sans fil évite l'encombrement d'un câble sur le bureau. Elle convient parfaitement à la navigation Internet, au travail, aux études, à la bureautique et aux tâches quotidiennes sur ordinateur. Son format léger et son design moderne permettent de l'utiliser facilement à la maison, au bureau ou en déplacement."
  },

  {
    id: "p16",
    title: "SMARTPHONE SAMSUNG GALAXY A16",
    price: 39000,
    img: "/images/galaxyA16/galaxyA16.jfif",
    images: [
      "/images/galaxyA16/galaxyA16.jfif",
      "/images/galaxyA16/galaxyA162.png",
      "/images/galaxyA16/galaxyA163.png",
      "/images/galaxyA16/galaxyA164.png",
      "/images/galaxyA16/galaxyA165.png"
    ],
    dec: "Le Samsung Galaxy A16 est un smartphone pensé pour accompagner facilement votre quotidien. Il permet de communiquer, naviguer sur Internet, consulter les réseaux sociaux, regarder des vidéos, utiliser vos applications et rester connecté avec vos proches. Son format moderne et son écran confortable offrent une expérience agréable pour les activités quotidiennes. Il constitue une solution adaptée aux utilisateurs recherchant un smartphone polyvalent pour la communication, le divertissement et les besoins courants."
  },

  {
    id: "p17",
    title: "COQUE ANTICHOC POUR SMARTPHONE",
    price: 1500,
    img: "/images/coqueSmartphone/coqueSmartphone.png",
    images: [
      "/images/coqueSmartphone/coqueSmartphone.png",
      "/images/coqueSmartphone/coqueSmartphone2.png",
      "/images/coqueSmartphone/coqueSmartphone3.png",
      "/images/coqueSmartphone/coqueSmartphone4.png",
      "/images/coqueSmartphone/coqueSmartphone5.png"
    ],
    dec: "Cette coque antichoc est conçue pour protéger votre smartphone contre les petits chocs, rayures et impacts pouvant survenir lors d'une utilisation quotidienne. Elle ajoute une couche de protection autour de l'appareil tout en permettant de conserver un accès pratique aux fonctions essentielles du téléphone. Elle est particulièrement utile pour les utilisateurs qui souhaitent limiter les risques liés aux chutes accidentelles. Une protection simple et pratique pour garder votre smartphone en meilleur état plus longtemps."
  },

  {
    id: "p18",
    title: "CHARGEUR RAPIDE USB-C 20W",
    price: 2500,
    img: "/images/chargeurUsbC/chargeurUsbC.png",
    images: [
      "/images/chargeurUsbC/chargeurUsbC.png",
      "/images/chargeurUsbC/chargeurUsbC2.png",
      "/images/chargeurUsbC/chargeurUsbC3.png",
      "/images/chargeurUsbC/chargeurUsbC4.png",
      "/images/chargeurUsbC/chargeurUsbC5.png"
    ],
    dec: "Ce chargeur rapide USB-C 20W permet de recharger efficacement les appareils compatibles équipés d'une connexion USB-C. Son format compact facilite son utilisation à la maison, au bureau ou pendant les déplacements. Il constitue un accessoire pratique pour remplacer un chargeur perdu ou disposer d'un chargeur supplémentaire. Compatible avec les appareils prenant en charge la puissance correspondante, il permet de simplifier la recharge quotidienne de vos équipements."
  },

  {
    id: "p19",
    title: "POWER BANK 10 000 mAh",
    price: 3500,
    img: "/images/powerbank/powerbank.png",
    images: [
      "/images/powerbank/powerbank.png",
      "/images/powerbank/powerbank2.png",
      "/images/powerbank/powerbank3.png",
      "/images/powerbank/powerbank4.png",
      "/images/powerbank/powerbank5.png"
    ],
    dec: "Cette batterie externe de 10 000 mAh vous permet de disposer d'une réserve d'énergie supplémentaire lorsque la batterie de votre smartphone ou d'un appareil compatible est faible. Elle est particulièrement pratique lors des déplacements, voyages, journées de travail ou situations où une prise électrique n'est pas facilement accessible. Son format portable permet de l'emporter facilement dans un sac. Un accessoire indispensable pour rester connecté plus longtemps au quotidien."
  },

  {
    id: "p20",
    title: "CAMÉRA DE SURVEILLANCE WI-FI",
    price: 5500,
    img: "/images/cameraWifi/cameraWifi.png",
    images: [
      "/images/cameraWifi/cameraWifi.png",
      "/images/cameraWifi/cameraWifi2.png",
      "/images/cameraWifi/cameraWifi3.png",
      "/images/cameraWifi/cameraWifi4.png",
      "/images/cameraWifi/cameraWifi5.png"
    ],
    dec: "Cette caméra de surveillance Wi-Fi permet de garder un œil sur votre maison ou votre espace à distance, selon les fonctions prises en charge par le modèle. Elle se connecte au réseau Wi-Fi afin de faciliter la surveillance depuis un appareil compatible. Elle peut être utilisée pour surveiller une pièce, une entrée, un bureau ou un autre espace. C'est une solution pratique pour renforcer la surveillance de votre environnement et rester informé de ce qui s'y passe."
  },

  {
    id: "p21",
    title: "AMPOULE LED INTELLIGENTE WI-FI",
    price: 2000,
    img: "/images/ampouleWifi/ampouleWifi.png",
    images: [
      "/images/ampouleWifi/ampouleWifi.png",
      "/images/ampouleWifi/ampouleWifi2.png"
    ],
    dec: "Cette ampoule LED intelligente Wi-Fi permet de moderniser facilement votre éclairage et de contrôler votre lumière à partir d'un appareil compatible, selon les fonctionnalités disponibles. Elle est idéale pour créer un éclairage plus pratique dans une chambre, un salon, un bureau ou tout autre espace de la maison. La connexion Wi-Fi permet de l'intégrer à votre environnement connecté. Une solution simple pour rendre l'éclairage quotidien plus pratique et plus intelligent."
  },

  {
    id: "p22",
    title: "PRISE INTELLIGENTE WI-FI",
    price: 2500,
    img: "/images/priseWifi/priseWifi.png",
    images: [
      "/images/priseWifi/priseWifi.png",
      "/images/priseWifi/priseWifi2.png",
      "/images/priseWifi/priseWifi3.png",
      "/images/priseWifi/priseWifi4.png",
      "/images/priseWifi/priseWifi5.png"
    ],
    dec: "La prise intelligente Wi-Fi permet de rendre certains appareils électriques plus pratiques à contrôler. Une fois installée sur une prise compatible et connectée au réseau Wi-Fi, elle peut permettre de gérer l'alimentation d'un appareil à distance selon les fonctions disponibles. Elle est idéale pour moderniser progressivement une maison et intégrer différents équipements dans un environnement connecté. Compacte et facile à utiliser, elle constitue un accessoire intéressant pour une maison intelligente."
  },

  {
    id: "p23",
    title: "SONNETTE VIDÉO CONNECTÉE",
    price: 8500,
    img: "/images/sonnetteVideo/sonnetteVideo.png",
    images: [
      "/images/sonnetteVideo/sonnetteVideo.png",
      "/images/sonnetteVideo/sonnetteVideo2.png",
      "/images/sonnetteVideo/sonnetteVideo3.png",
      "/images/sonnetteVideo/sonnetteVideo4.png"
    ],
    dec: "La sonnette vidéo connectée combine une fonction de sonnette avec une caméra afin de vous permettre de voir ce qui se passe devant votre porte. Connectée à Internet, elle peut faciliter la surveillance de votre entrée depuis un appareil compatible, selon les fonctionnalités du modèle. Elle est particulièrement pratique pour savoir qui se trouve devant votre domicile et garder un meilleur contrôle sur l'accès à votre maison. Une solution moderne pour améliorer la sécurité et la surveillance de votre entrée."
  },
{
    id: "p24",
    title: "CAPTEUR DE MOUVEMENT INTELLIGENT",
    price: 3000,
    img: "/images/capteurMouvement/capteurMouvement.png",
    images: [
      "/images/capteurMouvement/capteurMouvement.png",
      "/images/capteurMouvement/capteurMouvement2.png",
      "/images/capteurMouvement/capteurMouvement3.png",
      "/images/capteurMouvement/capteurMouvement4.png",
      "/images/capteurMouvement/capteurMouvement5.png"
    ],
    dec: "Ce capteur de mouvement intelligent permet de détecter les mouvements dans une pièce ou un espace équipé. Connecté à votre environnement domotique, il peut servir à déclencher différentes actions ou vous alerter selon les possibilités du système utilisé. Il peut être installé dans une entrée, une chambre, un salon, un bureau ou tout autre espace nécessitant une détection de présence. Un accessoire pratique pour améliorer la surveillance et automatiser votre maison connectée."
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connecté");

    await Product.deleteMany({});
    console.log("Anciens produits supprimés");

    const inserted = await Product.insertMany(products);

    console.log(`${inserted.length} produits importés avec succès`);

    await mongoose.disconnect();

    console.log("Migration terminée");
    process.exit(0);
  } catch (error) {
    console.error("Erreur pendant la migration :", error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    process.exit(1);
  }
}

seedProducts();
