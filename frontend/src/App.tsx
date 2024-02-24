import "./App.css";
import { withToast } from "./hoc/withToast";

import Calendar from "./feature/Calendar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/Header";
function App() {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Calendar />
            </DndProvider>
        </>
    );
}

export default withToast(App);
