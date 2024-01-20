import react from "react";
import "./adminPage.css";
import logoImage from "../../assets/Tafi_logo_white.png";
const AdminPage = () => {
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
                  <div className="title">Dashboard</div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-shop"></i>
                  </div>
                  <div className="title">Store</div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-layout-text-window-reverse"></i>
                  </div>
                  <div className="title">Blogs</div>
                </div>
              </div>

              <div>
                <div className="sidebar-title">
                  <div className="icon">
                    <i class="bi bi-box"></i>
                  </div>
                  <div className="title">Products</div>
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
                  <div className="title">User</div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
