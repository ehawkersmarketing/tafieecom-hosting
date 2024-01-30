import React, { useEffect, useState } from "react";
import "./shop_page.css";
import Footer from "../footer/footer.jsx";
import Header from "./../header/header.jsx";
import CategoryCarousel from "./component/categoryCarousel/categoryCarousel.jsx";
import CarousalCard from "../../components/carousal/carousal.jsx";
import ProductCard from "../../components/productCard/productCard.jsx";
import { useFetch } from "../../hooks/api_hook.js";
import ShopPageCarouselCard from "./component/shop_card_carousal/shop_card_carousal.jsx";
import axios from "axios";
import AllCategoryComponent from "../../components/allcategory/allcategory.jsx";
import { toast, ToastContainer } from 'react-toastify';

const ShopPage = () => {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filter: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const [searchField, setSearchField] = useState("");
  const filter = ["Price: High To Low", "Price: Low To High"];
  const { data: products, setData: setProducts } = useFetch("/api/allProducts");
  const [searchProducts, setSearchProducts] = useState([]);

  const search = async (text) => {
    if (text !== "") {
      try {
        const { data } = await axios.post(
          `http://localhost:8080/api/searchProduct`,
          {
            search: text,
          }
        );
        setSearchProducts(data.data);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } else {
      setSearchProducts(undefined);
      setActiveFilter({ ['filter']: '' });
    }
  };

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  const { data: categories } = useFetch("/api/allCategory");

  const applyFilter = (e, index) => {
    if (index == 2) {
      if (e.target.value === 'select the Category') {
        setSearchField('');
        setActiveFilter({ [e.target.name]: '' });
      } else {
        setSearchField(e.target.value);
        setActiveFilter({ [e.target.name]: e.target.value });
      }
      setOpen(!open);
    } else {
      if (index == 0) {
        setProducts(
          products.sort(function (a, b) {
            return b.price - a.price;
          })
        );
        setActiveFilter({ ['filter']: `` });
      } else {
        setProducts(
          products.sort(function (a, b) {
            return a.price - b.price;
          })
        );
        setActiveFilter({ ['filter']: `` });
      }
      setOpen(!open);
    }
  };

  return (
    <div className="main-container">

      <Header />
      <div className="shop-page-container">
        {
          products && <ShopPageCarouselCard cart={cart} items={products} />
        }
        <div className="filter-region">
          <div className="filter" onClick={(e) => setOpen(!open)}>
            <i class="bi bi-funnel-fill" ></i>
            <span className="filter-text">Filters</span>
            <i class="bi bi-caret-down-fill"></i>
          </div>
          <div className="search-bar">
            <input type="text" name="search" onChange={(e) => setSearchField(e.target.value)} className="search_container" />
            <div className="search-button">
              <button className="search-icon">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        {open && <div className="bg-white w-2 shadow-lg absolute -left-14 top-24  fiter-name">
          <ul className="">
            {
              filter.map((item, index) => {
                return (
                  <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100" key={index} onClick={(e) => applyFilter(e, index)}>
                    <span className="">{item}</span>
                  </li>
                )
              })
            }
            <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
              <select
                onChange={(e) => applyFilter(e, 2)}
                value={activeFilter.filter}
                name="filter"
                style={{
                  width: "20rem",
                  height: "2rem",
                  marginBottom: "1rem",
                }}
              >
                <option>select the Category</option>

                {categories?.map((item) => (
                  <option key={item._id} name="category" value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>}
        {
          (activeFilter.filter !== '' || searchField !== '') &&
          <div className="blog-latest-post">
            <div>
              <h4>Search Posts</h4>
            </div>
            <div className="below-line">
              <div className="below-post"></div>
              <div className="below-post-1"></div>
            </div>
            <div className="latest-post-card row">
              {
                searchProducts && searchProducts.length !== 0 ? searchProducts?.map((item, index) => {
                  return <ProductCard item={item} cart={cart} key={index} className='productItem' />
                }) : <div><h4>No Results Found</h4></div>
              }
            </div>
          </div>
        }
        <div className="product-region">
          <div className="best-seller-text">
            <div className="tafi-product-text1">
              <span>TAFI BEST</span>
            </div>
            <div className="tafi-product-text2">
              <span>SELLERS</span>
            </div>
          </div>
          <div className="best-seller-product">
            {products && <CarousalCard items={products} cart={cart} />}
          </div>
        </div>
        <div className="categoryDiv ">
          <div className="product-category">
            <div className="product-category-text">
              <div className="category-text">
                <div className="tafi-product-text1">
                  <span>Product</span>
                </div>
                <div className="tafi-product-text2">
                  <span>Categories</span>
                </div>
              </div>
            </div>
            <div className="category-region">
              <div className="category-carousel">
                {categories && <CategoryCarousel items={categories} />}
              </div>
            </div>
          </div>
        </div>
        <div className="all-products">
          {searchField === '' && <div className="all-product-text">
            <div className="product-all-text">
              <div className="tafi-product-text1">
                <span>All</span>
              </div>
              <div className="tafi-product-text2">
                <span>PRODUCTS</span>
              </div>
            </div>
          </div>}
          <div className="all-products-card row">
            {(activeFilter.filter === '' && searchField === '') && products && products?.map((item, index) => {
              return (
                <ProductCard item={item} key={index} cart={cart} className='productItem' />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div >
  )
}

export default ShopPage;
