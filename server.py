from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from config import SERVER_PORT, DOMAIN

# Создаем экземпляр приложения FastAPI
app = FastAPI(title="Экономический симулятор Telegram Mini App")

# Включаем CORS для взаимодействия с React приложением
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшн режиме надо ограничить
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Определяем пути к директориям React-приложения
CLIENT_BUILD_DIR = os.path.join(os.path.dirname(__file__), "telegram-mini-app", "client", "build")
CLIENT_PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "telegram-mini-app", "client", "public")

# Устанавливаем IS_PRODUCTION в True для обхода заглушки
IS_PRODUCTION = True  # Изменено: всегда работать в продакшн режиме

# Настраиваем статические файлы
if IS_PRODUCTION:
    # В продакшн режиме отдаем файлы из директории build
    app.mount("/static", StaticFiles(directory=os.path.join(CLIENT_BUILD_DIR, "static")), name="static")
    
    # Все остальные статические файлы из корня build
    @app.get("/{file_path:path}")
    async def serve_static_files(file_path: str):
        # Если запрос к API - пропускаем
        if file_path.startswith("api/"):
            raise HTTPException(status_code=404)
            
        # Обслуживаем статические файлы из корня
        static_file_path = os.path.join(CLIENT_BUILD_DIR, file_path)
        if os.path.exists(static_file_path) and os.path.isfile(static_file_path):
            return FileResponse(static_file_path)
        
        # Для поддержки маршрутизации React отдаем index.html
        return FileResponse(os.path.join(CLIENT_BUILD_DIR, "index.html"))
else:
    # В режиме разработки отдаем только временную страницу с информацией
    # или можно настроить проксирование к dev-серверу React
    @app.get("/", response_class=HTMLResponse)
    async def development_page(request: Request):
        # Проверяем, если index.html существует в public директории, отдаем его
        index_html_path = os.path.join(CLIENT_PUBLIC_DIR, "index.html")
        if os.path.exists(index_html_path):
            with open(index_html_path, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
        
        # Иначе отдаем временную страницу
        return HTMLResponse(content=f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Экономический симулятор - Режим разработки</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {{
                    font-family: 'Inter', sans-serif;
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #121212;
                    color: white;
                }}
                h1 {{
                    color: #E91E63;
                    text-align: center;
                }}
                .container {{
                    background-color: #1E1E1E;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }}
                .info {{
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #2D2D2D;
                    border-radius: 8px;
                }}
                .button {{
                    background-color: #E91E63;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: block;
                    width: 100%;
                    margin-top: 20px;
                    font-size: 16px;
                }}
                code {{
                    background-color: #2D2D2D;
                    padding: 4px 8px;
                    border-radius: 4px;
                }}
                pre {{
                    background-color: #2D2D2D;
                    padding: 10px;
                    border-radius: 4px;
                    overflow-x: auto;
                }}
            </style>
            <script src="https://telegram.org/js/telegram-web-app.js"></script>
        </head>
        <body>
            <div class="container">
                <h1>Экономический симулятор</h1>
                <div class="info">
                    <p>Приложение работает в режиме разработки.</p>
                    <p>Для запуска React-приложения выполните команды:</p>
                    <pre>cd telegram-mini-app/client
npm install
npm start</pre>
                    <p>React-приложение будет доступно на порту 3000.</p>
                    <p>Чтобы собрать продакшн-версию, выполните:</p>
                    <pre>cd telegram-mini-app/client
npm run build</pre>
                    <p>После сборки сервер автоматически будет раздавать приложение.</p>
                    <p>Домен: {DOMAIN}</p>
                </div>
                <button class="button" onclick="tg.close()">Закрыть</button>
            </div>
            <script>
                // Инициализация Telegram Mini App
                const tg = window.Telegram.WebApp;
                tg.expand();
                tg.ready();
            </script>
        </body>
        </html>
        """)

# API эндпоинты
@app.get("/api/status")
async def api_status():
    return {"status": "ok", "version": "0.1.0", "mode": "production" if IS_PRODUCTION else "development"}

# Эндпоинт для авторизации пользователя
@app.post("/api/auth")
async def auth_user(request: Request):
    data = await request.json()
    # Здесь будет логика проверки данных из Telegram и авторизации
    return {"success": True, "user_id": data.get("id")}

# Запуск сервера
if __name__ == "__main__":
    mode = "продакшн" if IS_PRODUCTION else "разработки"
    print(f"Сервер запущен в режиме {mode} на http://localhost:{SERVER_PORT}")
    print(f"Доступен через туннель: {DOMAIN}")
    uvicorn.run(app, host="0.0.0.0", port=SERVER_PORT) 