import '../assets/style/tailwind.css';

import Alpine from 'alpinejs';

import { router } from "./routes.js";

import { HomeComponent } from './components/HomeComponent.js'
import { QRCodeComponent } from "./components/QRCodeComponent.js";
import { WhatsappPageComponent } from "./components/WhatsappPageComponent.js";
import { notificationScript } from "../assets/scripts/notificationScript.js";
import { notificationButton } from "../assets/pageUtils/notificationButton.js";

import { cardComponent } from "../assets/pages/cardComponent.js";
import { DashboardComponent } from "../assets/pages/DashboardComponent.js";
import { notificationsComponent } from "../assets/pages/notificationsComponent.js";
import {ConnectionQRCode} from "./controller/QRCodeController.js";

window.Alpine = Alpine;

Alpine.data('router', router);

Alpine.data('notificationScript', notificationScript);
Alpine.data('notificationButton', notificationButton);
Alpine.data('ConnectionQRCode', ConnectionQRCode);

Alpine.data('cardComponent', cardComponent);
Alpine.data('notifications', notificationsComponent);
Alpine.data('DashboardComponent', DashboardComponent);

Alpine.data('HomeComponent', HomeComponent);
Alpine.data('QRCodeComponent', QRCodeComponent);
Alpine.data('WhatsappPageComponent', WhatsappPageComponent);

Alpine.start();


