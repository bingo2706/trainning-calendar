import { Reducer, combineReducers } from "@reduxjs/toolkit";
import trainingSessionSlice, {
    TrainingSessionState,
} from "./trainingSession.slice";

export interface RootState {
    trainingSessionState: TrainingSessionState;
}
const rootReducer: Reducer<RootState> = combineReducers({
    trainingSessionState: trainingSessionSlice,
});
export default rootReducer;
