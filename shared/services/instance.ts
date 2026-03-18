import axios from 'axios';

// создаем экземпляр axios
export const axiosInstance = axios.create({
  // в next в названиях переменных окружения обезателльно в начале должно быть NEXT_PUBLIC_
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});