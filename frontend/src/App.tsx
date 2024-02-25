import "./App.css";
import { withToast } from "./hoc/withToast";
import Calendar from "./feature/Calendar";
import { ReduxProvider } from "./redux/ReduxProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { vi } from "date-fns/locale";
function App() {
    return (
        <>
            <ReduxProvider>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={vi}
                >
                    <Calendar />
                </LocalizationProvider>
            </ReduxProvider>
        </>
    );
}

export default withToast(App);
