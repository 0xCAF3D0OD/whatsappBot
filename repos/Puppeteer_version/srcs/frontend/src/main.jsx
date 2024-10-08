import '../assets/style/tailwind.css';

import Alpine from 'alpinejs';

import { router } from "./routes.js";

import { HomeComponent } from './components/HomeComponent.js'
import { QRCodeComponent } from "./components/QRCodeComponent.js";
import { whatsappPageComponent } from "./components/whatsappPageComponent.js";

import { cardComponent } from "../assets/pages/cardComponent.js";
import { dashboardComponent } from "../assets/pages/dashboardComponent.js";

window.Alpine = Alpine;

Alpine.data('router', router);

Alpine.data('cardComponent', cardComponent);
Alpine.data('dashboardComponent', dashboardComponent);

Alpine.data('HomeComponent', HomeComponent);
Alpine.data('QRCodeComponent', QRCodeComponent);
Alpine.data('WhatsappPageComponent', whatsappPageComponent);

Alpine.start();


