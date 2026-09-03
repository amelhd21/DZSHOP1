import React, { useState } from "react";
import "./product.css";
import sourisGaming from "./assets/sourisGaming/sourisGaming.png";
import sourisGaming2 from "./assets/sourisGaming/sourisGaming2.png";
import sourisGaming3 from "./assets/sourisGaming/sourisGaming3.png";
import sourisGaming4 from "./assets/sourisGaming/sourisGaming4.png";
import sourisGaming5 from "./assets/sourisGaming/sourisGaming5.png";

import casqueBluetooth from "./assets/casqueBluetooth/casqueBluetooth.png";
import casqueBluetooth2 from "./assets/casqueBluetooth/casqueBluetooth2.png";
import casqueBluetooth3 from "./assets/casqueBluetooth/casqueBluetooth3.png";
import casqueBluetooth4 from "./assets/casqueBluetooth/casqueBluetooth4.png";
import casqueBluetooth5 from "./assets/casqueBluetooth/casqueBluetooth5.png";

import clavierGaming from "./assets/clavierGaming/clavierGaming.png";
import clavierGaming2 from "./assets/clavierGaming/clavierGaming2.png";
import clavierGaming3 from "./assets/clavierGaming/clavierGaming3.png";
import clavierGaming4 from "./assets/clavierGaming/clavierGaming4.png";
import clavierGaming5 from "./assets/clavierGaming/clavierGaming5.png";

import ecranAsus from "./assets/ecranAsus/ecranAsus.png";
import ecranAsus2 from "./assets/ecranAsus/ecranAsus2.png";
import ecranAsus3 from "./assets/ecranAsus/ecranAsus3.png";
import ecranAsus4 from "./assets/ecranAsus/ecranAsus4.png";
import ecranAsus5 from "./assets/ecranAsus/ecranAsus5.png";

import webcam from "./assets/webcam/webcam.png";
import webcam2 from "./assets/webcam/webcam2.png";
import webcam3 from "./assets/webcam/webcam3.png";
import webcam4 from "./assets/webcam/webcam4.png";
import webcam5 from "./assets/webcam/webcam5.png";

import manette from "./assets/manette/manette.png";
import manette2 from "./assets/manette/manette2.png";
import manette3 from "./assets/manette/manette3.png";
import manette4 from "./assets/manette/manette4.png";
import manette5 from "./assets/manette/manette5.png";


import imprimante from "./assets/imprimente/imprimante.png";
import imprimante2 from "./assets/imprimente/imprimante2.png";
import imprimante3 from "./assets/imprimente/imprimante3.png";
import imprimante4 from "./assets/imprimente/imprimante4.png";
import imprimante5 from "./assets/imprimente/imprimante5.png";

import routeur from "./assets/routeur/routeur.png";
import routeur2 from "./assets/routeur/routeur2.png";
import routeur3 from "./assets/routeur/routeur3.png";
import routeur4 from "./assets/routeur/routeur4.png";
import routeur5 from "./assets/routeur/routeur5.png";

import enceinte from "./assets/enceinte/enceinte.png";
import enceinte2 from "./assets/enceinte/enceinte2.png";
import enceinte3 from "./assets/enceinte/enceinte3.png";
import enceinte4 from "./assets/enceinte/enceinte4.png";

import tapisSouris from "./assets//tapisSouris/tapisSouris.png";
import tapisSouris2 from "./assets//tapisSouris/tapisSouris2.png";
import tapisSouris3 from "./assets//tapisSouris/tapisSouris3.png";
import tapisSouris4 from "./assets//tapisSouris/tapisSouris4.png";

import microphone from "./assets/microphone/microphone.png";
import microphone2 from "./assets/microphone/microphone2.png";
import microphone3 from "./assets/microphone/microphone3.png";
import microphone4 from "./assets/microphone/microphone4.png";

import supportPc from "./assets/supportPc/supportPc.png";
import supportPc2 from "./assets/supportPc/supportPc2.png";
import supportPc3 from "./assets/supportPc/supportPc3.png";
import supportPc4 from "./assets/supportPc/supportPc4.png";
import supportPc5 from "./assets/supportPc/supportPc5.png";

import hub from "./assets/hub/hub.png";
import hub2 from "./assets/hub/hub2.png";
import hub3 from "./assets/hub/hub3.png";
import hub4 from "./assets/hub/hub4.png";
import hub5 from "./assets/hub/hub5.png";

import clavierSansFil from "./assets/clavierSansFil/clavierSansFil.jfif";
import clavierSansFil2 from "./assets/clavierSansFil/clavierSansFil2.png";
import clavierSansFil3 from "./assets/clavierSansFil/clavierSansFil3.png";
import clavierSansFil4 from "./assets/clavierSansFil/clavierSansFil4.png";
import clavierSansFil5 from "./assets/clavierSansFil/clavierSansFil5.png";

import sourisSansFil from "./assets/sourisSansFil/sourisSansFil.jfif";
import sourisSansFil2 from "./assets/sourisSansFil/sourisSansFil2.png";
import sourisSansFil3 from "./assets/sourisSansFil/sourisSansFil3.png";
import sourisSansFil4 from "./assets/sourisSansFil/sourisSansFil4.png";
import sourisSansFil5 from "./assets/sourisSansFil/sourisSansFil5.png";

import galaxyA16 from "./assets/galaxyA16/galaxyA16.jfif";
import galaxyA162 from "./assets/galaxyA16/galaxyA162.png";
import galaxyA163 from "./assets/galaxyA16/galaxyA163.png";
import galaxyA164 from "./assets/galaxyA16/galaxyA164.png";
import galaxyA165 from "./assets/galaxyA16/galaxyA165.png";

import coqueSmartphone from "./assets/coqueSmartphone/coqueSmartphone.png";
import coqueSmartphone2 from "./assets/coqueSmartphone/coqueSmartphone2.png";
import coqueSmartphone3 from "./assets/coqueSmartphone/coqueSmartphone3.png";
import coqueSmartphone4 from "./assets/coqueSmartphone/coqueSmartphone4.png";
import coqueSmartphone5 from "./assets/coqueSmartphone/coqueSmartphone5.png";

import chargeurUsbC from "./assets/chargeurUsbC/chargeurUsbC.png";
import chargeurUsbC2 from "./assets/chargeurUsbC/chargeurUsbC2.png";
import chargeurUsbC3 from "./assets/chargeurUsbC/chargeurUsbC3.png";
import chargeurUsbC4 from "./assets/chargeurUsbC/chargeurUsbC4.png";
import chargeurUsbC5 from "./assets/chargeurUsbC/chargeurUsbC5.png";

import powerbank from "./assets/powerbank/powerbank.png";
import powerbank2 from "./assets/powerbank/powerbank2.png";
import powerbank3 from "./assets/powerbank/powerbank3.png";
import powerbank4 from "./assets/powerbank/powerbank4.png";
import powerbank5 from "./assets/powerbank/powerbank5.png";

import cameraWifi from "./assets/cameraWifi/cameraWifi.png";
import cameraWifi2 from "./assets/cameraWifi/cameraWifi2.png";
import cameraWifi3 from "./assets/cameraWifi/cameraWifi3.png";
import cameraWifi4 from "./assets/cameraWifi/cameraWifi4.png";
import cameraWifi5 from "./assets/cameraWifi/cameraWifi5.png";

import ampouleWifi from "./assets/ampouleWifi/ampouleWifi.png";
import ampouleWifi2 from "./assets/ampouleWifi/ampouleWifi2.png";

import priseWifi from "./assets/priseWifi/priseWifi.png";
import priseWifi2 from "./assets/priseWifi/priseWifi2.png";
import priseWifi3 from "./assets/priseWifi/priseWifi3.png";
import priseWifi4 from "./assets/priseWifi/priseWifi4.png";
import priseWifi5 from "./assets/priseWifi/priseWifi5.png";

import sonnetteVideo from "./assets/sonnetteVideo/sonnetteVideo.png";
import sonnetteVideo2 from "./assets/sonnetteVideo/sonnetteVideo2.png";
import sonnetteVideo3 from "./assets/sonnetteVideo/sonnetteVideo3.png";
import sonnetteVideo4 from "./assets/sonnetteVideo/sonnetteVideo4.png";


import capteurMouvement from "./assets/capteurMouvement/capteurMouvement.png";
import capteurMouvement2 from "./assets/capteurMouvement/capteurMouvement2.png";
import capteurMouvement3 from "./assets/capteurMouvement/capteurMouvement3.png";
import capteurMouvement4 from "./assets/capteurMouvement/capteurMouvement4.png";
import capteurMouvement5 from "./assets/capteurMouvement/capteurMouvement5.png";




import { useNavigate } from 'react-router-dom';

// ===============================
// LISTE DES PRODUITS
// ===============================

export const products = [
  {
    id: "p1",
    title: "SOURIS GAMING LOGITECH G102",
    price: 5500,
    img: sourisGaming,
    images: [
      sourisGaming,
      sourisGaming2,
      sourisGaming3,
      sourisGaming4,
      sourisGaming5
    ],
    dec: "La Logitech G102 est une souris gaming conçue pour offrir précision, rapidité et confort pendant vos sessions de jeu. Sa forme ergonomique assure une prise en main agréable, tandis que ses boutons facilement accessibles permettent de réagir rapidement en pleine partie. Elle convient aussi bien aux joueurs débutants qu'aux utilisateurs recherchant une souris fiable pour leur ordinateur. Son design sobre et orienté gaming s'intègre facilement à différents setups, que ce soit pour jouer, travailler ou naviguer au quotidien."
  },

  {
    id: "p2",
    title: "CASQUE BLUETOOTH JBL",
    price: 8500,
    img: casqueBluetooth,
    images: [
      casqueBluetooth,
      casqueBluetooth2,
      casqueBluetooth3,
      casqueBluetooth4,
      casqueBluetooth5
    ],
    dec: "Profitez de votre musique, de vos vidéos et de vos appels avec ce casque Bluetooth JBL au design confortable. Ses coussinets rembourrés permettent une utilisation agréable pendant de longues périodes, tandis que son arceau assure un maintien adapté. La connexion sans fil vous offre davantage de liberté de mouvement et évite l'encombrement des câbles. Grâce à ses commandes intégrées, vous pouvez facilement gérer votre écoute. Son design blanc élégant avec les détails caractéristiques JBL en fait également un accessoire moderne et pratique au quotidien."
  },

  {
    id: "p3",
    title: "CLAVIER GAMING RGB",
    price: 6500,
    img: clavierGaming,
      images: [
      clavierGaming,
      clavierGaming2,
      clavierGaming3,
      clavierGaming4,
      clavierGaming5
    ],
    dec: "Ce clavier gaming RGB est conçu pour les joueurs qui souhaitent associer confort, réactivité et style. Son rétroéclairage RGB apporte une ambiance gaming à votre bureau et permet de créer un setup plus moderne et immersif. Les touches sont pensées pour offrir une utilisation agréable aussi bien pendant les jeux que pour la saisie quotidienne. Il convient aux jeux vidéo, au travail, aux études et à toutes les activités nécessitant un clavier confortable. Une solution idéale pour améliorer votre espace gaming sans sacrifier la praticité."
  },

  {
    id: "p4",
    title: "ÉCRAN ASUS 24 POUCES",
    price: 30500,
    img: ecranAsus,
    images: [
      ecranAsus,
      ecranAsus2,
      ecranAsus3,
      ecranAsus4,
      ecranAsus5
    ],
    dec: "Cet écran ASUS 24 pouces constitue une solution polyvalente pour le travail, les études, le gaming et le divertissement. Son format offre un espace d'affichage confortable tout en restant suffisamment compact pour s'intégrer facilement sur un bureau. Il permet de travailler sur plusieurs documents, regarder des vidéos, naviguer sur Internet ou profiter de vos jeux dans de bonnes conditions. Son design moderne s'intègre facilement dans un environnement professionnel ou dans un setup gaming."
  },

  {
    id: "p5",
    title: "WEBCAM FULL HD 1080P",
    price: 7500,
    img: webcam,
    images: [
      webcam,
      webcam2,
      webcam3,
      webcam4,
      webcam5
    ],
    dec: "Cette webcam Full HD 1080p est idéale pour les visioconférences, les cours en ligne, les réunions à distance et le streaming. Elle permet d'obtenir une image claire et détaillée afin de rester facilement visible pendant vos échanges vidéo. Compacte et pratique, elle peut être installée sur un ordinateur ou un écran compatible. Elle convient aussi bien à une utilisation professionnelle qu'à un usage personnel. Une solution simple pour améliorer la qualité de vos appels vidéo et de vos contenus en ligne."
  },

  {
    id: "p6",
    title: "MANETTE GAMING SANS FIL",
    price: 6500,
    img: manette,
    images: [
      manette,
      manette2,
      manette3,
      manette4,
      manette5
    ],
    dec: "Cette manette gaming sans fil vous permet de jouer plus confortablement tout en profitant d'une plus grande liberté de mouvement. Sa conception est adaptée à une prise en main naturelle et confortable, ce qui la rend agréable pour les longues sessions de jeu. L'absence de câble encombrant permet de conserver un espace de jeu plus propre et plus pratique. Elle constitue un excellent choix pour les amateurs de jeux vidéo recherchant une expérience plus confortable et une meilleure liberté devant leur écran."
  },

  {
    id: "p7",
    title: "IMPRIMANTE HP DESKJET",
    price: 18500,
    img: imprimante,
    images: [
      imprimante,
      imprimante2,
      imprimante3,
      imprimante4,
      imprimante5
    ],
    dec: "L'imprimante HP DeskJet est une solution pratique pour les impressions du quotidien à la maison, au bureau ou pour les études. Elle permet d'imprimer facilement différents documents tels que des cours, devoirs, factures, formulaires ou documents professionnels. Son format pratique facilite son installation sur un bureau sans prendre trop de place. Elle convient particulièrement aux utilisateurs qui recherchent une imprimante simple et adaptée aux besoins courants."
  },

  {
    id: "p8",
    title: "ROUTEUR WIFI 6",
    price: 8900,
    img: routeur,
    images: [
      routeur,
      routeur2,
      routeur3,
      routeur4,
      routeur5
    ],
    dec: "Le routeur Wi-Fi 6 est conçu pour fournir une connexion sans fil rapide et stable à vos différents appareils. Il convient aux maisons, bureaux et espaces nécessitant la connexion simultanée de plusieurs équipements comme les smartphones, ordinateurs, téléviseurs et appareils connectés. Il permet de profiter plus confortablement de la navigation Internet, du streaming, des appels vidéo et des activités en ligne. Une solution moderne pour améliorer la qualité et la stabilité de votre réseau domestique."
  },

  {
    id: "p9",
    title: "ENCEINTE BLUETOOTH JBL",
    price: 12500,
    img: enceinte,
    images: [
      enceinte,
      enceinte2,
      enceinte3,
      enceinte4
    ],
    dec: "Cette enceinte Bluetooth JBL est idéale pour profiter de votre musique sans avoir besoin de rester connecté à un câble. Son format pratique permet de l'utiliser à la maison, au bureau ou lors de vos moments de détente. La connexion Bluetooth facilite l'association avec un smartphone, une tablette ou un autre appareil compatible. Son design moderne et son utilisation simple en font un excellent choix pour écouter de la musique, des podcasts ou regarder des contenus multimédias avec davantage de confort."
  },

  {
    id: "p10",
    title: "TAPIS DE SOURIS GAMING XXL",
    price: 3500,
    img: tapisSouris,
    images: [
      tapisSouris,
      tapisSouris2,
      tapisSouris3,
      tapisSouris4,
    ],
    dec: "Le tapis de souris gaming XXL offre une grande surface permettant d'accueillir confortablement votre souris et votre clavier. Sa large dimension est particulièrement appréciée par les joueurs qui utilisent de grands mouvements de souris. Il permet également de protéger la surface du bureau contre les rayures et les traces liées à une utilisation quotidienne. Son design gaming complète parfaitement un setup informatique et offre une surface confortable pour jouer, travailler ou naviguer."
  },

  {
    id: "p11",
    title: "MICROPHONE USB GAMING",
    price: 9500,
    img: microphone,
    images: [
      microphone,
      microphone2,
      microphone3,
      microphone4
    ],
    dec: "Ce microphone USB gaming est conçu pour les joueurs, créateurs de contenu, streamers et utilisateurs ayant besoin d'une voix claire lors de leurs échanges. Sa connexion USB facilite son installation et son utilisation avec un ordinateur compatible. Il peut être utilisé pour les discussions vocales, les jeux en ligne, les visioconférences, l'enregistrement audio et le streaming. Son design orienté gaming s'intègre facilement à un setup informatique moderne."
  },

  {
    id: "p12",
    title: "SUPPORT PC PORTABLE",
    price: 4500,
    img: supportPc,
    images: [
      supportPc,
      supportPc2,
      supportPc3,
      supportPc4,
      supportPc5
    ],
    dec: "Ce support pour ordinateur portable permet de surélever votre écran afin d'améliorer l'organisation et le confort de votre espace de travail. Il contribue à créer une position plus agréable devant l'ordinateur tout en libérant de l'espace sur le bureau. Il convient à une utilisation à la maison, au bureau ou pour les études. Son design pratique permet également d'obtenir un poste de travail plus propre et mieux organisé."
  },

  {
    id: "p13",
    title: "HUB USB MULTIPORT",
    price: 4200,
    img: hub,
     images: [
      hub,
      hub2,
      hub3,
      hub4,
      hub5
    ],
    dec: "Le hub USB multiport est une solution pratique pour connecter plusieurs périphériques à votre ordinateur à partir d'un seul point de connexion. Il peut être particulièrement utile avec les ordinateurs portables disposant d'un nombre limité de ports. Vous pouvez ainsi faciliter la connexion de périphériques tels qu'une souris, un clavier, une clé USB ou d'autres accessoires compatibles. Compact et facile à transporter, il constitue un accessoire pratique pour le bureau comme pour les déplacements."
  },

  {
    id: "p14",
    title: "CLAVIER SANS FIL",
    price: 5500,
    img: clavierSansFil,
         images: [
      clavierSansFil,
      clavierSansFil2,
      clavierSansFil3,
      clavierSansFil4,
      clavierSansFil5
    ],
    dec: "Ce clavier sans fil offre une expérience de frappe pratique tout en permettant de conserver un bureau propre et sans câble encombrant. Il est adapté à différentes utilisations : saisie de documents, navigation Internet, études, travail et utilisation multimédia. Sa conception permet de profiter d'une plus grande liberté de placement devant l'écran. Facile à intégrer dans un espace de travail ou un setup informatique, il constitue un accessoire pratique pour une utilisation quotidienne."
  },

  {
    id: "p15",
    title: "SOURIS SANS FIL",
    price: 3800,
    img: sourisSansFil,
    images: [
      sourisSansFil,
      sourisSansFil2,
      sourisSansFil3,
      sourisSansFil4,
      sourisSansFil5
    ],
    dec: "Cette souris sans fil est conçue pour offrir une utilisation confortable et pratique au quotidien. Son design ergonomique permet une prise en main agréable, tandis que la connexion sans fil évite l'encombrement d'un câble sur le bureau. Elle convient parfaitement à la navigation Internet, au travail, aux études, à la bureautique et aux tâches quotidiennes sur ordinateur. Son format léger et son design moderne permettent de l'utiliser facilement à la maison, au bureau ou en déplacement."
  },

  {
    id: "p16",
    title: "SMARTPHONE SAMSUNG GALAXY A16",
    price: 39000,
    img: galaxyA16,
    images: [
      galaxyA16,
      galaxyA162,
      galaxyA163,
      galaxyA164,
      galaxyA165
    ],
    dec: "Le Samsung Galaxy A16 est un smartphone pensé pour accompagner facilement votre quotidien. Il permet de communiquer, naviguer sur Internet, consulter les réseaux sociaux, regarder des vidéos, utiliser vos applications et rester connecté avec vos proches. Son format moderne et son écran confortable offrent une expérience agréable pour les activités quotidiennes. Il constitue une solution adaptée aux utilisateurs recherchant un smartphone polyvalent pour la communication, le divertissement et les besoins courants."
  },

  {
    id: "p17",
    title: "COQUE ANTICHOC POUR SMARTPHONE",
    price: 1500,
    img: coqueSmartphone,
    images: [
      coqueSmartphone,
      coqueSmartphone2,
      coqueSmartphone3,
      coqueSmartphone4,
      coqueSmartphone5
    ],
    dec: "Cette coque antichoc est conçue pour protéger votre smartphone contre les petits chocs, rayures et impacts pouvant survenir lors d'une utilisation quotidienne. Elle ajoute une couche de protection autour de l'appareil tout en permettant de conserver un accès pratique aux fonctions essentielles du téléphone. Elle est particulièrement utile pour les utilisateurs qui souhaitent limiter les risques liés aux chutes accidentelles. Une protection simple et pratique pour garder votre smartphone en meilleur état plus longtemps."
  },

  {
    id: "p18",
    title: "CHARGEUR RAPIDE USB-C 20W",
    price: 2500,
    img: chargeurUsbC,
    images: [
      chargeurUsbC,
      chargeurUsbC2,
      chargeurUsbC3,
      chargeurUsbC4,
      chargeurUsbC5
    ],
    dec: "Ce chargeur rapide USB-C 20W permet de recharger efficacement les appareils compatibles équipés d'une connexion USB-C. Son format compact facilite son utilisation à la maison, au bureau ou pendant les déplacements. Il constitue un accessoire pratique pour remplacer un chargeur perdu ou disposer d'un chargeur supplémentaire. Compatible avec les appareils prenant en charge la puissance correspondante, il permet de simplifier la recharge quotidienne de vos équipements."
  },

  {
    id: "p19",
    title: "POWER BANK 10 000 mAh",
    price: 3500,
    img: powerbank,
    images: [
      powerbank,
      powerbank2,
      powerbank3,
      powerbank4,
      powerbank5
    ],
    dec: "Cette batterie externe de 10 000 mAh vous permet de disposer d'une réserve d'énergie supplémentaire lorsque la batterie de votre smartphone ou d'un appareil compatible est faible. Elle est particulièrement pratique lors des déplacements, voyages, journées de travail ou situations où une prise électrique n'est pas facilement accessible. Son format portable permet de l'emporter facilement dans un sac. Un accessoire indispensable pour rester connecté plus longtemps au quotidien."
  },

  {
    id: "p20",
    title: "CAMÉRA DE SURVEILLANCE WI-FI",
    price: 5500,
    img: cameraWifi,
    images: [
      cameraWifi,
      cameraWifi2,
      cameraWifi3,
      cameraWifi4,
      cameraWifi5
    ],
    dec: "Cette caméra de surveillance Wi-Fi permet de garder un œil sur votre maison ou votre espace à distance, selon les fonctions prises en charge par le modèle. Elle se connecte au réseau Wi-Fi afin de faciliter la surveillance depuis un appareil compatible. Elle peut être utilisée pour surveiller une pièce, une entrée, un bureau ou un autre espace. C'est une solution pratique pour renforcer la surveillance de votre environnement et rester informé de ce qui s'y passe."
  },

  {
    id: "p21",
    title: "AMPOULE LED INTELLIGENTE WI-FI",
    price: 2000,
    img: ampouleWifi,
    images: [
      ampouleWifi,
      ampouleWifi2,
    ],
    dec: "Cette ampoule LED intelligente Wi-Fi permet de moderniser facilement votre éclairage et de contrôler votre lumière à partir d'un appareil compatible, selon les fonctionnalités disponibles. Elle est idéale pour créer un éclairage plus pratique dans une chambre, un salon, un bureau ou tout autre espace de la maison. La connexion Wi-Fi permet de l'intégrer à votre environnement connecté. Une solution simple pour rendre l'éclairage quotidien plus pratique et plus intelligent."
  },

  {
    id: "p22",
    title: "PRISE INTELLIGENTE WI-FI",
    price: 2500,
    img: priseWifi,
    images: [
      priseWifi,
      priseWifi2,
      priseWifi3,
      priseWifi4,
      priseWifi5
    ],
    dec: "La prise intelligente Wi-Fi permet de rendre certains appareils électriques plus pratiques à contrôler. Une fois installée sur une prise compatible et connectée au réseau Wi-Fi, elle peut permettre de gérer l'alimentation d'un appareil à distance selon les fonctions disponibles. Elle est idéale pour moderniser progressivement une maison et intégrer différents équipements dans un environnement connecté. Compacte et facile à utiliser, elle constitue un accessoire intéressant pour une maison intelligente."
  },

  {
    id: "p23",
    title: "SONNETTE VIDÉO CONNECTÉE",
    price: 8500,
    img: sonnetteVideo,
    images: [
      sonnetteVideo,
      sonnetteVideo2,
      sonnetteVideo3,
      sonnetteVideo4
    ],
    dec: "La sonnette vidéo connectée combine une fonction de sonnette avec une caméra afin de vous permettre de voir ce qui se passe devant votre porte. Connectée à Internet, elle peut faciliter la surveillance de votre entrée depuis un appareil compatible, selon les fonctionnalités du modèle. Elle est particulièrement pratique pour savoir qui se trouve devant votre domicile et garder un meilleur contrôle sur l'accès à votre maison. Une solution moderne pour améliorer la sécurité et la surveillance de votre entrée."
  },

  {
    id: "p24",
    title: "CAPTEUR DE MOUVEMENT INTELLIGENT",
    price: 3000,
    img: capteurMouvement,
    images: [
      capteurMouvement,
      capteurMouvement2,
      capteurMouvement3,
      capteurMouvement4,
      capteurMouvement5
    ],
    dec: "Ce capteur de mouvement intelligent permet de détecter les mouvements dans une pièce ou un espace équipé. Connecté à votre environnement domotique, il peut servir à déclencher différentes actions ou vous alerter selon les possibilités du système utilisé. Il peut être installé dans une entrée, une chambre, un salon, un bureau ou tout autre espace nécessitant une détection de présence. Un accessoire pratique pour améliorer la surveillance et automatiser votre maison connectée."
  }
];

// ===============================
// PRODUCT CARD
// ===============================

function ProductCard({ id,title, price, img, dec }) {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/products/${id}`)}>

      <div className="image-container">
        <img
          src={img}
          alt={title}
          className="product-image"
        />
      </div>

      <h2>{title}</h2>


      <div className="price-container">
        <span className="price">
          {price.toLocaleString("fr-DZ")} DA
        </span>
      </div>

      <button
        className="cart-button"
        type="button"
      >
        Ajouter au panier
      </button>

    </div>
  );
}

// ===============================
// PRODUCT LIST
// RECHERCHE + TRI + PAGINATION
// ===============================

function ProductList() {

  // ===============================
  // RECHERCHE
  // ===============================

  const [search, setSearch] = useState("");

  // ===============================
  // TRI PAR PRIX
  // ===============================

  const [sortPrice, setSortPrice] = useState("");

  // ===============================
  // PAGINATION
  // ===============================

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(8);

  // ===============================
  // FILTRAGE + RECHERCHE + TRI
  // ===============================

  const filteredProducts = products
    .filter((product) => {

      const searchValue = search
        .toLowerCase()
        .trim();

      return (
        product.title
          .toLowerCase()
          .includes(searchValue) ||

        product.dec
          .toLowerCase()
          .includes(searchValue)
      );
    })

    .sort((a, b) => {

      // Prix croissant
      if (sortPrice === "asc") {
        return a.price - b.price;
      }

      // Prix décroissant
      if (sortPrice === "desc") {
        return b.price - a.price;
      }

      // Aucun tri
      return 0;
    });

  // ===============================
  // NOMBRE TOTAL DE PAGES
  // ===============================

  const totalPages = Math.ceil(
    filteredProducts.length / pageSize
  );

  // ===============================
  // PRODUITS DE LA PAGE
  // ===============================

  const startIndex =
    (currentPage - 1) * pageSize;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );

  // ===============================
  // RECHERCHE
  // ===============================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    // Revenir à la première page
    setCurrentPage(1);
  };

  // ===============================
  // EFFACER LA RECHERCHE
  // ===============================

  const clearSearch = () => {

    setSearch("");

    setCurrentPage(1);
  };

  // ===============================
  // TRI PAR PRIX
  // ===============================

  const handleSortChange = (e) => {

    setSortPrice(e.target.value);

    // Revenir à la première page
    setCurrentPage(1);
  };

  // ===============================
  // CHANGEMENT DE PAGE
  // ===============================

  const changePage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // CHANGEMENT DU NOMBRE DE PRODUITS
  // ===============================

  const handlePageSizeChange = (e) => {

    const newSize =
      Number(e.target.value);

    setPageSize(newSize);

    setCurrentPage(1);
  };

  // ===============================
  // PAGES À AFFICHER
  // ===============================

  const getPages = () => {

    if (totalPages <= 7) {

      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {

      return [
        1,
        2,
        3,
        "...",
        totalPages,
      ];
    }

    if (
      currentPage >=
      totalPages - 2
    ) {

      return [
        1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (

    <div className="product-container">

      {/* ===============================
          MINI NAVBAR
      =============================== */}

      <div className="products-navbar">

       
        {/* ===============================
            TRI
        =============================== */}

        <div className="sort-container">

          <label htmlFor="sortPrice">
            Trier par :
          </label>

          <select
            id="sortPrice"
            value={sortPrice}
            onChange={handleSortChange}
          >

            <option value="">
              Prix
            </option>

            <option value="asc">
              Prix croissant
            </option>

            <option value="desc">
              Prix décroissant
            </option>

          </select>

        </div>

        {/* ===============================
            RECHERCHE
        =============================== */}

        <div className="search-container">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={handleSearch}
          />

          {search && (

            <button
              className="clear-search"
              type="button"
              onClick={clearSearch}
            >
              ✕
            </button>

          )}

        </div>

      </div>

      {/* ===============================
          RÉSULTAT RECHERCHE
      =============================== */}

      {search && (

        <p className="search-result">

          {filteredProducts.length} produit
          {filteredProducts.length > 1
            ? "s"
            : ""}

          {" "}trouvé
          {filteredProducts.length > 1
            ? "s"
            : ""}

        </p>

      )}

      {/* ===============================
          PRODUITS
      =============================== */}

      {currentProducts.length > 0 ? (

        <div className="products-list">

          {currentProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                img={product.img}
                dec={product.dec}
              />

            )
          )}

        </div>

      ) : (

        // ===============================
        // AUCUN PRODUIT
        // ===============================

        <div className="no-products">

          <h2>
            Aucun produit trouvé
          </h2>

          <p>
            Aucun produit ne correspond
            à votre recherche.
          </p>

          <button
            type="button"
            onClick={clearSearch}
          >
            Afficher tous les produits
          </button>

        </div>

      )}

      {/* ===============================
          PAGINATION
      =============================== */}

      {filteredProducts.length > 0 && (

        <div className="premium-pagination">

          {/* PREVIOUS */}

          <button
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() =>
              changePage(currentPage - 1)
            }
          >
            ‹
          </button>

          {/* NUMÉROS */}

          <div className="pagination-pages">

            {getPages().map(
              (page, index) => {

                if (page === "...") {

                  return (
                    <span
                      key={`dots-${index}`}
                      className="pagination-dots"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    className={`pagination-page ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      changePage(page)
                    }
                  >
                    {page}
                  </button>
                );
              }
            )}

          </div>

          {/* NEXT */}

          <button
            className="pagination-arrow"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              changePage(currentPage + 1)
            }
          >
            ›
          </button>

          {/* SÉPARATEUR */}

          <div className="pagination-divider" />

          {/* NOMBRE PAR PAGE */}

          <select
            className="pagination-select"
            value={pageSize}
            onChange={
              handlePageSizeChange
            }
          >

            <option value={8}>
              8 / page
            </option>

            <option value={16}>
              16 / page
            </option>

            <option value={32}>
              32 / page
            </option>

            <option value={64}>
              64 / page
            </option>

          </select>

          {/* GO TO PAGE */}

          <div className="goto-container">

            <span>
              Go to
            </span>

            <input
              className="goto-input"
              type="number"
              min="1"
              max={totalPages}
              placeholder={currentPage}

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  const page =
                    Number(e.target.value);

                  if (
                    page >= 1 &&
                    page <= totalPages
                  ) {

                    changePage(page);

                    e.target.value = "";
                  }
                }

              }}
            />

            <span>
              Page
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

// ===============================
// EXPORT
// ===============================

export default ProductList;

