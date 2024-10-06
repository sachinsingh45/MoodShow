import { createBrowserRouter, useNavigate } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login.js"
import { RouterProvider } from "react-router-dom";
import Watch from "./Watch.js";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login />
        },
        {
            path:"/browse",
            element:<Browse />
        },
        {
            path: "/browse/watch/:id",   
            element: <Watch/>
        },
    ]);
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};

export default Body;