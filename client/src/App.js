import React, { useEffect } from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import DashBoard from './app/pages/home_page/dashboard.jsx';
import { useDispatch } from "react-redux";
import SignIn from './app/pages/auth/sign_in/sign_in.jsx';
import SignUp from './app/pages/auth/sign_up/sign_up.jsx';
import CreateProduct from './app/pages/create_product/createProduct.js'
import ComposeBlog from './app/pages/blog_page/CreateBlog/createBlog.js'
import UpdateBlog from "./app/pages/blog_page/UpdateBlog/updateBlog.js";
import ResourceCenter from "./app/pages/resourceCenter/resourceCenter.js";
import SingleBlog from "./app/pages/blog_page/SingleBlog/SingleBlog.jsx";
import Header from "./app/pages/header/header.jsx";
import Footer from "./app/pages/footer/footer.jsx";
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
  }

  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path="/auth/login" exact element={<SignIn />} />
          <Route path="/auth/register" exact element={<SignUp />} />
          <Route path="/" exact element={<DashBoard />} />
          <Route path="/createProduct" exact element={<CreateProduct />} />
          <Route path="/blog/composeBlog" exact element={<ComposeBlog />} />
          <Route path="/updateBlog/:id" exact element={<UpdateBlog />} />
          <Route path="/resourceCenter" exact element={<ResourceCenter />} />
          <Route path="/singleBlog" exact element={<SingleBlog />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
