import { RootState } from '@reduxjs/toolkit/query';
import { useAppDispatch, useDispatch, useAppSelector, useSelector, TypedUseSelectorHook } from './../node_modules/react-redux/dist/react-redux.d';
import { AppDispatch } from './store';
export const useAppDispatch  = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = () => useSelector;


