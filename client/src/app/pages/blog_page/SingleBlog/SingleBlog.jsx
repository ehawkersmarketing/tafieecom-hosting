// import React, { useState } from "react";
import "./SingleBlog.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import { Link } from "react-router-dom";
import resourcepage1 from "../../../assets/resourcecenter1.png";
import blogpage_img from "../../../assets/blogpage_head.jpeg";

const LoginSignup = () => {
  // const [action, setAction] = useState("Sign Up");

  return (
    <div>
      <Header />
      <div className="single_blog">
        <div className="single_blog_tile row">
          <div className="tile-circle"></div>
          <div className="tile_title col-5">
            <div className="title_text">
              <div>
                <h1>Title of blog</h1>
              </div>
              <div>
                <p>Jan 16,2024 - 10 min read</p>
              </div>
            </div>
          </div>
          <div className="tile_image col-7">
            <div
              className="blogpage_img"
              style={{ backgroundImage: `url(${blogpage_img})` }}
            ></div>
          </div>
        </div>
        <div className="single_blog_below_tile row">
          <div className="single_blog_content col-9">
            <div className="single_blog_content_title">
              <div>
                <button type="button" class="btn btn-circle">
                  <i class="bi bi-arrow-left-circle-fill"></i>
                </button>
              </div>
              <div>
                <h1>Title of the Blog</h1>
              </div>
            </div>
            <div className="single_blog_content_below_title row">
              <div className="single_blog_content_keywords col-8 row">
                <span className="col">
                  <Link>Agriculture</Link>
                </span>
                <span className="col">
                  <Link>Agriculture</Link>
                </span>
                <span className="col">
                  <Link>Agriculture</Link>
                </span>
                <span className="col">
                  <Link>Agriculture</Link>
                </span>
                <span className="col">
                  <Link>Agriculture</Link>
                </span>
              </div>
              
            </div>
            <div className="single_blog_content_description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                assumenda facilis laudantium quaerat autem nulla distinctio
                dolores est magnam iure, illo fuga velit? Laborum illo tempora,
                deleniti veritatis dolorum perferendis? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Eligendi laboriosam fugit,
                impedit beatae laudantium ullam dolorum cum dolor obcaecati
                officiis distinctio ipsum tempore non repellendus corrupti et
                quas harum fuga. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Omnis totam et corrupti sapiente numquam
                exercitationem cupiditate. Tempora vero recusandae dolore
                eligendi dolor, temporibus at deserunt cupiditate sunt maiores
                dolorum alias. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatum veritatis necessitatibus maxime
                laboriosam aliquam ex iusto modi eligendi veniam expedita,
                consequuntur molestias deserunt eum reprehenderit, voluptate
                nobis, eaque doloremque quae.
              </p>
            </div>
          </div>
          <div className="single_blog_relatedpost col-3">
            <div>
              <h4>Related Posts</h4>
            </div>
            <div className="relatedpost_line">
              <div className="below_relatedpost"></div>
              <div className="below_relatedpost_1"></div>
            </div>
            <div className="relatedpost_card d-flex">
              <div class="card">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <p class="blogcard_color">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
              <div class="card">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <p class="blogcard_color">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
              <div class="card">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>

                  <p class="blogcard_color">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

{
  /* <div className="single-blog">
      <div className="header-tile m-3">
        <div className="blog-title">
          <div className="title-of-blog">
            <h4>
              <span>Happy Reading</span>
            </h4>
            <h2>
              <span>TITLE OF THE BLOG</span>
            </h2>
            <p>Date</p>
          </div>
        </div>
        <div className="blog-image">
          <div>
            <img
              src="https://images.pexels.com/photos/3066025/pexels-photo-3066025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="blog-body row">
        <div className="col-8">
          <div className="blog-meta"></div>
          <div className="blog-content">
            <h5>TITLE</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod,
              quia, iure error nobis ipsa illum, officiis cum dolor natus odio
              debitis culpa architecto nemo. Iste dolore provident omnis
              voluptatem at.
            </p>
          </div>
        </div>

        <div className="blog-body row">
        <div className="comment-container col-8">
          <div className="blog-meta"></div>
          <div className="blog-comment-head">
            <span>
            <h5>Comments</h5>
            <div className="comment-button">
              <button>Share</button>
              <button>Like</button>
            </div>
            </span>
          </div>
          <div className="blog-content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quod, quia, iure error nobis ipsa illum, officiis cum
                      dolor natus odio debitis culpa architecto nemo. Iste
                      dolore provident omnis voluptatem at.
                    </p>
                    <button className="comment-button">Send</button>
                  </div>
                  <div className="blog-comment-p">
                    <span><img src="" />
                    <h6>Person's Name</h6></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quod, quia, iure error nobis ipsa illum, officiis cum
                      dolor natus odio debitis culpa architecto nemo. Iste
                      dolore provident omnis voluptatem at.
                    </p>
                  </div>
                  <div className="learmore">
                    <button>Learn More</button>
                  </div>
        </div>




        
        <div className="col-4">
          <h6>Related Post</h6>
          <div className="divider"></div>
          <div className="related-post">
            <div className="related-card">
              <div className="blog-card-image">
                <img src="https://images.pexels.com/photos/3066025/pexels-photo-3066025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <div className="card-title">
                <h6>Title of blog</h6>
              </div>
              <div className="short-desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisici</p>
              </div>
              <div className="read-more">
                <a href="">
                  <span>Read more</span>
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="contact-form">
          <div className="tellus"></div>
          <div className="form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Email/Mobile No.</label>
                <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                <label>I'm looking for...</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <div className="form-group">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div> */
}
