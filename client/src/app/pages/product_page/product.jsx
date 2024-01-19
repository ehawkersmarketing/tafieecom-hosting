import react from "react";
import "./product.css";
import ProductImage from "../../assets/fertilizers.png";
import Carousal from '../../components/carousal/carousal'
import Header from '../../pages/header/header'
import $ from "jquery"
const Product = () => {


    // const viewMoreHandler = ()=>{
        $(document).ready(function(){

      var list = $(".list li");
      var numToShow = 3;
      var button = $("#next");
      var numInList = list.length;
      list.hide();
      if (numInList > numToShow) {
        button.show();
      }
      list.slice(0, numToShow).show();

      button.click(function(){
          var showing = list.filter(':visible').length;
          list.slice(showing - 1, showing + numToShow).fadeIn();
          var nowShowing = list.filter(':visible').length;
          if (nowShowing >= numInList) {
            button.hide();
          }
      });

});
    
  return (
    <div className="single-product bg">
      <Header />
      <section className="product-bg">
        <div className="wrapper">
          <div className="container">
            <div className="inner-container">
              <div className="product-image">
                <img src={ProductImage} />
              </div>
              <card className="card card-design">
                <div className="inner-card">
                  <h3 className="category-name">Fertiizers</h3>
                  <h1 className="product-name">
                    19:19:19 Water Soluble Fertilizer
                  </h1>
                  <div className="ratingAndReview">
                    <ul class="rating">
                      <li>
                        <i class="bi bi-star-fill" id="review-icon"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill" id="review-icon"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill" id="review-icon"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill" id="review-icon"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill" id="review-icon"></i>
                      </li>
                    </ul>
                    <span className="review">345 Reviews</span>
                  </div>
                  <div className="price">Rs.300/-</div>
                  <div className="wishlistAndAddCart">
                    <button className="cart-btn">Add to Cart</button>
                    <div>
                      <span>
                        <i class="bi bi-heart-fill" id="wishlist-icon"></i>
                      </span>
                      <a href="/" className="wishlist">
                        Add to wishlist
                      </a>
                    </div>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </div>
        <div className="wrapper-about">
          <div className="about-product">
            <h1 className="about-title">About Product</h1>
            <div>
              <p className="description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="card-product-wrapper">
        <div className="carousel-card">
          <div className="single-carousel-card">
            <div className="card-carousel-title">
              <h2 className="recommended">Recommended</h2>
              <h2 className="foryou">For You</h2>
            </div>
            <div className="more-card">
              <span className="view-more">View More </span>
              <span className="more-icon">
                <i class="bi bi-arrow-right"></i>
              </span>
            </div>
            <div className="carousal">
              <Carousal />
            </div>
          </div>
        </div>
      </div>

      <div className="review-section ">
        <div className="review-card card">
          <div className="review-heading">
            <div className="review-main-title">
              <h1 className="review-title">Reviews</h1>
              <sup>
                <button className="review-btn">128</button>
              </sup>
            </div>
            <div className="ratingAndReview">
              <ul class="rating">
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="input-form">
            <div>
              <textarea
                type="message"
                className="input"
                placeholder="Hey! @name, it’s a very good design.🔥"
              />
            </div>
            <div>
              <button className="send">Send</button>
            </div>
          </div>
          <div className="review-description">
            <ul className="list">
              <li>
                {" "}
                <div className="user-review">
                  <div className="user-main-review">
                    <span className="user-icon">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <h3 className="personName">Person's Name</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates error velit aspernatur deleniti dolorum
                    reprehenderit! Tenetur doloribus aspernatur vel ullam?
                    Tempore eius accusamus placeat dolorum odio earum ab
                    repellendus tempora.
                  </p>
                </div>
              </li>
              <li>
                {" "}
                <div className="user-review">
                  <div className="user-main-review">
                    <span className="user-icon">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <h3 className="personName">Person's Name</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates error velit aspernatur deleniti dolorum
                    reprehenderit! Tenetur doloribus aspernatur vel ullam?
                    Tempore eius accusamus placeat dolorum odio earum ab
                    repellendus tempora.
                  </p>
                </div>
              </li>
              <li>
                {" "}
                <div className="user-review">
                  <div className="user-main-review">
                    <span className="user-icon">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <h3 className="personName">Person's Name</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates error velit aspernatur deleniti dolorum
                    reprehenderit! Tenetur doloribus aspernatur vel ullam?
                    Tempore eius accusamus placeat dolorum odio earum ab
                    repellendus tempora.
                  </p>
                </div>
              </li>
              <li>
                {" "}
                <div className="user-review">
                  <div className="user-main-review">
                    <span className="user-icon">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <h3 className="personName">Person's Name</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates error velit aspernatur deleniti dolorum
                    reprehenderit! Tenetur doloribus aspernatur vel ullam?
                    Tempore eius accusamus placeat dolorum odio earum ab
                    repellendus tempora.
                  </p>
                </div>
              </li>
              <li>
                {" "}
                <div className="user-review">
                  <div className="user-main-review">
                    <span className="user-icon">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <h3 className="personName">Person's Name</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates error velit aspernatur deleniti dolorum
                    reprehenderit! Tenetur doloribus aspernatur vel ullam?
                    Tempore eius accusamus placeat dolorum odio earum ab
                    repellendus tempora.
                  </p>
                </div>
              </li>
            </ul>
            <button className="load-more" id="next">
              Load More<i class="bi bi-chevron-down"></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
