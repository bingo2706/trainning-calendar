import React, { useRef, useState } from "react";
import { TrainingSessionType } from "../types/training-session.type";
import { Box, BoxProps, Typography, styled } from "@mui/material";
import { useAppSelector } from "../redux/store";
const Container = styled(Box)(({ theme }) => ({
    border: "2px solid #e7e8eb",
    backgroundColor: "#fbfafa",
    borderRadius: "8px",
    padding: "6px 4px 6px 4px",
    cursor: "pointer",
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
    const trainingSessionState = useAppSelector(
        (state) => state.trainingSessionState
    );
    const { trainingSessions } = trainingSessionState;
    const ref = useRef<Element>(null);

    return (
        <Container {...props}>
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
        </Container>
    );
}
