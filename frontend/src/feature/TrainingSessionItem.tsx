import React, { useRef, useState } from "react";
import { TrainingSessionType } from "../types/training-session.type";
import {
    Box,
    BoxProps,
    IconButton,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import { useAppSelector } from "../redux/store";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { toggleExcerciseModal } from "../redux/features/excercise.slice";
import { selectTrainingSession } from "../redux/features/trainingSession.slice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Container = styled(Box)(({ theme }) => ({
    border: "2px solid #e7e8eb",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "6px 4px 2px 4px",
    cursor: "pointer",
}));
const ExcerciseList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "6px",
}));
const ExcerciseItem = styled(Box)(({ theme }) => ({
    border: "2px solid #e7e8eb",
    padding: "6px 4px 4px 4px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
}));
export default function TrainingSessionItem({
    trainingSession,
    index,
    day,
    props,
}: {
    trainingSession: TrainingSessionType;
    index: number;
    props: BoxProps;
    day: number;
}) {
    const { excercises } = trainingSession;
    const dispatch = useDispatch();
    const handleClickAddExcercise = () => {
        dispatch(toggleExcerciseModal({ key: "addExcercise", status: true }));
        dispatch(selectTrainingSession(trainingSession));
    };
    const textEllipsis = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    };
    return (
        <Container {...props}>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={"4px"}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "#7975ca",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }}
                    fontWeight={600}
                >
                    {trainingSession.workout_name}
                </Typography>
                <MoreHorizIcon sx={{ color: "#747f88" }} />
            </Stack>
            <ExcerciseList>
                {excercises &&
                    excercises?.length > 0 &&
                    excercises?.map((item, index) => (
                        <ExcerciseItem key={index}>
                            <Typography
                                variant="h6"
                                fontSize={"1rem"}
                                textAlign={"end"}
                                sx={{ ...textEllipsis }}
                            >
                                {item.excercise_name}
                            </Typography>
                            <Stack
                                display={"flex"}
                                justifyContent={"space-between"}
                                direction={"row"}
                                gap={"6px"}
                            >
                                <Typography
                                    variant="subtitle1"
                                    color={"#747f88"}
                                    fontSize={"0.875rem"}
                                    fontWeight={600}
                                >
                                    {item.set_number}x
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color={"#747f88"}
                                    fontSize={"0.875rem"}
                                    sx={{ ...textEllipsis }}
                                >
                                    {item.set_info}
                                </Typography>
                            </Stack>
                        </ExcerciseItem>
                    ))}
            </ExcerciseList>
            <Stack
                display={"flex"}
                width={"100%"}
                justifyContent={"flex-end"}
                flexDirection={"row"}
            >
                <IconButton
                    sx={{ padding: "2px", width: "fit-content" }}
                    onClick={handleClickAddExcercise}
                >
                    <AddCircleIcon sx={{ color: "#747f88" }} />
                </IconButton>
            </Stack>
        </Container>
    );
}
