import React from "react";
import "./shop_page.css";
import Header from "./../header/header.jsx";
import CategoryCarousel from "./component/categoryCarousel/categoryCarousel.jsx";
import Carousal from "../../components/carousal/carousal.jsx";
import Product from "../product_page/product.jsx";
import ProductCard from "../../components/productCard/productCard.jsx";

const ShopPage = () => {
    const data = [
        {
            id: 1,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 3,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 3',
            description: 'Description 3'
        },
        {
            id: 4,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 4',
            description: 'Description 4'
        },
        {
            id: 5,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 4',
            description: 'Description 4'
        },
        {
            id: 6,
            image: "https://s3-alpha-sig.figma.com/img/8f04/1fca/89b70573eafb2d6ca522ece2df1f9080?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dmiv4psr20yBq~kaxBHnqrdlzuTdKnIvkHOvjswchZeQsH7t4YMCotZyA33N0pY3OWm5AJHLF2lSGATAeyJxYomS~VHsU5TqMragSn1YzWiCNC-47LIRatPGlkonH6IW7RE~0GqNp8L0mHNYHaAOU4MXTqN7nQrOQbiDAxIEJyzN8Q6nmSgwgskkiZ1EBONE3-HTXykDIMR8fw4Q5R3gRzZLW9eUbId1rRRYyqHh4rLGuhBkuO0rppBEOwurz6fJoXSWZgT0wJbw1wIlDMFOLYJ26TF82FNp9mmr5H3dFC-7Fozth9hVGqXaAHsQmJbezlwBtxUJnAFiTkFfu44Tmw__",
            title: 'Title 4',
            description: 'Description 4'
        },
    ]
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
                    <div className="all-products-card">
                        {data?.map((item) => {
                            return (
                                <ProductCard item={item} className='productItem' />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopPage;
