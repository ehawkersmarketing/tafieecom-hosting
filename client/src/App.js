import React, { useEffect, useState } from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import DashBoard from "./app/pages/home_page/dashboard.jsx";
import { useDispatch } from "react-redux";
import SignIn from "./app/pages/auth/sign_in/sign_in.jsx";
import CreateProduct from "./app/pages/create_product/createProduct.js";
import ComposeBlog from "./app/pages/blog_page/CreateBlog/createBlog.js";
import UpdateBlog from "./app/pages/blog_page/UpdateBlog/updateBlog.js";
import SingleBlog from "./app/pages/blog_page/SingleBlog/SingleBlog.jsx";
import UpdateProduct from "./app/pages/update_product/updateProduct.js";
import Product from "./app/pages/product_page/product.jsx";
import TermsAndCondition from "./app/pages/terms_and_condition/TermsAndCondition.jsx";
import ReturnAndRefund from "./app/pages/return_refund_policy/ReturnAndRefund.jsx";
import PrivacyPolicy from "./app/pages/privacy_policy/PrivacyPolicy.jsx";
import OrderConformationPage from "./app/pages/order_conformation_page/OrderConformationPage.jsx";
import "./App.css";
import BlogPage from "./app/pages/blog_grid_page/blog_grid_page.jsx";
import ShopPage from "./app/pages/shop_page/shop_page.jsx";
import AdminPage from "./app/pages/admin_page/adminPage.jsx";
import About from "./app/pages/about_page/about.jsx";
import Myaccount from "./app/pages/myaccount_page/myaccount.jsx";
import ExclusiveStore from "./app/pages/exclusivestore/exclusivestore.jsx";
import Cart from "./app/pages/cart_page/Cart.jsx";
import Checkout from "./app/pages/checkout_page/Checkout.jsx";
import Service_pop from "./app/components/service_pop/Service_pop.jsx";
import Services from "./app/pages/service_page/service.jsx";
import AdminProcessOrder from "./app/pages/admin-process-order/admin-process-order.jsx";
import CreateService from "./app/pages/createService/createService.js";
import UpdateService from "./app/pages/updateService/updateService.js";
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from "./app/pages/updateUser/updateUser.js";
import Invoice from "./app/pages/invoice/invoice.jsx";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = (userId) => {
    // getRequestWithAuth(`/api/user/${userId}`).then((res) => {
    //   const user = {
    //     username: res.username,
    //     email: res.email,
    //     token: res.token,
    //     userId: res._id,
    //     role: res.role
    //   };
    //   dispatch(getUserDetails(user));
    // });
  };

  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path="/auth/:id" element={<SignIn />} />
          <Route path="/" exact element={<DashBoard />} />
          <Route path="/createProduct" exact element={<CreateProduct />} />
          <Route path="/updateProduct/:id" exact element={<UpdateProduct />} />
          <Route path="/blog/composeBlog" exact element={<ComposeBlog />} />
          <Route path="/updateBlog/:id" exact element={<UpdateBlog />} />
          <Route path="/product/:id" exact element={<Product />} />
          <Route path="/singleBlog/:blogId" exact element={<SingleBlog />} />
          <Route path="/blog" exact element={<BlogPage />} />
          <Route
            path="/TermsAndCondition"
            exact
            element={<TermsAndCondition />}
          />
          <Route path="/shopPage" exact element={<ShopPage />} />
          <Route path="/ReturnAndRefund" exact element={<ReturnAndRefund />} />
          <Route path="/PrivacyPolicy" exact element={<PrivacyPolicy />} />

          <Route path="/adminPage" exact element={<AdminPage />} />

          <Route
            path="/OrderConfirmationPage/:id"
            exact
            element={<OrderConformationPage />}
          />
          <Route path="/invoice/:id" exact element={<Invoice />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/Cart" exact element={<Cart />} />
          <Route path="/myaccount/:id" exact element={<Myaccount />} />
          <Route path="/exclusivestore" exact element={<ExclusiveStore />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/updateUser/:id" exact element={<UpdateUser />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/createService" exact element={<CreateService />} />
          <Route path="/updateService/:id" exact element={<UpdateService />} />
          <Route path="/service_pop" exact element={<Service_pop />} />
          <Route path="/adminprocessorder/:id" exact element={<AdminProcessOrder />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
