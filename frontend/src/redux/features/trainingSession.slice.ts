import { createSlice } from "@reduxjs/toolkit";
import { TrainingSessionType } from "../../types/training-session.type";
import { PayloadType } from "../../types/share.type";

type StatusTrainingSessionModal = {
    addTrainingSession: boolean;
};
export type TrainingSessionState = {
    trainingSessions: TrainingSessionType[];
    selectedTrainingSession?: TrainingSessionType;
    statusTrainingSessionModal: StatusTrainingSessionModal;
};
const initialState: TrainingSessionState = {
    trainingSessions: [],
    statusTrainingSessionModal: {
        addTrainingSession: false,
    },
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
        toggleTrainingSessionModal: (
            state,
            payload: PayloadType<{
                key: keyof StatusTrainingSessionModal;
                status: boolean;
            }>
        ) => {
            const { key, status } = payload.payload;
            return {
                ...state,
                statusTrainingSessionModal: {
                    ...state.statusTrainingSessionModal,
                    [key]: status,
                },
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
        selectTrainingSession: (
            state,
            payload: PayloadType<TrainingSessionType | undefined>
        ) => {
            return {
                ...state,
                selectedTrainingSession: payload.payload,
            };
        },
    },
});
export const {
    getAllTrainingSession,
    setTrainingSessions,
    updatePositionTrainingSession,
    selectTrainingSession,
    toggleTrainingSessionModal,
} = trainingSessionSlice.actions;
export default trainingSessionSlice.reducer;
