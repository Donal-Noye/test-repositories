import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './features/repositories/repositoriesSlice.ts';

// Создаем store с помощью configureStore и добавляем редьюсер репозиториев
export const store = configureStore({
	reducer: {
		repositories: repositoriesReducer,
	},
});

// Типизация RootState для использования в селекторах
export type RootState = ReturnType<typeof store.getState>;

// Типизация Dispatch для использования в хуках
export type AppDispatch = typeof store.dispatch;
