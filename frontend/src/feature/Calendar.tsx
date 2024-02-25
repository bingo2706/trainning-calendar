import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import CalendarColumn from "./CalendarColumn";
import TrainingSessionItem from "./TrainingSessionItem";
import { days } from "../utils/constants";
import { TrainingSessionType } from "../types/training-session.type";
import { useDispatch } from "react-redux";
import {
    getAllTrainingSession,
    toggleTrainingSessionModal,
    updatePositionTrainingSession,
} from "../redux/features/trainingSession.slice";
import { useAppSelector } from "../redux/store";
import { getCurrentWeekDays, updatePositions } from "../utils/helper";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import moment from "moment";

import AddExcerciseModal from "./AddExcerciseModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTrainingSessionModal from "./AddTrainingSessionModal";
const CalendarContainer = styled(Box)(({ theme }) => ({
    maxWidth: "1440px",
    margin: "100px auto",
}));
const Board = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    gap: "10px",
}));
export default function Calendar() {
    const [dataTraningSession, setDataTraningSession] = useState<
        TrainingSessionType[]
    >([]);
    const daysArr = getCurrentWeekDays(days);
    const trainingSessionState = useAppSelector(
        (state) => state.trainingSessionState
    );
    const { trainingSessions } = trainingSessionState;

    const dispatch = useDispatch();

    const generatedTrainingSessionItem = (day: number) => {
        return (
            dataTraningSession?.length > 0 &&
            dataTraningSession
                .filter((item) => day === new Date(item.session_date).getDate())
                .sort((a, b) => a.position - b.position)
                .map((item, index) => {
                    return (
                        <Draggable
                            key={item.id}
                            draggableId={`${item.id}`}
                            index={index}
                        >
                            {(provided, snapshot) => (
                                <TrainingSessionItem
                                    trainingSession={item}
                                    key={item.id}
                                    index={index}
                                    day={day}
                                    props={{
                                        ref: provided.innerRef,
                                        ...provided.draggableProps,
                                        ...provided.dragHandleProps,
                                        style: {
                                            ...provided.draggableProps.style,
                                            opacity: snapshot.isDragging
                                                ? "0.5"
                                                : "1",
                                        },
                                    }}
                                />
                            )}
                        </Draggable>
                    );
                })
        );
    };
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;
        let isDayChange = false;
        let sourceList = dataTraningSession
            .filter(
                (item) =>
                    moment(item.session_date).format("YYYY-MM-DD") ===
                    source.droppableId
            )
            .sort((a, b) => a.position - b.position);
        let destinationList = dataTraningSession
            .filter(
                (item) =>
                    moment(item.session_date).format("YYYY-MM-DD") ===
                    destination.droppableId
            )
            .sort((a, b) => a.position - b.position);

        if (source.droppableId === destination.droppableId) {
            const [draggedItem] = sourceList.splice(source.index, 1);
            sourceList.splice(destination.index, 0, draggedItem);
            sourceList = updatePositions(sourceList);
            isDayChange = false;
        } else {
            let [removedItem] = sourceList.splice(source.index, 1);
            removedItem = {
                ...removedItem,
                session_date: new Date(destination.droppableId),
            };
            sourceList = updatePositions(sourceList);

            destinationList.splice(destination.index, 0, removedItem);

            destinationList = updatePositions(destinationList);
            isDayChange = true;
        }
        dispatch(
            updatePositionTrainingSession({
                sourceList,
                destinationList,
                isDayChange,
            })
        );
    };
    useEffect(() => {
        dispatch(getAllTrainingSession());
    }, [dispatch]);
    useEffect(() => {
        if (trainingSessions?.length > 0) {
            setDataTraningSession(trainingSessions);
        }
    }, [trainingSessions]);
    return (
        <CalendarContainer>
            <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button
                    startIcon={<AddCircleIcon />}
                    variant="contained"
                    sx={{ marginBottom: "20px" }}
                    onClick={() =>
                        dispatch(
                            toggleTrainingSessionModal({
                                key: "addTrainingSession",
                                status: true,
                            })
                        )
                    }
                >
                    Add Training Session
                </Button>
            </Stack>
            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    {daysArr?.length > 0 &&
                        daysArr.map((item, index) => {
                            return (
                                <Droppable
                                    key={item.key}
                                    droppableId={item.dateString}
                                >
                                    {(provided) => (
                                        <CalendarColumn
                                            key={index}
                                            subtitle={item.day.toString()}
                                            title={item.key}
                                            props={{
                                                ref: provided.innerRef,
                                                ...provided.droppableProps,
                                            }}
                                        >
                                            <>
                                                {generatedTrainingSessionItem(
                                                    item.day
                                                )}
                                                {provided.placeholder}
                                            </>
                                        </CalendarColumn>
                                    )}
                                </Droppable>
                            );
                        })}
                </Board>
            </DragDropContext>
            <AddExcerciseModal />
            <AddTrainingSessionModal />
        </CalendarContainer>
    );
}
