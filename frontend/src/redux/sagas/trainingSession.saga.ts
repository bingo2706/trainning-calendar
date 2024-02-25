import { call, put, takeLatest } from "redux-saga/effects";
import {
    getAllTrainingSession,
    setTrainingSessions,
    updatePositionTrainingSession,
} from "../features/trainingSession.slice";
import { TrainingSessionType } from "../../types/training-session.type";
import { api } from "../../utils/api.util";
import { GetApiResponseType, PayloadType } from "../../types/share.type";
import { toast } from "react-toastify";

function* getAllTrainingSessionHandle() {
    try {
        const response: GetApiResponseType<TrainingSessionType[]> = yield call(
            api,
            {
                url: "/api/training-session",
                method: "get",
            }
        );
        if (response.errCode === 0) {
            yield put(setTrainingSessions(response.data));
        }
    } catch (error) {
        console.log(error);
    }
}
function* updatePositionTrainingSessionHandle(
    payload: PayloadType<{ sourceList; destinationList; isDayChange }>
) {
    try {
        const response: GetApiResponseType<string> = yield call(api, {
            url: "/api/training-session/update-position",
            method: "put",
            data: payload.payload,
        });
        if (response.errCode === 0) {
            toast.success("Cập nhật vị trí thành công");
            yield put(getAllTrainingSession());
        }
    } catch (error) {
        console.log(error);
    }
}
export function* trainingSessionSaga() {
    yield takeLatest(getAllTrainingSession, getAllTrainingSessionHandle);
    yield takeLatest(
        updatePositionTrainingSession,
        updatePositionTrainingSessionHandle
    );
}
