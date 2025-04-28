import axios from 'axios';

// Базовый URL для API-запросов
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Создание экземпляра axios с базовым URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Настройка перехватчика для добавления токена авторизации к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 