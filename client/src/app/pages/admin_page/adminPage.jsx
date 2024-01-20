import react, { useState } from "react";
import "./adminPage.css";
import logoImage from "../../assets/Tafi_logo_white.png";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const dashboardHandler = () => setValue(1);
  const storeHandler = () => setValue(0);
  const productHandler = () => setValue(3);
  const blogHandler = () => setValue(4);
  const userHandler = () => setValue(2);

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
          <nav className="nav-admin-page">
            <div className="admin-navbar">
              <div className="nav-header">
                <div className="tab">
                  <span className="tab1">Pages</span>
                  <span>/Store</span>
                </div>
                <div className="nav-title">Store</div>
                <div className="nav-rightContent">
                  <div className="nav-btn">
                    <div className="btn-text">
                      <span className="plus-icon">
                        <i class="bi bi-plus-lg"></i>
                      </span>

                      <span>Create New</span>
                    </div>
                  </div>
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
                          Category
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
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
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
                        <td className="td table-center">
                          <img src="/image.com" />
                        </td>
                        <td className="td table-center">Name of Order</td>
                        <td className="td table-center">199</td>
                        <td className="td table-center">Fertilizers</td>
                        <td className="td table-center">10</td>
                        <td className="td table-center">17/01/2024</td>
                        <td className="td table-center">
                          <span className="td-edit-icon">
                            <i class="bi bi-pencil-square"></i>
                          </span>
                          <span className="td-delete-icon">
                            <i class="bi bi-trash3-fill"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3.</th>
                        <td className="td">
                          <img src="/image.com" />
                        </td>
                        <td className="td">Name of Order</td>
                        <td className="td">199</td>
                        <td className="td">Fertilizers</td>
                        <td className="td">10</td>
                        <td className="td">17/01/2024</td>
                        <td className="td">
                          <span className="td-edit-icon">
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

          {value == 1 && (
            <div className=" card admin-table-card dashboardCard">
              <div className="admin-dashboard-card subHeading row">
                <div className="admin-dashboard-graph-cart card col-6">
                  <div id="column-example-3">
                    <table class="charts-css column multiple hide-data data-spacing-3">
                      <caption> Column Example #3 </caption>
                      <tbody>
                        <tr> </tr>
                        <tr>
                          <td style={inlineStyle}>
                            <span class="data"> $ 20K </span>
                          </td>
                          <td style={inlineStyle}>
                            <span class="data"> $ 40K </span>
                          </td>
                          <td style={inlineStyle}>
                            <span class="data"> $ 60K </span>
                          </td>
                          <td style={inlineStyle}>
                            <span class="data"> $ 80K </span>
                          </td>
                          <td style={inlineStyle}>
                            <span class="data"> $ 100K </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="product-requirement col-6">
                  <div className="product-dashboard-heading">
                    <h4>Product requirement over the months</h4>
                    <div className="product-bar-ccontent">
                      <span>(+5) more</span>
                      <span>in 2024</span>
                    </div>
                  </div>

                  <div className="order-bar">
                    <div className="order-dashboard-bar-heading">
                      <h2>TOTAL ORDERS</h2>
                      <div className="order-bar-ccontent">
                        <span>(+23) </span>
                        <span>than last week</span>
                      </div>
                    </div>
                    <div className="dash-desc-content">
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon"></span>
                          <span className="dash-order-no">No. of Orders</span>
                        </div>
                        <div className="dash-number">150</div>
                        <span className="progress-bar">-------</span>
                      </div>
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon"></span>
                          <span className="dash-order-no">Processed</span>
                        </div>
                        <div className="dash-number">142</div>
                        <span className="progress-bar">-------</span>
                      </div>
                      <div className="no-of-order">
                        <div className="order-dash-title">
                          <span className="order-bar-icon"></span>
                          <span className="dash-order-no">Completed</span>
                        </div>
                        <div className="dash-number">132</div>
                        <span className="progress-bar">-------</span>
                      </div>
                    </div>
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
            <div className="col-3  card productCard">
              <div className="admin-product-card">
                <div className="admin-product-card-header">
                  <h1>Product-Page</h1>
                </div>
              </div>
            </div>
          )}
          {value == 4 && (
            <div className="col-3  card dashboardCard">
              <div className="admin-dashboard-card">
                <div className="admin-dashboard-card-header">
                  <h1>Blog page</h1>
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
