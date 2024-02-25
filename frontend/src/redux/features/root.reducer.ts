import { Reducer, combineReducers } from "@reduxjs/toolkit";
import trainingSessionSlice, {
    TrainingSessionState,
} from "./trainingSession.slice";
import excerciseSlice, { ExcerciseState } from "./excercise.slice";

export interface RootState {
    trainingSessionState: TrainingSessionState;
    excerciseState: ExcerciseState;
}
const rootReducer: Reducer<RootState> = combineReducers({
    trainingSessionState: trainingSessionSlice,
    excerciseState: excerciseSlice,
});
export default rootReducer;
