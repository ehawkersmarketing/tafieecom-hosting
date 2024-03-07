import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PosterCardBackground from "../../../../assets/poster_card_background.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const ShopPageCarouselCard = ({ cart, items }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const onCartTap = async (id, inCart) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      if (inCart) {
        navigate(`/Cart`);
      } else if (localStorage.getItem("user_id")) {
        await axios.put("https://backend.twicks.in/api/addToCart", {
          productId: id,
          userId: localStorage.getItem("user_id"),
          units: 1,
        });
        navigate(`/Cart`);
      } else {
        toast.error("Please login to add this item to your cart", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <div>
        <OwlCarousel
          items={1}
          className="owl-theme"
          loop
          dots={false}
          autoplayTimeout={20000000}
          autoplayHoverPause={true}
          navText={[
            '<span class="arrow prev">‹</span>',
            '<span class="arrow next">›</span>',
          ]}
          autoplay={true}
        >
          {items?.map((item, index) => {
            const inCart = cart?.products.find((product) => {
              return product?.productId?._id === item._id;
            });
            return (
              <div className="shop-page-card">
                {/*                              <div className="poster-card-background">
                                 <img src={PosterCardBackground} height={500} />
                             </div> */}
                <div className="shop-page-card-content row">
                  <div className="view-more col-md-6">
                    <div className="poster-text">
                      <span
                        className="fertilizer-text"
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {item.category.category}
                      </span>
                      <span className="description-text">
                        {item.description}
                      </span>
                      <div
                        className="signin"
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        View More
                      </div>
                    </div>
                  </div>
                  <div className="product-content col-md-6">
                    <div className="text-fields d-flex">
                      <div className="">
                        <h3 className="category-name">
                          {item.category.category}
                        </h3>
                        <h1 className="product-name">{item.title}</h1>
                        <div className="ratingAndReview">
                          <ul class="rating">
                            {Array.apply(null, { length: 5 }).map((e, i) => (
                              <li>
                                <i
                                  class={
                                    i >= item?.rating
                                      ? `bi bi-star`
                                      : `bi bi-star-fill`
                                  }
                                  id="review-icon"
                                ></i>
                              </li>
                            ))}
                          </ul>
                          <span className="review">{item.reviews} Reviews</span>
                        </div>
                        <div className="price">Rs.{item.price}/-</div>
                        {user?.role.role === "Admin" ? (
                          <button
                            className="cart-btn"
                            onClick={(e) =>  toast.error(`Please login with Non-Admin or Editor Account`, {
                              position: "bottom-right",
                              autoClose: 8000,
                              pauseOnHover: true,
                              draggable: true,
                              theme: "dark",
                            })}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            className="cart-btn"
                            onClick={(e) => onCartTap(item._id, inCart)}
                          >
                            {inCart ? "View Cart" : "Add to Cart"}
                          </button>
                        )}
                      </div>
                      <div className="poster-card col-12">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default ShopPageCarouselCard;
