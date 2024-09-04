from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


def send_whatsapp_web_message(response, logger):
    if not response:
        logger.info("No response to send")
        return

    logger.info(f"Sending message via WhatsApp Web: {response}")
    driver = None
    try:
        # Initialiser le driver Selenium pour Firefox
        driver = webdriver.Firefox()

        # Ouvrir WhatsApp Web
        driver.get('https://web.whatsapp.com/')

        # Attendre que l'utilisateur scanne le QR code manuellement
        input("Scan the QR code and press Enter after WhatsApp Web is loaded...")

        # Attendre que la page soit chargée
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]'))
        )

        # Trouver le champ de saisie du message
        input_box = driver.find_element(By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]')

        # Entrer le message
        input_box.send_keys(response)

        # Envoyer le message
        input_box.send_keys(Keys.ENTER)

        logger.info("Message sent successfully")

        # Attendre un peu avant de fermer le navigateur
        time.sleep(5)

    except Exception as e:
        logger.error(f"Error sending message via WhatsApp Web: {e}")

    finally:
        # Fermer le navigateur seulement si driver a été initialisé
        if driver:
            try:
                driver.quit()
            except Exception as e:
                logger.error(f"Error closing the browser: {e}")

    pass
