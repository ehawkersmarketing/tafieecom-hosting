import react, { useState } from "react";
import "./adminPage.css";
import logoImage from "../../assets/Tafi_logo_white.png";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";

const AdminPage = () => {
  const data = [
    ["x", "dogs", "cats"],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ];
  const options = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Popularity",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  const dataOld = [
    ["Name", "Popularity"],
    ["Cesar", 250],
    ["Rachel", 4200],
    ["Patrick", 2900],
    ["Eric", 8200],
  ];

  const dataNew = [
    ["Name", "Popularity"],
    ["Cesar", 370],
    ["Rachel", 600],
    ["Patrick", 700],
    ["Eric", 1500],
  ];

  const diffdata = {
    old: dataOld,
    new: dataNew,
  };

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const dashboardHandler = () => setValue(1);
  const storeHandler = () => setValue(0);
  const productHandler = () => setValue(3);
  const blogHandler = () => setValue(4);
  const userHandler = () => setValue(2);

  const CreateNewHandler = () => {
    navigate("/createProduct");
  };

  const inlineStyle = {
    "--size": 0.4,
    fontSize: "var(--size)rem",
  };

  return (
    <div className="admin-wrapper">
      <div className="row row-wrapper">
        <div className="col-3 admin-sub-wrapper">
          <div className="div-admin">
            <div>
              <div className="top-div"></div>
              <div className="logo">
                <div className="image">
                  <img src={logoImage} className="img-logo" alt="tafi-logo" />
                </div>
              </div>
            </div>
            <div className="sidebar">
              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-bar-chart-fill"></i>
                  </div>
                  <div className="title" onClick={dashboardHandler}>
                    Dashboard
                  </div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-shop"></i>
                  </div>
                  <div className="title" onClick={storeHandler}>
                    Store
                  </div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-layout-text-window-reverse"></i>
                  </div>
                  <div className="title" onClick={blogHandler}>
                    Blogs
                  </div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-box"></i>
                  </div>
                  <div className="title" onClick={productHandler}>
                    Products
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className="h3-title">ACCOUNT PAGES</div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-person-circle"></i>
                  </div>
                  <div className="title" onClick={userHandler}>
                    User
                  </div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-person"></i>
                  </div>
                  <div className="title">Logout</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-9 admin-suber-wrapper">
          {value == 0 && (
            <nav className="nav-admin-page">
              <div className="admin-navbar">
                <div className="nav-header">
                  <div className="tab">
                    <span className="tab1">Pages</span>
                    <span>/Store</span>
                  </div>
                  <div className="nav-title">Store</div>
                  <div className="nav-rightContent">
                    <button
                      className="admin-btn-nav"
                      // onClick={CreateNewHandler}
                    >
                      <i class="bi bi-plus-lg"></i> Create New
                    </button>
                    <div className="admin-right">
                      <input
                        type="text"
                        className="nav-input"
                        placeholder="&#61442; Search"
                      />
                      <div className="logout-button">
                        <span style={{ marginLeft: "15px" }}>
                          <i class="bi bi-person"></i>
                        </span>
                        <span>Logout</span>
                        <span style={{ marginLeft: "5px" }}>
                          <i class="bi bi-gear-fill"></i>
                        </span>
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
                  <div className="tab">
                    <span className="tab1">Pages</span>
                    <span>/Dashboard</span>
                  </div>
                  <div className="nav-title">Dashboard</div>
                  <div className="nav-rightContent">
                    <button
                      className="admin-btn-nav"
                      // onClick={CreateNewHandler}
                    >
                      <i class="bi bi-plus-lg"></i> Create New
                    </button>
                    <div className="admin-right">
                      <input
                        type="text"
                        className="nav-input"
                        placeholder="&#61442; Search"
                      />
                      <div className="logout-button">
                        <span style={{ marginLeft: "15px" }}>
                          <i class="bi bi-person"></i>
                        </span>
                        <span>Logout</span>
                        <span style={{ marginLeft: "5px" }}>
                          <i class="bi bi-gear-fill"></i>
                        </span>
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
                  <div className="tab">
                    <span className="tab1">Pages</span>
                    <span>/User</span>
                  </div>
                  <div className="nav-title">User</div>
                  <div className="nav-rightContent">
                    <button
                      className="admin-btn-nav"
                      // onClick={CreateNewHandler}
                    >
                      <i class="bi bi-plus-lg"></i> Create New
                    </button>
                    <div className="admin-right">
                      <input
                        type="text"
                        className="nav-input"
                        placeholder="&#61442; Search"
                      />
                      <div className="logout-button">
                        <span style={{ marginLeft: "15px" }}>
                          <i class="bi bi-person"></i>
                        </span>
                        <span>Logout</span>
                        <span style={{ marginLeft: "5px" }}>
                          <i class="bi bi-gear-fill"></i>
                        </span>
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
                      <input
                        type="text"
                        className="nav-input"
                        placeholder="&#61442; Search"
                      />
                      <div className="logout-button">
                        <span style={{ marginLeft: "15px" }}>
                          <i class="bi bi-person"></i>
                        </span>
                        <span>Logout</span>
                        <span style={{ marginLeft: "5px" }}>
                          <i class="bi bi-gear-fill"></i>
                        </span>
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
                      // onClick={CreateNewHandler}
                    >
                      <i class="bi bi-plus-lg"></i> Create New
                    </button>
                    <div className="admin-right">
                      <input
                        type="text"
                        className="nav-input"
                        placeholder="&#61442; Search"
                      />
                      <div className="logout-button">
                        <span style={{ marginLeft: "15px" }}>
                          <i class="bi bi-person"></i>
                        </span>
                        <span>Logout</span>
                        <span style={{ marginLeft: "5px" }}>
                          <i class="bi bi-gear-fill"></i>
                        </span>
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
                      <input
                        type="text"
                        className="nav-input"
                        style={{ width: "15rem" }}
                        placeholder="&#61442; Search"
                      />
                      <div className="short">
                        <select
                          type="text"
                          name="input"
                          id="input"
                          placeholder="Short by:Newest "
                        >
                          <option>Short by : Newest</option>
                          <option>yes</option>
                        </select>
                      </div>
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
                          Featured Image
                        </th>
                        <th scope="col" className="th">
                          Name
                        </th>
                        <th scope="col" className="th">
                          Price
                        </th>
                        <th scope="col" className="th">
                          Status
                        </th>
                        <th scope="col" className="th">
                          No of Orders
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
                      <tr>
                        <th scope="row table-center">1.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Order</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Rejected</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <div className="action-dropdown">
                            <select
                              type="text"
                              name="input"
                              id="input"
                              placeholder="Short by:Newest "
                            >
                              <option>op1</option>
                              <option>op2</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">2.</th>
                        <td className="td table-center">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Order</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Approved</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <div className="action-dropdown">
                            <select
                              type="text"
                              name="input"
                              id="input"
                              placeholder="Short by:Newest "
                            >
                              <option>op1</option>
                              <option>op2</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">3.</th>
                        <td className="td table-center">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Order</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Approved</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <div className="action-dropdown">
                            <select
                              type="text"
                              name="input"
                              id="input"
                              placeholder="Short by:Newest "
                            >
                              <option>op1</option>
                              <option>op2</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {value == 1 && (
            <div className=" card admin-table-card dashboardCard">
              <div className="admin-dashboard-card subHeading row">
                <div className="admin-dashboard-graph-cart card col-6">
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
                    <div className="dash-desc-content">
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon">
                            <i class="bi bi-cart"></i>
                          </span>
                          <span className="dash-order-no">No. of Orders</span>
                        </div>
                        <div className="dash-number">150</div>
                        <span className="progress-bar"></span>
                      </div>
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon">
                            <i class="bi bi-rocket-takeoff-fill"></i>
                          </span>
                          <span className="dash-order-no">Processed</span>
                        </div>
                        <div className="dash-number">142</div>
                        <span className="progress-bar"></span>
                      </div>
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon">
                            <i class="bi bi-check"></i>
                          </span>
                          <span className="dash-order-no">Completed</span>
                        </div>
                        <div className="dash-number">132</div>
                        <span className="progress-bar"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-requirement col-6">
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
                  <div style={{ marginTop: "0px" }}>
                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="200px"
                      data={data}
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className="orders-dash-card-format">
                <div className="order-analysis-card order-color-revenue">
                  <div className="analysis">
                    <h2 className="order-analysis-title">ORDERS Analysis</h2>

                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span class>No. of Orders</span>
                        <span>150</span>
                      </div>
                    </div>
                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span>Orders Processed</span>
                        <span>142</span>
                      </div>
                    </div>
                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span>Orders Completed</span>
                        <span>132</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-analysis-card order-color-analysis">
                  <div className="analysis">
                    <h2 className="order-analysis-title">Revenue Generated</h2>

                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span class>This Month</span>
                        <span>15,000</span>
                      </div>
                    </div>
                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span>Previous Month</span>
                        <span>11,000</span>
                      </div>
                    </div>
                    <div className="dash-order-analysis">
                      <div className="admin-dash-order">
                        <span>Orders Completed</span>
                        <span>132</span>
                      </div>
                    </div>
                  </div>
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
                        className="nav-input"
                        style={{ width: "15rem" }}
                        placeholder="&#61442; Search"
                      />
                      <div className="short">
                        <select
                          type="text"
                          name="input"
                          id="input"
                          placeholder="Short by:Newest "
                        >
                          <option>Short by : Newest</option>
                          <option>yes</option>
                        </select>
                      </div>
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
                          Tax slab
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
                      <tr>
                        <th scope="row table-center">1.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Product</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">5%</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <span className="td-edit-icon ">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">2.</th>
                        <td className="td table-center">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Product</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">5%</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <span className="td-edit-icon">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">3.</th>
                        <td className="td table-center">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Product</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">5%</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <span className="td-edit-icon">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                        </td>
                      </tr>
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
                        style={{ width: "15rem" }}
                        placeholder="&#61442; Search"
                      />
                      <div className="short">
                        <select
                          type="text"
                          name="input"
                          id="input"
                          placeholder="Short by:Newest "
                        >
                          <option>Short by : Newest</option>
                          <option>yes</option>
                        </select>
                      </div>
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
                          Featured Image
                        </th>
                        <th scope="col" className="th">
                          Blog Title
                        </th>
                        <th scope="col" className="th">
                          Category
                        </th>
                        <th scope="col" className="th">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row table-center">1.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Blog</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">
                          <span className="td-edit-icon ">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                          <span className="td-delete-icon">
                            <i class="bi bi-trash3-fill"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">2.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Blog</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">
                          <span className="td-edit-icon ">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                          <span className="td-delete-icon">
                            <i class="bi bi-trash3-fill"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row table-center">3.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Blog</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">
                          <span className="td-edit-icon ">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                          <span className="td-delete-icon">
                            <i class="bi bi-trash3-fill"></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {value == 2 && (
            <div className="col-3  card dashboardCard">
              <div className="admin-dashboard-card">
                <div className="admin-dashboard-card-header">
                  <h1>User page</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
