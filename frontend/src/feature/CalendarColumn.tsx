import { Box, Typography, styled } from "@mui/material";
import { ITEM_TYPE } from "../utils/constants";

const ContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "#f6f7f9",
    borderRadius: "8px",
    padding: "10px",
    minHeight: "500px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}));
const TrainingSessionList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%",
    flex: 1,
}));
export default function CalendarColumn({
    children,
    title,
    subtitle,
    props,
}: {
    children: JSX.Element;
    title: string;
    subtitle: string;
    props: any;
}) {
    const today = new Date().getDate();

    return (
        <Box
            {...props}
            sx={{
                flexGrow: 1,
                flex: 1,
                flexBasis: 0,
                overflow: "hidden",
                height: "100%",
            }}
        >
            <Typography variant="subtitle1" color={"#747f88"} fontWeight={500}>
                {title}
            </Typography>
            <ContentWrapper>
                <Typography
                    color={today == +subtitle ? "#7975ca" : "#747f88"}
                    variant="subtitle1"
                    marginBottom={"4px"}
                    fontWeight={today == +subtitle ? 600 : 500}
                >
                    {subtitle}
                </Typography>
                <TrainingSessionList>{children}</TrainingSessionList>
            </ContentWrapper>
        </Box>
    );
}
