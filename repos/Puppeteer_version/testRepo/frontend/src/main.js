import Alpine from 'alpinejs';
import PineconeRouter from 'pinecone-router';

// Optionnel, mais utile pour l'accès global
window.Alpine = Alpine;

// Ajoutez le plugin Pinecone Router
Alpine.plugin(PineconeRouter);

// Initialisez Alpine
Alpine.start();