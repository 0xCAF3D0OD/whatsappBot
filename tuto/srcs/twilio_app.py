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
        if (variation in message):
            print(variation)
            subject = variation
            break
    return subject, classes


def analyze_and_respond(message):
    # exctract_discipline_school('j’ai un remplacement disponible pour une classe de 7/8/9 en math qui est disponibe')
    if "bonjour" in message.lower():
        return "Bonjour ! Comment puis-je vous aider ?"
    elif "aide" in message.lower():
        return "Voici comment je peux vous aider : ..."
    else:
        subject, classe = exctract_discipline_school(message)
        print(subject, classe)
        return "je suis disponible"

# Sending message logic through Twilio Messaging API
def send_message(to_number, body_text):
    try:
        print(f"twilio number is -----> {twilio_number}, number is -----> {to_number}")
        message = client.messages.create(
            from_=f"whatsapp:{twilio_number}",
            body=body_text,
            to=f"whatsapp:{to_number}"
            )
        logger.info(f"Message sent to {to_number}: {message.body}")
    except Exception as e:
        logger.error(f"Error sending message to {to_number}: {e}")

@app.post("/")
async def reply(question: Request):
    no_message = parse_qs(await question.body())[b'Body'][0].decode()
    try:
        response = analyze_and_respond(no_message)  # Utiliser la fonction d'analyse et de réponse
        send_message("+41764304321", response)
    except:
        send_message("+41764304321", "wait")
    return response

# @app.post("/")
# async def reply(question:Request):
#     llm_question = parse_qs(await question.body())[b'Body'][0].decode()
#     try:
#         chat_response = response(llm_question, llm)
#         send_message("+91xxxxxxxxxx", chat_response)
#     except:
#          send_message("+91xxxxxxxxxx", "wait")
#     return chat_response