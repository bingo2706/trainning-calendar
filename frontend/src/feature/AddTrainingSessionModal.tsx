import { Button, Grid, TextField } from "@mui/material";
import CustomModal from "../components/Modal";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import {
    createTrainingSession,
    toggleTrainingSessionModal,
} from "../redux/features/trainingSession.slice";
import { TrainingSessionType } from "../types/training-session.type";
import { joiResolver } from "@hookform/resolvers/joi";
import { trainingSessionValidationSchema } from "../schema/trainingSessionSchema";
import { isEmpty } from "lodash";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { formatDateField } from "../utils/helper";
import moment from "moment";
const defaultParamTrainingSession: Partial<TrainingSessionType> = {
    workout_name: "",
    session_date: new Date(),
};
export default function AddTrainingSessionModal() {
    const {
        control,
        reset,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<Partial<TrainingSessionType>>({
        defaultValues: defaultParamTrainingSession,
        resolver: joiResolver(trainingSessionValidationSchema),
    });

    const trainingSessionState = useAppSelector(
        (state) => state.trainingSessionState
    );
    const { statusTrainingSessionModal } = trainingSessionState;
    const dispatch = useDispatch();
    const handleSave = (data: Partial<TrainingSessionType>) => {
        dispatch(
            createTrainingSession({
                ...data,
                session_date: moment(data.session_date).format(
                    "YYYY-MM-DD"
                ) as any,
            })
        );
    };
    useEffect(() => {
        if (!statusTrainingSessionModal.addTrainingSession) {
            reset(defaultParamTrainingSession);
        }
    }, [reset, statusTrainingSessionModal.addTrainingSession]);
    return (
        <CustomModal
            title="Thêm mới Training Session"
            open={statusTrainingSessionModal.addTrainingSession}
            handleClose={() => {
                dispatch(
                    toggleTrainingSessionModal({
                        key: "addTrainingSession",
                        status: false,
                    })
                );
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
                                name={"workout_name"}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={"Tên phiên tập"}
                                        helperText={
                                            errors["workout_name"]?.message
                                        }
                                        error={!isEmpty(errors["workout_name"])}
                                        autoComplete="new-password"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"session_date"}
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        label={"Ngày phiên tập"}
                                        onChange={(date: any) => {
                                            setValue("session_date", date);
                                        }}
                                        value={
                                            field.value
                                                ? new Date(field.value)
                                                : null
                                        }
                                        slotProps={{
                                            textField: {
                                                helperText:
                                                    errors["session_date"]
                                                        ?.message,
                                                error: !isEmpty(
                                                    errors["session_date"]
                                                ),
                                                fullWidth: true,
                                            },
                                        }}
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
