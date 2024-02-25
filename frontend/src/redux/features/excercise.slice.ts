import { createSlice } from "@reduxjs/toolkit";
import { ExcerciseType } from "../../types/excercise.type";
import { PayloadType } from "../../types/share.type";

type StatusExcerciseModal = {
    addExcercise: boolean;
};
export type ExcerciseState = {
    excercises: ExcerciseType[];
    selectedExcercise?: ExcerciseType;
    statusExcerciseModal: StatusExcerciseModal;
};
const initialState: ExcerciseState = {
    excercises: [],
    statusExcerciseModal: {
        addExcercise: false,
    },
};
export const excerciseSlice = createSlice({
    name: "excerciseSlice",
    initialState: initialState,
    reducers: {
        createNewExcercise: (
            state,
            payload: PayloadType<Partial<ExcerciseType>>
        ) => {
            return {
                ...state,
            };
        },
        toggleExcerciseModal: (
            state,
            payload: PayloadType<{
                key: keyof StatusExcerciseModal;
                status: boolean;
            }>
        ) => {
            const { key, status } = payload.payload;
            return {
                ...state,
                statusExcerciseModal: {
                    ...state.statusExcerciseModal,
                    [key]: status,
                },
            };
        },
        selectExcercise: (
            state,
            payload: PayloadType<ExcerciseType | undefined>
        ) => {
            return {
                ...state,
                selectedExcercise: payload.payload,
            };
        },
    },
});
export const { createNewExcercise, toggleExcerciseModal, selectExcercise } =
    excerciseSlice.actions;
export default excerciseSlice.reducer;
