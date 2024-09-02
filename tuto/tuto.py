from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--remote-debugging-port=9222")
chrome_options.add_argument("--user-data-dir=/path/to/your/chrome/profile")

driver = webdriver.Chrome(options=chrome_options)
driver.get("https://web.whatsapp.com")

# Votre code pour interagir avec WhatsApp Web ici
