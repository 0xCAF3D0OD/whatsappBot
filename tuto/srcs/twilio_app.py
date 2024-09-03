import logging
import re
from twilio.rest import Client
from fastapi import FastAPI, Request
# from langchain_community.llms import CTransformers
from app import response
from urllib.parse import parse_qs
from dotenv import dotenv_values
config = dotenv_values("/app/.env")

app = FastAPI()

TWILIO_ACCOUNT_SID=config["TWILIO_ACCOUNT_SID"]
TWILIO_AUTH_TOKEN=config["TWILIO_AUTH_TOKEN"]
TWILIO_NUMBER=config["TWILIO_NUMBER"]

account_sid = TWILIO_ACCOUNT_SID
auth_token = TWILIO_AUTH_TOKEN
client = Client(account_sid, auth_token)
twilio_number = TWILIO_NUMBER

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# llm = CTransformers(model="openhermes-2-mistral-7b.Q8_0.gguf", model_type= "llama")

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
        print(variation, message)
        if (variation in message):
            subject = variation
            break
    print(subject, classes)
    return subject, classes


def analyze_and_respond(message):
    message = message.lower()
    if "bonjour" in message:
        return "Bonjour ! Comment puis-je vous aider ?"
    else:
        subject, classes = exctract_discipline_school(message)
        classes_eligible = any(int(year) in [7, 8, 9] for year in classes)
        return "✋" if classes_eligible and subject else None
    # message = message.lower()
    # if "bonjour" in message:
    #     return "Bonjour ! Comment puis-je vous aider ?"
    # else:
    #     subject, classes = exctract_discipline_school(message)
    #     classe_eligible = False
    #
    #     for class_year in classes:
    #         if int(class_year) in [7, 8, 9]:
    #             classe_eligible = True
    #             break
    #
    #     print(f"Matière: {subject}, Classes: {classes}, Éligible: {classe_eligible}")
    #
    #     if classe_eligible and subject is not None:
    #         return "Je suis disponible"
    #     else:
    #         return "Désolé, je ne suis pas disponible pour cette demande."

# Sending message logic through Twilio Messaging API
def send_message(to_number, body_text):
    try:
        message = client.messages.create(
            from_=f"whatsapp:{twilio_number}",
            body=body_text,
            to=f"whatsapp:{to_number}"
            )
        logger.info(f"Message sent to {to_number}: {message.body}")
    except Exception as e:
        logger.error(f"Error sending message to {to_number}: {e}")

@app.post("/")
async def reply(request: Request):
    try:
        form_data = await request.form()
        message = form_data.get("Body", "").strip()
        response = analyze_and_respond(message)
        send_message("+41764304321", response)
        return {"message": response}
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        # send_message("+41764304321", "Une erreur s'est produite, veuillez réessayer.")
        return {"message": "Une erreur s'est produite, veuillez réessayer."}

# @app.post("/")
# async def reply(question:Request):
#     llm_question = parse_qs(await question.body())[b'Body'][0].decode()
#     try:
#         chat_response = response(llm_question, llm)
#         send_message("+91xxxxxxxxxx", chat_response)
#     except:
#          send_message("+91xxxxxxxxxx", "wait")
#     return chat_response