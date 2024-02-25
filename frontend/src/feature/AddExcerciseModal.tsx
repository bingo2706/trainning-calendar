import { Button, Grid, TextField } from "@mui/material";
import CustomModal from "../components/Modal";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import {
    createNewExcercise,
    toggleExcerciseModal,
} from "../redux/features/excercise.slice";
import { selectTrainingSession } from "../redux/features/trainingSession.slice";
import { Control, Controller, useForm } from "react-hook-form";
import { ExcerciseType } from "../types/excercise.type";
import { joiResolver } from "@hookform/resolvers/joi";
import { excerciseValidationSchema } from "../schema/excerciseSchema";
import { isEmpty } from "lodash";
import { useEffect } from "react";
const defaultParamExcercise: Partial<ExcerciseType> = {
    excercise_name: "",
    set_info: "",
    set_number: 0,
};
export default function AddExcerciseModal() {
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Partial<ExcerciseType>>({
        defaultValues: defaultParamExcercise,
        resolver: joiResolver(excerciseValidationSchema),
    });

    const excerciseState = useAppSelector((state) => state.excerciseState);
    const { statusExcerciseModal } = excerciseState;
    const trainingSessionState = useAppSelector(
        (state) => state.trainingSessionState
    );
    const { selectedTrainingSession } = trainingSessionState;
    const dispatch = useDispatch();
    const handleSave = (data: Partial<ExcerciseType>) => {
        dispatch(
            createNewExcercise({
                ...data,
                session_id: selectedTrainingSession?.id,
            })
        );
    };
    useEffect(() => {
        if (!statusExcerciseModal.addExcercise) {
            reset(defaultParamExcercise);
        }
    }, [reset, statusExcerciseModal.addExcercise]);
    return (
        <CustomModal
            title="Thêm mới Excercise"
            open={statusExcerciseModal.addExcercise}
            handleClose={() => {
                dispatch(
                    toggleExcerciseModal({ key: "addExcercise", status: false })
                );
                dispatch(selectTrainingSession(undefined));
            }}
            action={
                <>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(handleSave)}
                    >
                        Lưu
                    </Button>
                </>
            }
            content={
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name={"excercise_name"}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={"Tên bài tập"}
                                        helperText={
                                            errors["excercise_name"]?.message
                                        }
                                        error={
                                            !isEmpty(errors["excercise_name"])
                                        }
                                        autoComplete="new-password"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"set_info"}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={"Thông tin set"}
                                        helperText={errors["set_info"]?.message}
                                        error={!isEmpty(errors["set_info"])}
                                        autoComplete="new-password"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"set_number"}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={"Thông tin set"}
                                        helperText={
                                            errors["set_number"]?.message
                                        }
                                        type="number"
                                        error={!isEmpty(errors["set_number"])}
                                        autoComplete="new-password"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        />
    );
}
