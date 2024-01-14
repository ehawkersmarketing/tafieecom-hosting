import React, { useEffect } from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import DashBoard from './app/pages/home_page/dashboard.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getRequestWithAuth } from './app/utills/api_client.js';
import { getUserDetails } from "./store/user_slice.js";

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = (userId) => {
    getRequestWithAuth(`/api/user/${userId}`).then((res) => {
      const user = {
        username: res.username,
        email: res.email,
        token: res.token,
        userId: res._id,
        role: res.role
      };
      dispatch(getUserDetails(user));
    });
  }

  return (
    <div className="App">
      <Routers>
        <Routes>
          {/* <Route path="/auth/login" exact element={<SignInPage />} />
          <Route path="/auth/register" exact element={<RegisterPage />} /> */}
          <Route path='/viewCart' element={<ViewCart />} />
          <Route path="/" exact element={<DashBoard />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
