from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
import asyncio
import logging
from config import BOT_TOKEN, DOMAIN, SERVER_PORT

# Настройка логирования
logging.basicConfig(level=logging.INFO)

# Инициализация бота и диспетчера
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# Обработчик команды /start
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    # Создаем кнопку для запуска Mini App
    keyboard = types.InlineKeyboardMarkup(
        inline_keyboard=[
            [
                types.InlineKeyboardButton(
                    text="Открыть экономический симулятор",
                    web_app=types.WebAppInfo(url=DOMAIN)
                )
            ]
        ]
    )
    
    await message.answer(
        "Привет! Нажми на кнопку ниже, чтобы открыть экономический симулятор:",
        reply_markup=keyboard
    )

# Обработчик команды /app
@dp.message(Command("app"))
async def cmd_app(message: types.Message):
    # Отправляем ссылку на Mini App
    await message.answer(f"Ссылка на приложение: {DOMAIN}")
    
    # Создаем кнопку для запуска Mini App
    keyboard = types.InlineKeyboardMarkup(
        inline_keyboard=[
            [
                types.InlineKeyboardButton(
                    text="Открыть экономический симулятор",
                    web_app=types.WebAppInfo(url=DOMAIN)
                )
            ]
        ]
    )
    
    await message.answer(
        "Или нажми на кнопку ниже:",
        reply_markup=keyboard
    )

# Главная функция
async def main():
    # Запуск бота
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main()) 