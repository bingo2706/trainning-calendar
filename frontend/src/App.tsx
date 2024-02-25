import "./App.css";
import { withToast } from "./hoc/withToast";

import Calendar from "./feature/Calendar";
import { ReduxProvider } from "./redux/ReduxProvider";

function App() {
    return (
        <>
            <ReduxProvider>
                <Calendar />
            </ReduxProvider>
        </>
    );
}

export default withToast(App);
