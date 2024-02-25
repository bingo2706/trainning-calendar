import moment from "moment";
export const getCurrentWeekDays = (days: string[]) => {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    const daysToAdd = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;
    startOfWeek.setDate(startOfWeek.getDate() + daysToAdd);

    const daysArray: { key: string; day: number; dateString: string }[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        daysArray.push({
            key: days[i],
            day: day.getDate(),
            dateString: moment(day).format("YYYY-MM-DD"),
        });
    }
    return daysArray;
};
export const swapPositions = (array: any, indexA: number, indexB: number) => {
    let arrayTemp: any = [...array];
    [arrayTemp[indexA], arrayTemp[indexB]] = [
        arrayTemp[indexB],
        arrayTemp[indexA],
    ];
    arrayTemp = updatePositions(arrayTemp);
    return arrayTemp;
};
export const updatePositions = (array) => {
    return array.map((element, index) => ({
        ...element,
        position: index,
    }));
};
export const formatDateField = (field: any) => {
    if (field) {
        return field instanceof Date ? field.toISOString() : field;
    } else {
        return undefined;
    }
};
