import logging
from whatsapp_web_messages import send_whatsapp_web_message

# Configuration du logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    # Votre logique principale ici
    message = "Bonjour, ceci est un message de test!"
    send_whatsapp_web_message(message, logger)

if __name__ == "__main__":
    main()
