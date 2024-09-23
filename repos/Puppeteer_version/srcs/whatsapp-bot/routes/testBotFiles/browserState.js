let browser = null;
let whatsappPage = null;

module.exports = {
    getBrowser: () => browser,
    setBrowser: (newBrowser) => { browser = newBrowser; },
    getWhatsappPage: () => whatsappPage,
    setWhatsappPage: (newPage) => { whatsappPage = newPage; },
};