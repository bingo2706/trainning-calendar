import { configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useSelector,
    useDispatch as useAppDispatch,
} from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./features/root.reducer";
import { rootSaga } from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
