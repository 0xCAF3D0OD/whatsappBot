const express = require('express');
const puppeteer = require("puppeteer");
const fs = require('fs').promises;

// (async () => {
//     try {
//         const browser = await puppeteer.launch({
//             executablePath: '/opt/google/chrome/chrome',
//             headless: false,
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         });
//         const page = await browser.newPage();
//
//         // Lire et définir les cookies
//         const cookiesString = await fs.readFile('./public/cookies/cookies.json', 'utf8');
//         const cookies = JSON.parse(cookiesString);
//         await page.setCookie(...cookies);
//
//         // Naviguer vers une page qui nécessite une authentification
//         await page.goto('https://profile.intra.42.fr/');
//
//         // Vérifier si l'authentification a réussi
//         const isLoggedIn = await page.evaluate(() => {
//             // Vérifiez un élément qui n'apparaît que lorsque l'utilisateur est connecté
//             // Par exemple, un élément avec la classe 'user-profile' ou le nom d'utilisateur
//             return !!document.querySelector('.user-profile');
//         });
//
//         if (isLoggedIn) {
//             console.log('Authentification réussie avec les cookies !');
//             // Vous pouvez ajouter d'autres actions ici si nécessaire
//         } else {
//             console.log('Échec de l\'authentification avec les cookies.');
//         }
//
//         await page.screenshot({ path: 'auth-result.png' });
//         await browser.close();
//     } catch (error) {
//         console.error('Une erreur est survenue :', error);
//     }
// })();
