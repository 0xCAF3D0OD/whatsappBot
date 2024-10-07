import '../assets/style/tailwind.css';
import Alpine from 'alpinejs';
import { router } from "./routes.js";
import { HomeComponent } from './components/HomeComponent.js'
import { QRCodeComponent } from "./components/QRCodeComponent.js";
import { cardComponent } from "../assets/pages/QRCodeComponent.js";
import { whatsappPageComponent } from "./components/whatsappPageComponent.js";

window.Alpine = Alpine;

Alpine.data('whatsappPageComponent', whatsappPageComponent);
Alpine.data('cardComponent', cardComponent);
Alpine.data('HomeComponent', HomeComponent);
Alpine.data('QRCodeComponent', QRCodeComponent);
Alpine.data('router', router);

Alpine.start();


