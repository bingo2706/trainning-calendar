import { createSlice } from "@reduxjs/toolkit";
import { TrainingSessionType } from "../../types/training-session.type";
import { PayloadType } from "../../types/share.type";

export type TrainingSessionState = {
    trainingSessions: TrainingSessionType[];
};
const initialState: TrainingSessionState = {
    trainingSessions: [],
};
export const trainingSessionSlice = createSlice({
    name: "trainingSessionSlice",
    initialState: initialState,
    reducers: {
        getAllTrainingSession: (state) => {
            return {
                ...state,
            };
        },
        setTrainingSessions: (
            state,
            payload: PayloadType<TrainingSessionType[]>
        ) => {
            return {
                ...state,
                trainingSessions: payload.payload,
            };
        },
        updatePositionTrainingSession: (
            state,
            payload: PayloadType<{ sourceList; destinationList; isDayChange }>
        ) => {
            return {
                ...state,
            };
        },
    },
});
export const {
    getAllTrainingSession,
    setTrainingSessions,
    updatePositionTrainingSession,
} = trainingSessionSlice.actions;
export default trainingSessionSlice.reducer;
