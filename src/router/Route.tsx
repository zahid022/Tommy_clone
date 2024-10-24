import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import PublicCreateAccount from "../pages/PublicCreateAccount";
import Products from "../pages/Products";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>  
            <Route path="/" element={<Navigate to={'/en'} />} />
            <Route path="/en" element={<Layout />}>
                <Route path="/en" index element={<Home />} />
                <Route path="createaccount" element={<PublicCreateAccount />} />
                <Route path="products" element={<Products />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="cart" element={<Cart />} />
            </Route>
        </>
    )
)