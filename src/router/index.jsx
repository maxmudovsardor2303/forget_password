import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import SignIn from "../pages/sign-in"
import Main from "../pages/main/main"
import SignUp from "../pages/sign-up"
const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="main/*" element={<Main/>}>
            </Route>
            // </Route>
        )
    );
    return <RouterProvider router={router}/>
};
export default Index;
