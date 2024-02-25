import { call, put, takeLatest } from "redux-saga/effects";
import {
    createNewExcercise,
    toggleExcerciseModal,
} from "../features/excercise.slice";
import { GetApiResponseType, PayloadType } from "../../types/share.type";
import { ExcerciseType } from "../../types/excercise.type";
import { api } from "../../utils/api.util";
import { toast } from "react-toastify";
import { getAllTrainingSession } from "../features/trainingSession.slice";

function* createNewExcerciseHandle(
    payload: PayloadType<Partial<ExcerciseType>>
) {
    try {
        const response: GetApiResponseType<ExcerciseType> = yield call(api, {
            url: "/api/excercise",
            method: "post",
            data: payload.payload,
        });
        if (response.errCode === 0) {
            toast.success("Tạo mới Excercise thành công");
            yield put(getAllTrainingSession());
            yield put(
                toggleExcerciseModal({ key: "addExcercise", status: false })
            );
        }
    } catch (error) {
        console.log(error);
    }
}
export function* excerciseSaga() {
    yield takeLatest(createNewExcercise, createNewExcerciseHandle);
}
