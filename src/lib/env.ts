export function getEnvVar<T>(name: string, fallback: T): T {
  return (process.env[name] || fallback) as T;
}

export const PORT = getEnvVar<number>('PORT', 3000);
export const JWT_SECRET = getEnvVar<string>('JWT_SECRET', 'secret');
export const API_KEY = getEnvVar<string>('API_KEY', 'key');
export const DB_HOST = getEnvVar<string>('DB_HOST', 'localhost');
export const DB_PORT = getEnvVar<number>('DB_PORT', 3306);
export const DB_NAME = getEnvVar<string>('DB_NAME', 'todolist');
export const DB_USER = getEnvVar<string>('DB_USER', 'root');
export const DB_PASSWORD = getEnvVar<string>('DB_PASSWORD', '');
