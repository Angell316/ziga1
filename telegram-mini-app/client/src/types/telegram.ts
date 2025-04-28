export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramTheme {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: TelegramUser;
    auth_date: string;
    hash: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: TelegramTheme;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  
  // Методы
  expand: () => void;
  close: () => void;
  showPopup: (params: any) => void;
  showAlert: (message: string, callback?: () => void) => void;
  
  // Кнопка "Назад"
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  
  // Главная кнопка
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
} 