import React from "react";
import "./shop_page.css";
import Header from "./../header/header.jsx";
import CategoryCarousel from "./component/categoryCarousel/categoryCarousel.jsx";
import Carousal from "../../components/carousal/carousal.jsx";

const ShopPage = () => {
    return (
        <>
            <Header />
            <div className="shop-page-container">
                <div className="shop-page-card">
                </div>
                <div className="filter-region">
                    <div className="filter">
                        <i class="bi bi-grid"></i>
                        <span className="category-text">All Categories</span>
                        <span>|</span>
                        <i class="bi bi-funnel-fill"></i>
                        <span className="filter-text">Filters</span>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                    <div className="search-bar">
                        <input type="text" name="search" />
                        <div className="search-button">
                            <button className="search-icon">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-region">
                    <div className="best-seller-text">
                        <div className="tafi-product-text1">
                            <span>TAFI BEST</span>
                        </div>
                        <div className="tafi-product-text2">
                            <span>SELLERS</span>
                        </div>
                    </div>
                    <div className="side-nav">
                        <div className="previous-nav">
                            <i class="bi bi-arrow-left"></i>
                            <span className="previous-text">Previous</span>
                        </div>
                        <div className="next-nav">
                            <span className="next-text">Next</span>
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>

                    <div className="best-seller-product">
                        <Carousal />
                    </div>
                </div>
                <div className="product-category">
                    <div className="product-category-text">
                        <div className="tafi-product-text1">
                            <span>PRODUCT</span>
                        </div>
                        <div className="tafi-product-text2">
                            <span>CATEGORY</span>
                        </div>
                    </div>
                    <div className="category-carousel">
                        <div className="left-arrow">
                            <i class="bi bi-arrow-left"></i>
                        </div>
                        <CategoryCarousel />
                        <div className="right-arrow">
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div className="all-products">
                    <div className="side-nav">
                        <div className="next-nav">
                            <span className="next-text">Next</span>
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopPage;
