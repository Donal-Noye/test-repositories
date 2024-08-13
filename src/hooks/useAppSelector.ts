import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store';

// Типизированный хук useSelector для RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;