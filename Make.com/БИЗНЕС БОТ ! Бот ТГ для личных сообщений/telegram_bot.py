import logging
import json
import os
import openai
from telebot import TeleBot, types

# database.py
import sqlite3


# Получение имени пользователя
def get_user_name(user):
    if user.first_name and user.last_name:
        return f"{user.first_name} {user.last_name}"
    elif user.first_name:
        return user.first_name
    elif user.last_name:
        return user.last_name
    else:
        return "Незнакомец"



# Создание таблицы для хранения истории сообщений
def create_table():
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS chat_history
                 (user_id INTEGER, business_connection_id TEXT, message_role TEXT, message_content TEXT)''')
    conn.commit()
    conn.close()

# Сохранение сообщения в базу данных
def save_message(user_id, business_connection_id, message_role, message_content):
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute("INSERT INTO chat_history (user_id, business_connection_id, message_role, message_content) VALUES (?, ?, ?, ?)",
              (user_id, business_connection_id, message_role, message_content))
    conn.commit()
    conn.close()

# Получение истории сообщений для определенного пользователя и бизнес-соединения
def get_chat_history(user_id, business_connection_id):
    conn = sqlite3.connect('chat_history.db')
    c = conn.cursor()
    c.execute("SELECT message_role, message_content FROM chat_history WHERE user_id=? AND business_connection_id=? ORDER BY rowid",
              (user_id, business_connection_id))
    chat_history = c.fetchall()
    conn.close()
    return chat_history

# Настройка детального логирования
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# SECURITY FIX: Use environment variables for sensitive data
TELEGRAM_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Validate required environment variables
if not TELEGRAM_TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN environment variable is required")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is required")

# Инициализация OpenAI API
openai.api_key = OPENAI_API_KEY

# Инициализация бота Telegram
bot = TeleBot(TELEGRAM_TOKEN)

# Путь к файлу JSON для хранения данных о бизнес-соединениях
json_db_path = 'business_connections.json'

# Глобальная переменная для хранения бизнес-соединений
business_connections = {}

# Загрузка данных о бизнес-соединениях
def load_business_connections():
    global business_connections
    if os.path.exists(json_db_path):
        with open(json_db_path, 'r') as file:
            business_connections = json.load(file)
    else:
        logging.warning("Business connections file not found. Creating a new one.")
        save_business_connections()

# Сохранение данных о бизнес-соединениях
def save_business_connections():
    logging.debug(f"Saving business connections: {business_connections}")
    try:
        with open(json_db_path, 'w') as file:
            json.dump(business_connections, file, indent=2)
    except Exception as e:
        logging.error(f"Error saving business connections: {e}")

# Обновление бизнес-соединения
def update_business_connection(business_connection):
    business_connection_id = business_connection.id
    user_chat_id = business_connection.user_chat_id
    can_reply = business_connection.can_reply
    is_enabled = business_connection.is_enabled
    date = business_connection.date

    logging.debug(f"Updating business connection: {business_connection_id}")
    business_connections[business_connection_id] = {
        'user_chat_id': user_chat_id,
        'can_reply': can_reply,
        'is_enabled': is_enabled,
        'date': date
    }
    save_business_connections()

# Получение бизнес-соединения
def get_business_connection(business_connection_id):
    return business_connections.get(business_connection_id)

# Обработчик бизнес-соединений
@bot.business_connection_handler(func=lambda business_connection: True)
def handle_business_connection(business_connection):
    update_business_connection(business_connection)
    logging.info(f"Business connection updated: {business_connection.id}")

@bot.business_message_handler(func=lambda message: True, content_types=['text', 'photo', 'video'])
def handle_business_message(message):
    user_id = message.chat.id
    business_connection_id = message.business_connection_id
    user_name = get_user_name(message.from_user)  # Получаем имя пользователя
    logging.info(f"Received business message from {user_name}: {message.text}")

    # Обновляем информацию о бизнес-соединении
    business_connection = get_business_connection(business_connection_id)
    if business_connection:
        business_connection['can_reply'] = True
        business_connection['is_enabled'] = True
        save_business_connections()
    else:
        # Если бизнес-соединение не найдено, создаем новое
        business_connection = {
            'user_chat_id': message.chat.id,
            'can_reply': True,
            'is_enabled': True,
            'date': message.date
        }
        business_connections[business_connection_id] = business_connection
        save_business_connections()

    if business_connection and business_connection.get('is_enabled') and business_connection.get('can_reply'):
        try:
            # Сохранение входящего сообщения в базу данных
            save_message(user_id, business_connection_id, 'user', message.text)

            # Получение истории сообщений из базы данных
            chat_history = get_chat_history(user_id, business_connection_id)
            messages = [
                {"role": "system", "content": f"Возьми имя пользователя и общайся с ним по имени {user_name}! Тебя зовут ArturAI, ты помощник Артура Хорошего маркетолога и преподавателя по искусственному интеллекту и автоматизации бизнеса с помощью make.com. Своенравный, безразличный, холодный ум. Вы - личный ассистент Артура, работающий на основе нейронной сети. Артур получает огромное количество сообщений и запросов ежедневно, и ваша главная задача - помочь ему эффективно управлять этим потоком, одновременно предоставляя ценную информацию пользователям. При первом контакте с пользователем представьтесь и кратко объясните свою роль. Сгенерируйте случайный номер очереди от 23 до 113 и сообщите его пользователю только один раз. Определите тип запроса пользователя: заказ внедрения (используйте кодовое слово внедрение для приоритетной обработки), покупка схемы (blueprint) для Make.com (стоимость 1000 рублей, ссылка для доната https://pay.cloudtips.ru/p/b6881ba0, схема должна быть из видео Артура), покупка обновляемой папки (blueprint) для Make.com (стоимость 3000 рублей, ссылка для доната https://pay.cloudtips.ru/p/b6881ba0, все схемы из видео Артура) быстрая консультация (предложите донат 500 рублей за приоритетный ответ по той же ссылке), личный вопрос (сообщите, что Артур ответит при возможности, не предлагайте донаты или платные услуги), общие вопросы (направьте в группу Ковчег: https://t.me/maya_pro). Для сложных запросов предлагайте расширенные платные консультации, кроме личных вопросов. Напоминайте о поддержке творчества Артура через донаты и покупку схем, кроме случаев с личными вопросами. Генерируйте уникальные ответы, основываясь на этих принципах, но не ограничивайтесь жесткими шаблонами. Адаптируйтесь к контексту разговора и личности пользователя. Ваша цель - эффективно управлять временем Артура, предоставляя пользователям ценную информацию и поддерживая его творческую деятельность."},
                *[{"role": role, "content": content} for role, content in chat_history]
            ]

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=3000,
                temperature=1,
            )
            message_text = response.choices[0].message.content

            # Сохранение ответа бота в базу данных
            save_message(user_id, business_connection_id, 'assistant', message_text)

            # Добавляем системную приписку к ответу бота
            bot_response = f"{message_text}\n\n[Ответ от бота]"

            bot.send_message(message.chat.id, message_text, reply_to_message_id=message.id, business_connection_id=business_connection_id)
            logging.info("Response sent to business chat")
        except Exception as e:
            logging.error(f"Error generating or sending response to business chat: {e}")
    else:
        logging.warning(f"Business connection not found or not enabled: {business_connection_id}")

# Обработчик личных сообщений
@bot.message_handler(content_types=['text'])
def handle_private_message(message):
    logging.debug("Handling private message")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message.text}
            ],
            max_tokens=50,
            temperature=0.7,
        )
        message_text = response.choices[0].message.content
        bot.reply_to(message, message_text)
    except Exception as e:
        logging.error(f"Error generating or sending response to private chat: {e}")

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def handle_start(message):
    logging.debug("Handling /start command")
    bot.reply_to(message, "Привет! Я ваш бот.")

# Обработчик команды /getBusinessConnection
@bot.message_handler(commands=['getBusinessConnection'])
def handle_get_business_connection(message):
    logging.debug("Handling /getBusinessConnection command")
    if message.text.split():
        business_connection_id = message.text.split()[1]
        business_connection = get_business_connection(business_connection_id)
        if business_connection:
            response = f"Business Connection ID: {business_connection_id}\n"
            response += f"User Chat ID: {business_connection['user_chat_id']}\n"
            response += f"Can Reply: {business_connection['can_reply']}\n"
            response += f"Is Enabled: {business_connection['is_enabled']}\n"
            response += f"Date: {business_connection['date']}"
            bot.reply_to(message, response)
        else:
            bot.reply_to(message, f"Business connection not found: {business_connection_id}")
    else:
        bot.reply_to(message, "Please provide a business connection ID.")

if __name__ == "__main__":
    create_table()  # Создание таблицы для хранения истории сообщений
    load_business_connections()
    logging.info("Starting the bot")
    bot.infinity_polling() 