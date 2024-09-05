from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
import time


def send_whatsapp_web_message(response, logger):
    if not response:
        logger.info("No response to send")
        return

    logger.info(f"Sending message via WhatsApp Web: {response}")
    driver = None
    geckodriver_path = None
    options = None
    try:
        options = Options()
        options.add_argument('-headless')
        # Chemin vers geckodriver
        geckodriver_path = "/usr/local/bin/geckodri ver"

        # Créez un objet Service avec le chemin du geckodriver
        service = Service(geckodriver_path)

        # Initialiser le driver Selenium pour Firefox avec le service
        driver = webdriver.Firefox(service=service, options=options)

        # Ouvrir WhatsApp Web
        driver.get('https://web.whatsapp.com/')

        # # Attendre que l'utilisateur scanne le QR code manuellement
        # input("Scan the QR code and press Enter after WhatsApp Web is loaded...")

        # Attendre que WhatsApp Web soit chargé (max 60 secondes)
        logger.info("Waiting for WhatsApp Web to load (60 seconds timeout)...")
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.XPATH, '//div[@data-testid="chats-filled"]'))
        )

        # Vérifier si on est connecté
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]'))
            )
            logger.info("Successfully connected to WhatsApp Web")
        except:
            logger.error("Failed to connect to WhatsApp Web. Please check authentication.")
            return
        # # Attendre que la page soit chargée
        # WebDriverWait(driver, 30).until(
        #     EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]'))
        # )

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
