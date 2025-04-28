/**
 * Утилиты для работы с Telegram WebApp API
 */

// Проверяем, запущено ли приложение внутри Telegram
export const isRunningInTelegram = (): boolean => {
  return Boolean(window.Telegram?.WebApp);
};

// Получаем инстанс WebApp
export const getTelegramWebApp = (): any => {
  if (!isRunningInTelegram()) {
    console.warn('Приложение запущено вне Telegram.');
    return null;
  }
  
  return window.Telegram.WebApp;
};

// Получаем данные пользователя
export const getTelegramUser = (): any => {
  const webApp = getTelegramWebApp();
  if (!webApp) return null;
  
  return webApp.initDataUnsafe?.user || null;
};

// Получаем тему из Telegram
export const getTelegramTheme = (): any => {
  const webApp = getTelegramWebApp();
  if (!webApp) return null;
  
  return webApp.themeParams;
};

// Показать всплывающее уведомление
export const showNotification = (message: string): void => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  
  webApp.showPopup({
    title: 'ECOSIM',
    message,
    buttons: [{ type: 'close' }]
  });
};

// Закрыть mini app
export const closeApp = (): void => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  
  webApp.close();
};

// Развернуть приложение на весь экран
export const expandApp = (): void => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  
  webApp.expand();
};

// Включить кнопку "Назад"
export const enableBackButton = (callback: () => void): void => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  
  webApp.BackButton.show();
  webApp.BackButton.onClick(callback);
};

// Выключить кнопку "Назад"
export const disableBackButton = (): void => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  
  webApp.BackButton.hide();
}; 