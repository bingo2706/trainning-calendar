import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";

import CalendarColumn from "./CalendarColumn";
import TrainingSessionItem from "./TrainingSessionItem";
import { days } from "../utils/constants";

const CalendarContainer = styled(Box)(({ theme }) => ({
    maxWidth: "1440px",
    margin: "100px auto",
}));
const Board = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    gap: "10px",
}));
export default function Calendar() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay() - 1;
    return (
        <CalendarContainer>
            <Board>
                {days?.length > 0 &&
                    days.map((day, index) => (
                        <CalendarColumn
                            key={index}
                            subtitle={(
                                currentDate.getDate() -
                                currentDay +
                                index
                            ).toString()}
                            title={day}
                        >
                            <Typography>Item</Typography>
                        </CalendarColumn>
                    ))}
            </Board>
        </CalendarContainer>
    );
}
