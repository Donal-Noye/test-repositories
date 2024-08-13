import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// Типизированный хук useDispatch для AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();