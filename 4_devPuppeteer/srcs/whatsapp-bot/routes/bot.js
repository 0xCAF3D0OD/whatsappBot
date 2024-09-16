const express = require("express");

const authRoutes = require('./botFiles/authRoutes');
const messageRoutes = require('./botFiles/messageRoutes');
// Création du routeur
const bot = express.Router();

authRoutes(bot);
messageRoutes(bot)

module.exports = bot;

// // Route principale pour afficher et gérer le QR code
// bot.get('/about/scrape', async (req, res) => {
//     try {
//         console.log("Chargement de la page...");
//         await page.waitForSelector('div._akau', { timeout: 60000 });
//         console.log("Page chargée avec succès");
//
//         qrCodeScanned = false;
//         await generateQRCode(page);
//         res.sendFile(path.join(__dirname, '..', 'public/pages', 'qrcode-template.html'));
//
//         // Attendre le scan du QR code en arrière-plan
//         waitForQRCodeScan(page).then(scanned => {
//             qrCodeScanned = scanned;
//         }).catch(console.error);
//     } catch (error) {
//         res.status(500).send(`Erreur: ${error.message}`);
//     }
//     // try {
//     //     if (qrCodeScanned) {
//     //         const newCookies = await page.cookies();
//     //         await fs.writeFile('./whatsapp_cookies.json', JSON.stringify(newCookies));
//     //     }
//     // } catch (error) {
//     //     res.status(500).send(`Erreur: ${error.message}`);
//     // }
// });
//
// // Methode HTML pour l'obtention du status de whatsapp
// bot.get('/check_qr_code_status', async (req, res) => {
//     res.json({ scanned: qrCodeScanned })
// })

// bot.get('/about/scrape/what', async (req, res) => {
//     try {
//         console.log("we are on the page !");
//         const screenshotPath = path.join(__dirname, '..', 'public/images', 'windowScreenshot.png');
//         await page.screenshot({ path: screenshotPath, fullpage: true })
//         global.whatsappPageContent = await page.content();
//         res.sendFile(path.join(__dirname, '..', 'public/pages', 'pageContent.html'));
//     } catch (error) {
//         console.error("page is not accessible");
//         res.status(500).send(`page is not accessible ${error}`);
//     }
// });
//
// bot.get('/check-notifications', async(req, res) => {
//     try {
//         /* Page.evaluate(); Évalue une fonction dans le contexte de la page et renvoie le résultat.
//         Si la fonction passée à page.evaluate renvoie une promesse,
//         la fonction attendra que la promesse soit résolue et renverra sa valeur.*/
//         const notificationCount = await page.evaluate(() => {
//             const notificationElement = document.querySelector('div.x10l6tqk.x14ipxcb.x1oozmrk span');
//             console.log(`notificationElement: ${notificationElement}`);
//             return notificationElement ? parseInt(notificationElement.textContent, 10) : 0;
//         })
//
//         lastNotificationCount = notificationCount;
//
//         res.json({
//             notificationCount,
//             lastNotificationCount
//         })
//     } catch (error) {
//         console.error("notification was not reached");
//         res.status(404).send("notification was not reached");
//     }
// })
//
// bot.get('/about/scrape/what/launch', async (req, res) => {
//     const selectorSearchInput = 'p.selectable-text.copyable-text.x15bjb6t.x1n2onr6';
//     const selectorContactInput = 'div[aria-placeholder="Type a message"][contenteditable="true"][data-lexical-editor="true"]';
//     const selectorRefreshContact = 'button._ah_y';
//     let contact = req.query.contact || "test";
//     let message = req.query.message || "yolo";
//
//     console.log("we are on our way to moneeeyy !");
//
//     try {
//         // await ensureIsLogged(page);
//         if (currentContact !== contact) {
//             currentContact = contact;
//             /*Page.waitForSelector(); Attendre que le sélecteur apparaisse dans la page. Si, au moment de l'appel de la méthode,
//              le sélecteur existe déjà, la méthode renvoie immédiatement.
//              Si le sélecteur n'apparaît pas après le délai d'attente de quelques millisecondes, la fonction est lancée.*/
//             try {
//                 await page.waitForSelector(selectorRefreshContact, { timeout: 5000 });
//                 await page.click(selectorRefreshContact)
//                     .then(() => screenshot(page, 'windowScreenshotRefresh'))
//                     .then(() => timeOutFunction(page, 2000));
//             } catch (error) {
//                 console.warn("Couldn't find refresh button, continuing anyway:", error.message);
//             }
//             try {
//                 await page.waitForSelector(selectorSearchInput);
//
//                 await page.click(selectorSearchInput, { delay: 3000 })
//                     .then(() => screenshot(page, 'windowScreenshotSelection'))
//                     .then(() => timeOutFunction(page, 3000));
//
//                 await page.type(selectorSearchInput, currentContact)
//                     .then(() => screenshot(page, 'windowScreenshotType'))
//                     .then(() => timeOutFunction(page, 2000));
//
//                 await page.keyboard.press("Enter")
//                     .then(() => screenshot(page, 'windowScreenshotEnter'))
//                     .then(() => timeOutFunction(page, 2000));
//             } catch (error) {
//                 console.error("Error during adding contact to search bar");
//                 res.status(500).send(`Error during adding contact to search bar ${error}`);
//             }
//         }
//         try {
//             await page.waitForSelector(selectorContactInput)
//             await page.type(selectorContactInput, message)
//                 .then(() => screenshot(page, 'windowScreenshotEnter'))
//                 .then(() => timeOutFunction(page, 1000));
//             await page.keyboard.press("Enter")
//                 .then(() => screenshot(page, 'windowScreenshotSendMessage'))
//                 .then(() => timeOutFunction(page, 2000));
//         } catch (error) {
//             console.error("Error during typing to contact");
//             res.status(500).send(`Error during typing to contact ${error}`);
//         }
//         console.log("Actions completed successfully 2!");
//         res.sendFile(path.join(__dirname, '..', 'public/pages', 'robot.html'));
//     } catch (error) {
//         console.error("page is not accessible");
//         res.status(500).send(`page is not accessible ${error}`);
//     }
// });


