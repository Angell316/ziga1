@echo off
echo Создание структуры проекта Telegram Mini App с использованием TypeScript...

:: Корневая директория
mkdir telegram-mini-app
cd telegram-mini-app

:: Основные директории
mkdir client server docs .github

:: Клиентская часть
cd client
mkdir public src
cd public
mkdir assets
cd assets
mkdir images icons fonts
cd ..
cd ..

:: src директории клиента (с TypeScript)
cd src
mkdir api components context hooks pages redux styles utils types

:: Компоненты
cd components
mkdir common Business Drops Darknet Shop Rating
cd common
mkdir Button Card Modal Loader
cd ..
cd ..

:: Pages
cd pages
mkdir Home Business Drops Darknet Shop Ratings Profile
cd ..

:: Возврат в корневую директорию
cd ..
cd ..

:: Серверная часть
cd server
mkdir src tests
cd src
mkdir api config db services utils jobs websocket
cd api
mkdir routes controllers middlewares
cd ..

:: DB
cd db
mkdir models repositories migrations
cd ..

:: WebSocket
cd websocket
mkdir handlers middlewares
cd ..
cd ..

:: Тесты
cd tests
mkdir unit integration fixtures
cd ..
cd ..

:: Документация
cd docs
mkdir api architecture diagrams
cd api
mkdir endpoints
cd ..
cd ..

:: GitHub
cd .github
mkdir workflows ISSUE_TEMPLATE
cd ..

echo Структура папок проекта успешно создана!
echo Проект находится в директории: %cd%\telegram-mini-app 