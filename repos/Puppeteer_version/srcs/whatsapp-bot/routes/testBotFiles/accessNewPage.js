const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");

const { screenshot, timeOutFunction, returnSelector, logs } = require('./testBotUtils')
async function enterInNewPage(newWhatsappPage) {
   logs('enterInNewPage');
    const selectorUseHere = '.x78zum5 .xuxw1ft button.x889kno';
    const buttonSelector = await returnSelector(newWhatsappPage, 'Use here');

    if (buttonSelector) {
       logs('Bouton "Use here", sélecteur:', buttonSelector);
        await newWhatsappPage.waitForSelector(buttonSelector);
       logs('click button');
        await newWhatsappPage.click(buttonSelector);
       logs(' screenshot');
        await timeOutFunction(newWhatsappPage, 5000);
        await screenshot(newWhatsappPage, '3_UseHerePageSet');
    }

    await timeOutFunction(newWhatsappPage, 5000);
    const ACCEPTSelector = await returnSelector(newWhatsappPage, 'ACCEPT');
    await screenshot(newWhatsappPage, '4_searchPageSet');
    if (ACCEPTSelector) {
        logs('Bouton "ACCEPT", sélecteur:', ACCEPTSelector);
        await newWhatsappPage.waitForSelector(ACCEPTSelector);
        logs('click button');
        await newWhatsappPage.click(ACCEPTSelector);
        logs(' screenshot');
        await timeOutFunction(newWhatsappPage, 5000);
        await screenshot(newWhatsappPage, '5_ACCEPTPageSet');
    }
    // await newWhatsappPage.evaluate(() => {
    //     const AccepteButton = Array.from(document.querySelectorAll('button')).find(btn =>
    //         btn.textContent.trim() === 'ACCEPT'
    //     );
    //     AccepteButton.click();
    // });
    //
    // await timeOutFunction(newWhatsappPage, 5000);
    // await screenshot(newWhatsappPage, 'newPageSet');

    // await newWhatsappPage.click(UseHereButton);
    // await timeOutFunction(newWhatsappPage, 3);

    // await newWhatsappPage.waitForSelector(selectorSearchInput);
    // await newWhatsappPage.click(acceptButton);
    // await screenshot(newWhatsappPage, 'newPageSet');
}

module.exports = {
    enterInNewPage,
}