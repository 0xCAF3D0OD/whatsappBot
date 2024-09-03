from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.firefox import GeckoDriverManager
import time

def setup_whatsapp():
    driver = webdriver.Chrome(GeckoDriverManager().install())
    driver.get("https://web.whatsapp.com/")
    input("Scannez le code QR et appuyez sur Entrée...")
    return driver

def send_whatsapp_message(driver, message):
    try:
        input_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]'))
        )
        input_box.send_keys(message)
        send_button = driver.find_element(By.XPATH, '//span[@data-icon="send"]')
        send_button.click()
        logger.info(f"Message sent: {message}")
    except Exception as e:
        logger.error(f"Erreur lors de l'envoi du message : {e}")

def check_for_new_messages(driver):
    try:
        unread_messages = driver.find_elements(By.XPATH, '//span[@data-icon="unread-count"]')
        for message in unread_messages:
            message.click()
            time.sleep(1)  # Attendre le chargement du message
            last_message = driver.find_elements(By.XPATH, '//div[@class="message-in"]')[-1]
            text = last_message.text
            logger.info(f"Received message: {text}")
            response = analyze_and_respond(text)
            if response:
                send_whatsapp_message(driver, response)
    except Exception as e:
        logger.error(f"Erreur lors de la vérification des nouveaux messages : {e}")

if __name__ == "__main__":
    driver = setup_whatsapp()
    while True:
        check_for_new_messages(driver)
        time.sleep(10)  # Vérifier toutes les 10 secondes

