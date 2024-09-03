import logging
import re
from fastapi import FastAPI, Request
from urllib.parse import parse_qs

app = FastAPI()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def math_var():
    maths_variations = [
        "mathématiques", "maths", "math", "mathematiques",
        "mathématique", "mathematique"
    ]

    all_variations = [
        variation.lower() for variation in maths_variations
    ] + [
        variation.capitalize() for variation in maths_variations
    ] + [
        variation.upper() for variation in maths_variations
    ]

    all_variations = sorted(set(all_variations))
    return all_variations

def exctract_discipline_school(message):
    classes = re.findall(r'\b[1-9][0-9]*\b', message)
    disciplines = math_var()
    subject = None
    for variation in disciplines:
        if (variation in message):
            subject = variation
            break
    return subject, classes


def analyze_and_respond(message):
    message = message.lower()
    if "bonjour" in message:
        return "✋"
    else:
        subject, classes = exctract_discipline_school(message)
        classes_eligible = any(int(year) in [7, 8, 9] for year in classes)
        return "✋" if classes_eligible and subject else None

# Simuler l'envoi de message via WhatsApp Web
def send_whatsapp_web_message(response):
    if response:
        logger.info(f"Simulating sending message via WhatsApp Web: {response}")
        # Ici, vous intégreriez le code pour interagir avec WhatsApp Web
        # Par exemple, en utilisant Selenium comme mentionné précédemment
    else:
        logger.info("No response to send")

@app.post("/")
async def reply(request: Request):
    try:
        form_data = await request.form()
        message = form_data.get("Body", "").strip()
        response = analyze_and_respond(message)
        send_whatsapp_web_message(response)
        return {"message": response}
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return {"message": "Une erreur s'est produite, veuillez réessayer."}

