import { Box, Typography, styled } from "@mui/material";
import { useDrop } from "react-dnd";
import { ITEM_TYPE } from "../utils/constants";

const ContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "#f6f7f9",
    borderRadius: "8px",
    padding: "10px",
    minHeight: "500px",
}));
const TrainingSessionList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
}));
export default function CalendarColumn({
    children,
    title,
    subtitle,
}: {
    children: JSX.Element;
    title: string;
    subtitle: string;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => {
            return true;
        },
    });
    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: isOver ? "rgb(188,251,255)" : "inherit",
            }}
            ref={drop}
        >
            <Typography variant="subtitle1" color={"#747f88"} fontWeight={500}>
                {title}
            </Typography>
            <ContentWrapper>
                <Typography
                    color={"#747f88"}
                    variant="subtitle1"
                    marginBottom={"4px"}
                    fontWeight={500}
                >
                    {subtitle}
                </Typography>
                <TrainingSessionList>{children}</TrainingSessionList>
            </ContentWrapper>
        </Box>
    );
}
