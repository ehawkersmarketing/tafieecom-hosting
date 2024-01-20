import React from "react";
import "./shop_page.css";
import Header from "./../header/header.jsx";
import CategoryCarousel from "./component/categoryCarousel/categoryCarousel.jsx";
import Carousal from "../../components/carousal/carousal.jsx";
import Product from "../product_page/product.jsx";
import PosterCardBackground from '../../assets/poster_card_background.svg';
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
        <div className="main-container">
            <div className="shop-page-container">
                <div className="shop-page-card">
                    <div className="poster-card-background">
                        <img src={PosterCardBackground} height={488} />
                    </div>
                    <div className="shop-page-card-content">
                        <div className="product-content">
                            <div className='text-fields'>
                                <h3 className='category-name'>Fertizers</h3>
                                <h1 className='product-name'>19:19:19 Water Soluble Fertilizer</h1>
                                <div className="ratingAndReview">
                                    <ul class="rating">
                                        <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                        <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                        <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                        <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                        <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                    </ul>
                                    <span className='review'>345 Reviews</span>
                                </div>
                                <div className="price">
                                    Rs.300/-
                                </div>
                                <button className='cart-btn'>Add to Cart</button>
                            </div>
                        </div>
                        <div className="view-more">
                            <div className="poster-text">
                                <span className="fertilizer-text">FERTILIZERS</span>
                                <span className="description-text">Nourish your soil for healthier crops. Our range of fertilizers and soil enhancers is designed to optimize growth and maximize yield.</span>
                            </div>
                            <div className="signin" >View More</div>
                        </div>
                    </div>
                    <div className="poster-card">
                        <img src="https://s3-alpha-sig.figma.com/img/51ee/8810/c7370a3ca7d5e268beefd3f56c658bb8?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a0sWLLS4BIoESzjos9J~HUT3X9t8QBJG9STIGP~hjC2ALfgUKF2oYPHWhAb2-lxvGo9gZZl9XLt371LLAB0xVYfa9tyJPQ0E6Q-BFZwzqEhnPpV1ryMVG4AxjblpF-LTVbEY~8B4p6zXItiZamQ070ZFdnV0-PR-hN51mKDftc5rKy6nULb3v9K-B5Tg3m0VTGBKt9TqjZDFjrxbX423hIHFI8chmzQujx1RWo9rSEobBx0DtwBAysTdTfE0tFkzpHHTlWF8EU0Z6W8urMLIxJYsk5yLTrKNP89Az02UsSfvT3jE~pyhoOoz4QR-vCFPJBjzDeMnylMcWhMcQXVRrg__" alt="" />
                    </div>
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
                        <div className="category-text">
                            <div className="tafi-product-text1">
                                <span>PRODUCT</span>
                            </div>
                            <div className="tafi-product-text2">
                                <span>CATEGORY</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-region">
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
                </div>
                <div className="all-products">
                    <div className="all-product-text">
                        <div className="product-all-text">
                            <div className="tafi-product-text1">
                                <span>All</span>
                            </div>
                            <div className="tafi-product-text2">
                                <span>PRODUCTS</span>
                            </div>
                        </div>
                    </div>
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
        </div>
    )
}

export default ShopPage;
