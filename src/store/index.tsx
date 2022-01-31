import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RESOURCES_REDUCER_NAME, resourcesReducer } from './modules/resources';

export const store = configureStore({
  reducer: { [RESOURCES_REDUCER_NAME]: resourcesReducer },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
