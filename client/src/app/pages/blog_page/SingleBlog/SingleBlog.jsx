import React, { useState } from "react";
import "./SingleBlog.css";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="single-blog">
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
    </div>
  );
};

export default LoginSignup;
