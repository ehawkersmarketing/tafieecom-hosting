import React, { useEffect, useState } from "react";
import "./adminPage.css";
import logoImage from "../../assets/Tafi_logo_white.png";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useFetch } from "../../hooks/api_hook";
import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../header/header";
import GraphRevenue from "./components/graphRevenue";
const AdminPage = () => {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const auth = localStorage.getItem("auth_token");

  const { data: blogs, setData: setBlogs } = useFetch("/api/blogs");
  const { data: products } = useFetch("/api/allProducts");
  const { data: orders } = useFetch("/api/getAllOrders");
  const { data: graphData } = useFetch("/api/getAllGraph");
  const { data: services, setData: setServices } =
    useFetch("/api/getAllService");
  const { data: users } = useFetch("/auth/users");

  const [searchField, setSearchField] = useState({
    product: "",
    order: "",
    service: "",
    blogs: "",
    users: "",
  });
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [searchBlogs, setSearchBlog] = useState([]);
  const [searchService, setSearchService] = useState([]);
  const [searchUsers, setSearchUser] = useState([]);
  const [deletedBlogId, setDeletedBlogId] = useState(null);
  const options = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Revenue",
    },
    series: {
      1: { curveType: "function" },
    },
  };
  let processed,
    rejected,
    Approved,
    countApproved = 0,
    countRejected = 0,
    countProcessing = 0;
  let currentOrder,
    previousApprovedCount = 0,
    previousRejectedCount = 0,
    previousProcessingCount = 0;

  function diff_months(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  }

  useEffect(() => {
    graphData?.map((dataSet, index) => {
      currentOrder = new Date();
      let previousOrder = new Date(dataSet.timestamps);

      var diff = currentOrder.getMonth() - previousOrder.getMonth();

      if (diff_months(currentOrder, previousOrder) !== 0) {
        if (dataSet?.orderStatus === "PROCESSING") {
          previousProcessingCount = previousProcessingCount + 1;
        }
        if (dataSet?.orderStatus === "REJECTED") {
          previousRejectedCount = previousRejectedCount + 1;
        }
        if (dataSet?.orderStatus === "APPROVED") {
          previousApprovedCount = previousApprovedCount + 1;
        }
      }

      if (diff_months(currentOrder, previousOrder) === 0) {
        if (dataSet?.orderStatus === "PROCESSING") {
          countProcessing = countProcessing + 1;
        }
        if (dataSet?.orderStatus === "REJECTED") {
          countRejected = countRejected + 1;
        }
        if (dataSet?.orderStatus === "APPROVED") {
          countApproved = countApproved + 1;
        }
      }
    });
    setDiffData({
      old: [
        ["Name", "orderStatus"],
        ["approved", previousApprovedCount],
        ["rejected", previousRejectedCount],
        ["processing", previousProcessingCount],
      ],
      new: [
        ["Name", "orderStatus"],
        ["approved", countApproved],
        ["rejected", countRejected],
        ["processing", countProcessing],
      ],
    });
  }, [graphData]);

  const [diffdata, setDiffData] = useState({ old: [], new: [] });

  const dashboardHandler = () => {
    setValue(1);
  };
  const storeHandler = () => setValue(0);
  const productHandler = () => setValue(3);
  const blogHandler = () => setValue(4);
  const userHandler = () => setValue(2);
  const serviceHandler = () => setValue(5);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [previousMonothRevenue, setPreviousMonthRevenue] = useState(0);

  useEffect(() => {
    if (orders) {
      let total = 0;
      let previousRevenue = 0;
      for (let i = 0; i < orders?.length; i++) {
        if (diff_months(new Date(), new Date(orders[i].timestamps)) === 0) {
          total = orders[i]?.amount;
        } else if (
          diff_months(new Date(), new Date(orders[i].timestamps)) === 1
        ) {
          previousRevenue += orders[i].amount;
        }
      }
      setCurrentRevenue(total);
      setPreviousMonthRevenue(previousRevenue);
    }
  }, [orders]);

  useEffect(() => {
    if (user) {
      if (user.role.role === "Admin") {
        setValue(1);
      } else if (user.role.role === "Editor") {
        setValue(3);
      } else if (user.role.role === "User") {
        navigate(`/myaccount/${user?._id}`);
      } else {
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  function deleteResourceHandler(id) {
    try {
      fetch(`https://backend.twicks.in/api/deleteBlog/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Blog deleted!!") {
            fetchDeleted();
          }
        });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      deleteResourceHandler(id);
    }
  }

  const fetchDeleted = async () => {
    const { data } = await axios.get(`https://backend.twicks.in/api/blogs`);
    setBlogs(data.data);
  };

  const deleteServiceHandler = (id) => {
    // console.log("id", id);
    fetch(`https://backend.twicks.in/api/deleteService/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "service deleted!!") {
          fetchDeletedService();
        }
      });
  };

  function onDeleteService(id) {
    if (window.confirm("Are you sure you want to delete this Service?")) {
      deleteServiceHandler(id);
    }
  }

  const fetchDeletedService = async () => {
    const { data } = await axios.get(`https://backend.twicks.in/api/getAllService`);
    // console.log(data);
    setServices(data.data);
  };

  const search = async (text) => {
    if (text !== "") {
      if (value === 3) {
        const { data } = await axios.post(
          `https://backend.twicks.in/api/searchProduct`,
          {
            search: text,
          }
        );
        setSearchProducts(data.data);
      } else if (value === 4) {
        const { data } = await axios.post(
          `https://backend.twicks.in/api/searchBlog`,
          {
            search: text,
          }
        );
        setSearchBlog(data.data);
      } else if (value === 5) {
        const { data } = await axios.post(
          `https://backend.twicks.in/api/searchService`,
          {
            search: text,
          }
        );
        setSearchService(data.data);
      } else if (value == 2) {
        const { data } = await axios.post(
          `https://backend.twicks.in/auth/searchUser`,
          {
            search: text,
          }
        );
        setSearchUser(data.data);
      }
    } else {
      setSearchProducts(undefined);
      setSearchOrders(undefined);
      setSearchBlog(undefined);
      setSearchUser(undefined);
      setSearchService(undefined);
    }
  };

  useEffect(() => {
    setSearchField({
      product: "",
      order: "",
      blogs: "",
      users: "",
      service: "",
    });
  }, [value]);

  const handleSearchFields = (e) => {
    e.preventDefault();
    setSearchField({
      ...searchField,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (value === 3) {
      search(searchField.product);
    } else if (value === 4) {
      search(searchField.blogs);
    } else if (value === 2) {
      search(searchField.users);
    } else if (value === 5) {
      search(searchField.service);
    }
  }, [searchField]);

  const onLogOut = () => {
    localStorage.clear();
    navigate(`/auth/login`);
  };

  const CreateNewHandler = () => {
    navigate("/createProduct");
  };

  const CreateNewBlogHandler = () => {
    navigate("/blog/composeBlog");
  };

  const CreateNewServiceHandler = () => {
    navigate("/createService");
  };

  const inlineStyle = {
    "--size": 0.4,
    fontSize: "var(--size)rem",
  };
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filter: "",
  });

  const applyFilter = (e, index) => {
    if (index === 2) {
      setActiveFilter({ filter: e.target.value });
      setOpen(false);
    }
  };

  const getInitialStatus = (id) => {
    const savedStatus = localStorage.getItem(`selectedOrderStatus-${id}`);
    return savedStatus ? savedStatus : "";
  };

  // Initialize the state as an object to store statuses for each order
  const [orderStatuses, setOrderStatuses] = useState({});

  // When the component mounts, check local storage for each order's status
  useEffect(() => {
    // Assuming `orders` is an array of order IDs that you have
    if (orders) {
      orders.forEach((order) => {
        const savedStatus = getInitialStatus(order._id);
        if (savedStatus) {
          setOrderStatuses((prevStatuses) => ({
            ...prevStatuses,
            [order._id]: savedStatus,
          }));
        }
      });
    }
  }, [orders]); // Depend on `orders` to re-run the effect when it changes

  const handlechangeOrderStatus = (e, id) => {
    const newOrderStatus = e.target.value;
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newOrderStatus,
    }));
    localStorage.setItem(`selectedOrderStatus-${id}`, newOrderStatus);
    // console.log(newOrderStatus);
    orderStatusHandler(id, newOrderStatus);
  };

  const orderStatusHandler = (id, orderStatus) => {
    // console.log(orderStatus);
    axios
      .patch(`https://backend.twicks.in/api/updateOrder/${id}`, {
        length: 1,
        orderStatus: orderStatus,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [shippingOrders, setShippingOrders] = useState([]);
  const fetchOrderDetails = async (order_id) => {
    try {
      // Include order_id as a query parameter in the URL
      const response = await axios.get(
        `http://localhost:8080/api/ship/orderDets?order_id=${order_id}`
      );
      console.log(response);
      if (response.data.success) {
        console.log(response.data);
        setShippingOrders(response.data.data.status);
        console.log(response.data.data.status);
      } else {
        console.error("No order found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails("500462489");
  }, []);

  return (
    <div className="admin-wrapper">
      <Header />
      {user && (
        <div className="row row-wrapper">
          <div className="col-md-3 admin-sub-wrapper navbar navbar-expand-md   bg-body-tertiary">
            <button
              class="d-flex d-md-none justify-content-around w-100 sticky navbar-toggler mt-2 align-item-center"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <p className="mb-0">View Admin Menu</p>
              <i class="bi bi-chevron-down"></i>
            </button>
            <div
              className="div-admin collapse  w-100 navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="w-100">
                <div className="admin-logo-section">
                  <div className="top-div"></div>
                  <div className="logo">
                    <div className="image">
                      <img
                        src={logoImage}
                        className="img-logo"
                        alt="tafi-logo"
                      />
                    </div>
                  </div>
                </div>
                <div className="sidebar">
                  {user.role.role === "Admin" && (
                    <div>
                      <div
                        className="sidebar-title active-link-admin"
                        onClick={dashboardHandler}
                      >
                        <div className="icon">
                          <i class="bi bi-bar-chart-fill"></i>
                        </div>
                        <div className="title">Dashboard</div>
                      </div>
                    </div>
                  )}

                  {user.role.role === "Admin" && (
                    <div>
                      <div className="sidebar-title" onClick={storeHandler}>
                        <div className="icon">
                          <i class="bi bi-shop"></i>
                        </div>
                        <div className="title">All Orders</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="sidebar-title" onClick={blogHandler}>
                      <div className="icon">
                        <i class="bi bi-layout-text-window-reverse"></i>
                      </div>
                      <div className="title">Blogs</div>
                    </div>
                  </div>

                  <div>
                    <div className="sidebar-title" onClick={productHandler}>
                      <div className="icon">
                        <i class="bi bi-box"></i>
                      </div>
                      <div className="title">Products</div>
                    </div>
                  </div>

                  <div>
                    <div className="sidebar-title" onClick={serviceHandler}>
                      <div className="icon">
                        <i class="bi bi-box"></i>
                      </div>
                      <div className="title">Services</div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="h3-titlfe">ACCOUNT PAGES</div>
                    </div>
                  </div>

                  {user.role.role === "Admin" && (
                    <div>
                      <div className="sidebar-title " onClick={userHandler}>
                        <div className="icon">
                          <i class="bi bi-person-circle"></i>
                        </div>
                        <div className="title">User</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="sidebar-title" onClick={onLogOut}>
                      <div className="icon">
                        <i class="bi bi-person"></i>
                      </div>
                      <div className="title">Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 admin-suber-wrapper">
            {value == 0 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="admin-header-nav">
                      <div className="tab">
                        <span className="tab1">Pages</span>
                        <span>/Orders</span>
                        <div className="nav-title">All Orders</div>
                      </div>

                      <div className="nav-rightContent">
                        <div className="admin-right" onClick={onLogOut}>
                          <div className="logout-button lg-admin-button">
                            <span style={{ marginLeft: "15px" }}>
                              <i class="bi bi-person"></i>
                            </span>
                            <span>Logout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 1 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="admin-header-nav">
                      <div className="tab">
                        <span className="tab1">Pages</span>
                        <span>/Dashboard</span>
                        <div className="nav-title">Dashboard</div>
                      </div>

                      <div className="nav-rightContent">
                        <div className="admin-right">
                          <div
                            className="logout-button lg-admin-button"
                            onClick={onLogOut}
                          >
                            <span style={{ marginLeft: "15px" }}>
                              <i class="bi bi-person"></i>
                            </span>
                            <span>Logout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 2 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="admin-header-nav">
                      <div className="tab">
                        <span className="tab1">Pages</span>
                        <span>/User</span>
                        <div className="nav-title">Users</div>
                      </div>

                      <div className="nav-rightContent">
                        <div className="admin-right">
                          <div
                            className="logout-button lg-admin-button"
                            onClick={onLogOut}
                          >
                            <span style={{ marginLeft: "15px" }}>
                              <i class="bi bi-person"></i>
                            </span>
                            <span>Logout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 3 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="tab">
                      <span className="tab1">Pages</span>
                      <span>/Products</span>
                    </div>
                    <div className="nav-title">Products</div>
                    <div className="nav-rightContent">
                      <button
                        className="admin-btn-nav"
                        onClick={CreateNewHandler}
                      >
                        <i class="bi bi-plus-lg"></i> Create New
                      </button>
                      <div className="admin-right">
                        <div className="logout-button" onClick={onLogOut}>
                          <span style={{ marginLeft: "15px" }}>
                            <i class="bi bi-person"></i>
                          </span>
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 5 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="tab">
                      <span className="tab1">Pages</span>
                      <span>/Services</span>
                    </div>
                    <div className="nav-title">Services</div>
                    <div className="nav-rightContent">
                      <button
                        className="admin-btn-nav"
                        onClick={CreateNewServiceHandler}
                      >
                        <i class="bi bi-plus-lg"></i> Create New
                      </button>
                      <div className="admin-right">
                        <div className="logout-button" onClick={onLogOut}>
                          <span style={{ marginLeft: "15px" }}>
                            <i class="bi bi-person"></i>
                          </span>
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 4 && (
              <nav className="nav-admin-page">
                <div className="admin-navbar">
                  <div className="nav-header">
                    <div className="tab">
                      <span className="tab1">Pages</span>
                      <span>/Blogs</span>
                    </div>
                    <div className="nav-title">Blogs</div>
                    <div className="nav-rightContent">
                      <button
                        className="admin-btn-nav"
                        onClick={CreateNewBlogHandler}
                      >
                        <i class="bi bi-plus-lg"></i> Create New
                      </button>
                      <div className="admin-right">
                        <div className="logout-button" onClick={onLogOut}>
                          <span style={{ marginLeft: "15px" }}>
                            <i class="bi bi-person"></i>
                          </span>
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}

            {value == 0 && (
              <div className="card admin-table-card">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Orders</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Active Orders</h3>
                      <div className="admin-input-dropdown">
                        {/* <input
                          type="text"
                          className="nav-input"
                          style={{ width: "15rem" }}
                          placeholder="Search"
                        /> */}
                        <div className="short">
                          <select
                            type="text"
                            name="input"
                            id="filterDropdown"
                            placeholder="Short by:Newest "
                            onChange={(e) => applyFilter(e, 2)}
                            value={activeFilter.filter}
                          >
                            <option value=""> Filter By : Delievery </option>
                            <option value="By Self">By Self</option>
                            <option value="By ShipRocket">By ShipRocket</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table head-table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            OrderId
                          </th>
                          <th scope="col" className="th">
                            Price
                          </th>
                          <th
                            scope="col"
                            className="th"
                            data-category="By Self"
                          >
                            Status
                          </th>
                          <th scope="col" className="th">
                            Delivery Option
                          </th>
                          <th scope="col" className="th">
                            No of Orders
                          </th>
                          <th scope="col" className="th">
                            Order On
                          </th>
                          <th scope="col" className="th">
                            Process Order
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders
                          .filter((order) => {
                            // If no filter is selected, show all orders
                            if (activeFilter.filter === "") return true;
                            // If a filter is selected, only show orders that match the filter
                            return order.status === activeFilter.filter;
                          })
                          .map((order, index) => {
                            return (
                              <tr key={order._id}>
                                <th scope="row table-center">{index + 1}</th>
                                <td className="td table-center">{order._id}</td>
                                <td className="td table-center">
                                  {order.amount}
                                </td>

                                <td className="td table-center">
                                  {order.orderStatus === "COMPLETED" ? (
                                    <div>{shippingOrders}</div> 
                                  ) : (
                                    <div>{order.orderStatus}</div> 
                                  )}
                                 
                                </td>

                                <td className="td table-center">
                                  {order.status}
                                </td>
                                <td className="td table-center">10</td>
                                <td className="td table-center">
                                  {`${dayjs(order.createdAt).format(
                                    "MMMM D, YYYY"
                                  )}`}
                                </td>
                                <td className="td table-center">
                                  <Link to={`/adminprocessorder/${order._id}`}>
                                    <i
                                      class="bi bi-check2-square"
                                      style={{
                                        fontSize: "2rem",
                                        textAlign: "center",
                                        textDecoration: "none",
                                      }}
                                    ></i>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {value == 1 && (
              <div className=" card admin-table-card dashboardCard">
                <div className="admin-dashboard-card subHeading row">
                  <div className="admin-dashboard-graph-cart card col-md-6">
                    <Chart
                      chartType="ColumnChart"
                      width="100%"
                      height="180px"
                      diffdata={diffdata}
                    />
                    <div className="order-bar">
                      <div className="order-dashboard-bar-heading">
                        <h4
                          style={{
                            color: "#2D3748",
                            fontSize: "13px",
                            marginBottom: "0px",
                            marginTop: "15px",
                            fontWeight: "700",
                          }}
                        >
                          TOTAL ORDERS
                        </h4>
                        <div className="order-bar-ccontent">
                          <span
                            style={{
                              color: "#48BB78",
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            (+23)
                          </span>
                          <span>than last week</span>
                        </div>
                      </div>
                      <div className="dash-desc-content row">
                        <div className="no-of-order col-md-4 col-4">
                          <div className="order-dash-title">
                            <span className="order-bar-icon">
                              <i class="bi bi-cart"></i>
                            </span>
                            <span className="dash-order-no">No. of Orders</span>
                          </div>
                          <div className="dash-number">{orders?.length}</div>
                          <span className="progress-bar"></span>
                        </div>
                        <div className="no-of-order col-md-4 col-4">
                          <div className="order-dash-title">
                            <span className="order-bar-icon">
                              <i class="bi bi-rocket-takeoff-fill"></i>
                            </span>
                            <span className="dash-order-no">Processed</span>
                          </div>
                          <div className="dash-number">
                            {
                              orders?.filter(
                                (item) => item.orderStatus === "PROCESSING"
                              )?.length
                            }
                          </div>
                          <span className="progress-bar"></span>
                        </div>
                        <div className="no-of-order col-md-4 col-4">
                          <div className="order-dash-title">
                            <span className="order-bar-icon">
                              <i class="bi bi-check"></i>
                            </span>
                            <span className="dash-order-no">Completed</span>
                          </div>
                          <div className="dash-number">
                            {
                              orders?.filter(
                                (item) => item.orderStatus === "APPROVED"
                              )?.length
                            }
                          </div>
                          <span className="progress-bar"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product-requirement col-md-6">
                    <div className="product-dashboard-heading">
                      <h4
                        style={{
                          color: "#2D3748",
                          fontSize: "20px",
                          marginBottom: "0px",
                        }}
                      >
                        Product requirement over the months
                      </h4>
                      <div className="product-bar-ccontent">
                        <span style={{ color: "#48BB78", fontSize: "18px" }}>
                          (+5) more
                        </span>
                        <span> in 2024</span>
                      </div>
                    </div>
                    <GraphRevenue />
                  </div>
                </div>
                <div className="orders-dash-card-format row">
                  <div className="order-analysis-card order-color-revenue col-md-6">
                    <div className="analysis">
                      <h2 className="order-analysis-title">Orders Analysis</h2>

                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span class>No. of Orders</span>
                          <span>{orders?.length}</span>
                        </div>
                      </div>
                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span>Orders Processed</span>
                          <span>
                            {
                              orders?.filter(
                                (item) => item.orderStatus === "PROCESSING"
                              )?.length
                            }
                          </span>
                        </div>
                      </div>
                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span>Orders Completed</span>
                          <span>
                            {
                              orders?.filter(
                                (item) => item.orderStatus === "APPROVED"
                              )?.length
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-analysis-card order-color-analysis col-md-6">
                    <div className="analysis">
                      <h2 className="order-analysis-title">
                        Revenue Generated
                      </h2>

                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span class>This Month</span>
                          <span>{currentRevenue}</span>
                        </div>
                      </div>
                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span>Previous Month</span>
                          <span>{previousMonothRevenue}</span>
                        </div>
                      </div>
                      <div className="dash-order-analysis">
                        <div className="admin-dash-order">
                          <span>Orders Completed</span>
                          <span>
                            {
                              orders?.filter(
                                (item) => item.orderStatus === "APPROVED"
                              )?.length
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {value == 2 && (
              <div className="card admin-blog-card">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Users</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Users</h3>
                      <div className="admin-input-dropdown">
                        <input
                          type="text"
                          className="nav-input"
                          name="users"
                          onChange={(e) => handleSearchFields(e)}
                          style={{ width: "15rem" }}
                          placeholder="Search"
                        />
                        {/* <div className="short">
                          <select
                            type="text"
                            name="input"
                            id="input"
                            placeholder="Short by:Newest "
                          >
                            <option>Short by : Newest</option>
                            <option>yes</option>
                          </select>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            User Name
                          </th>
                          <th scope="col" className="th">
                            Role
                          </th>
                          <th scope="col" className="th">
                            Phone Number
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchField.users !== "" ? (
                          searchUsers && searchUsers.length > 0 ? (
                            searchUsers.map((user, index) => {
                              return (
                                <tr>
                                  <th scope="row table-center">{index + 1}</th>
                                  <td className="td table-center">
                                    {user.userName}
                                  </td>
                                  <td className="td table-center">
                                    {user.role.role}
                                  </td>
                                  <td className="td table-center">
                                    {user.phone}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div>
                              <h4>No Results Found</h4>
                            </div>
                          )
                        ) : (
                          users &&
                          users.map((user, index) => {
                            return (
                              <tr>
                                <th scope="row table-center">{index + 1}</th>
                                <td className="td table-center">
                                  {user.userName}
                                </td>
                                <td className="td table-center">
                                  {user.role.role}
                                </td>
                                <td className="td table-center">
                                  {user.phone}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {value == 3 && (
              <div className="card admin-product-card">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Products</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Products</h3>
                      <div className="admin-input-dropdown">
                        <input
                          type="text"
                          name="product"
                          className="nav-input"
                          onChange={(e) => handleSearchFields(e)}
                          style={{ width: "15rem" }}
                          placeholder=" Search"
                        />
                        {/* <div className="short">
                          <select
                            type="text"
                            name="input"
                            id="input"
                            placeholder="Short by:Newest "
                          >
                            <option>Short by : Newest</option>
                            <option>yes</option>
                          </select>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table head-table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            Featured Image
                          </th>
                          <th scope="col" className="th">
                            Product Name
                          </th>
                          <th scope="col" className="th">
                            Price
                          </th>
                          <th scope="col" className="th">
                            Category
                          </th>
                          <th scope="col" className="th">
                            Order count
                          </th>
                          <th scope="col" className="th">
                            Last Order On
                          </th>
                          <th scope="col" className="th">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchField.product !== "" ? (
                          searchProducts && searchProducts.length > 0 ? (
                            searchProducts.map((product, index) => {
                              return (
                                <tr>
                                  <th scope="row table-center">{index + 1}</th>
                                  <td className="td">
                                    <img
                                      src={product.image}
                                      className="img-product-admin-data"
                                    />
                                  </td>
                                  <td className="td table-center">
                                    {product.title}
                                  </td>
                                  <td className="td table-center">
                                    {product.price}
                                  </td>
                                  <td className="td table-center">
                                    {product?.category?.category}
                                  </td>
                                  <td className="td table-center">
                                    {product.quantity}
                                  </td>
                                  <td className="td table-center">
                                    {product &&
                                      `${dayjs(product.createdAt).format(
                                        "MMMM D, YYYY"
                                      )}`}
                                  </td>
                                  <td className="td table-center">
                                    <span className="td-edit-icon ">
                                      <i
                                        class="bi bi-pencil-square"
                                        onClick={(e) =>
                                          navigate(
                                            `/updateProduct/${product._id}`
                                          )
                                        }
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div>
                              <h4>No Results Found</h4>
                            </div>
                          )
                        ) : (
                          products &&
                          products.map((product, index) => {
                            return (
                              <tr>
                                <th scope="row table-center">{index + 1}</th>
                                <td className="td">
                                  <img
                                    src={product.image}
                                    className="img-product-admin-data"
                                  />
                                </td>
                                <td className="td table-center">
                                  {product.title}
                                </td>
                                <td className="td table-center">
                                  {product.price}
                                </td>
                                <td className="td table-center">
                                  {product?.category?.category}
                                </td>
                                {/* <td className="td table-center">{product.gstSlab}%</td> */}
                                <td className="td table-center">
                                  {product.quantity}
                                </td>
                                <td className="td table-center">
                                  {product &&
                                    `${dayjs(product.createdAt).format(
                                      "MMMM D, YYYY"
                                    )}`}
                                </td>
                                <td className="td table-center">
                                  <span className="td-edit-icon ">
                                    <i
                                      class="bi bi-pencil-square"
                                      onClick={(e) =>
                                        navigate(
                                          `/updateProduct/${product._id}`
                                        )
                                      }
                                    ></i>
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {value == 4 && (
              <div className="card admin-blog-card">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Blogs</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Blogs</h3>
                      <div className="admin-input-dropdown">
                        <input
                          type="text"
                          className="nav-input"
                          name="blogs"
                          onChange={(e) => handleSearchFields(e)}
                          style={{ width: "15rem" }}
                          placeholder="Search"
                        />
                        {/* <div className="short">
                          <select
                            type="text"
                            name="input"
                            id="input"
                            placeholder="Short by:Newest "
                          >
                            <option>Short by : Newest</option>
                            <option>yes</option>
                          </select>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table head-table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            Featured Image
                          </th>
                          <th scope="col" className="th">
                            Blog Title
                          </th>
                          <th scope="col" className="th">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchField.blogs !== "" ? (
                          searchBlogs && searchBlogs.length > 0 ? (
                            searchBlogs?.map((blog, index) => {
                              return (
                                <tr>
                                  <th scope="row table-center">{index + 1}</th>
                                  <td className="td">
                                    <img
                                      src={blog.image}
                                      className="featured-img-admin-blog"
                                    />
                                  </td>
                                  <td className="td table-center">
                                    {blog.title}
                                  </td>
                                  <td className="td icon-section table-center">
                                    <span className="td-edit-icon ">
                                      <i
                                        class="bi bi-pencil-square"
                                        onClick={(e) =>
                                          navigate(`/updateBlog/${blog._id}`)
                                        }
                                      ></i>
                                    </span>
                                    <span className="td-delete-icon">
                                      <i
                                        class="bi bi-trash3-fill"
                                        onClick={(e) => onDelete(e, blog._id)}
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div>
                              <h4>No Results Found</h4>
                            </div>
                          )
                        ) : (
                          blogs &&
                          blogs?.map((blog, index) => {
                            if (blog._id === deletedBlogId) {
                              // console.log(blog.title);
                              return null;
                            } else
                              return (
                                <tr>
                                  <th scope="row table-center">{index + 1}</th>
                                  <td className="td ">
                                    <img
                                      src={blog.image}
                                      className="featured-img-admin-blog"
                                    />
                                  </td>
                                  <td className="td table-center">
                                    {blog.title}
                                  </td>
                                  <td className="td icon-section table-center">
                                    <span className="td-edit-icon ">
                                      <i
                                        class="bi bi-pencil-square"
                                        onClick={(e) =>
                                          navigate(`/updateBlog/${blog._id}`)
                                        }
                                      ></i>
                                    </span>
                                    <span className="td-delete-icon">
                                      <i
                                        class="bi bi-trash3-fill"
                                        onClick={() => onDelete(blog._id)}
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {value == 5 && (
              <div className="card admin-product-card">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Services</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Services</h3>
                      <div className="admin-input-dropdown">
                        <input
                          type="text"
                          name="service"
                          className="nav-input"
                          onChange={(e) => handleSearchFields(e)}
                          style={{ width: "15rem" }}
                          placeholder="Search"
                        />
                        {/* <div className="short">
                          <select
                            type="text"
                            name="input"
                            id="input"
                            placeholder="Short by:Newest "
                          >
                            <option>Short by : Newest</option>
                            <option>yes</option>
                          </select>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table head-table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            Image
                          </th>
                          <th scope="col" className="th">
                            Title
                          </th>
                          <th scope="col" className="th">
                            Description
                          </th>
                          <th scope="col" className="th ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchField.service !== "" ? (
                          searchService && searchService.length > 0 ? (
                            searchService.map((service, index) => {
                              return (
                                <tr>
                                  <th scope="row table-center">{index + 1}</th>
                                  <td className="td">
                                    <img
                                      src={service.image}
                                      className="img-product-admin-data"
                                    />
                                  </td>
                                  <td className="td table-center">
                                    {service.title}
                                  </td>
                                  <td className="td table-center">
                                    {service.description.substring(0, 40)}
                                  </td>

                                  <td className="td table-center ">
                                    <span className="td-edit-icon ">
                                      <i
                                        class="bi bi-pencil-square"
                                        // onClick={(e) =>
                                        // navigate(`/updateService/${service._id}`)
                                        // }
                                      ></i>
                                    </span>
                                    <span className="td-delete-icon">
                                      <i
                                        class="bi bi-trash3-fill"
                                        // onClick={(e) => onDelete(e, service._id)}
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div>
                              <h4>No Results Found</h4>
                            </div>
                          )
                        ) : (
                          services &&
                          services.map((service, index) => {
                            // console.log(service._id);
                            return (
                              <tr>
                                <th scope="row table-center">{index + 1}</th>
                                <td className="td">
                                  <img
                                    src={service.image}
                                    className="img-product-admin-data"
                                  />
                                </td>
                                <td className="td table-center">
                                  {service.title}
                                </td>
                                <td className="td table-center">
                                  {service.description.substring(0, 40)}
                                </td>
                                <td className="td table-center icon-section actions">
                                  <span className="td-edit-icon ">
                                    <i
                                      class="bi bi-pencil-square"
                                      onClick={(e) =>
                                        navigate(
                                          `/updateService/${service._id}`
                                        )
                                      }
                                    ></i>
                                  </span>
                                  <span className="td-delete-icon">
                                    <i
                                      class="bi bi-trash3-fill"
                                      onClick={(e) =>
                                        onDeleteService(service._id)
                                      }
                                    ></i>
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
