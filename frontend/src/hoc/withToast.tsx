import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const withToast = (Component: () => JSX.Element) => () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Component />
        </>
    );
};
