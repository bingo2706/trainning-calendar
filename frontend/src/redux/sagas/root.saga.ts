import { all } from "redux-saga/effects";
import { trainingSessionSaga } from "./trainingSession.saga";
import { excerciseSaga } from "./excercise.saga";

export function* rootSaga() {
    yield all([trainingSessionSaga(), excerciseSaga()]);
}
