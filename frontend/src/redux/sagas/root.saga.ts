import { all } from "redux-saga/effects";
import { trainingSessionSaga } from "./trainingSession.saga";

export function* rootSaga() {
    yield all([trainingSessionSaga()]);
}
