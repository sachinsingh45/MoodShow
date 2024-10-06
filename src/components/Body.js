import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Watch from "./Watch";
import Landing from "./Landing";
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Landing />,
            errorElement: <ErrorHandler message="Failed to load the landing page." /> // Add an error handler
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <ErrorHandler message="Failed to load the login page." /> // Add an error handler
        },
        {
            path: "/browse",
            element: <Browse />,
            errorElement: <ErrorHandler message="Failed to load the browse page." /> // Add an error handler
        },
        {
            path: "/browse/watch/:id",
            element: <Watch />,
            errorElement: <ErrorHandler message="Failed to load the watch page." /> // Add an error handler
        },
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

// Error handling component to show toast notifications
const ErrorHandler = ({ message }) => {
    toast.error(message);
    return null; // Return null since we only want to show the toast
};

export default Body;
