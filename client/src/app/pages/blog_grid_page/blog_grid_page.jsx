import "./blog_grid_page.css";
import { Link } from "react-router-dom";
import resourcepage1 from "../../assets/resourcecenter1.png";

const BlogPage = () => {
  
  return (
    <div>
      <div className="blogpage">
        <div className="blog-tile">
          <div className="blog-grid-page row">
            <div className="tile-circle"></div>
            <div className="tile_title col-5">
              <div className="title-text">
                <div>
                  <h3>Welcome to</h3>
                </div>
                <div className="tafi-resource">
                  <h1><span>TAFI RESOURCE</span></h1>
                </div>
                <div className="center">
                  <h1><span>CENTER</span></h1>
                </div>
              </div>
            </div>
            <div className="tile_image col-7"></div>
          </div>
        </div>
        <div className="below-blog-tile-header">
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
        </div>
        <div className="blog-latest-post">
          <div>
            <h4>Latest Posts</h4>
          </div>
          <div className="below-line">
            <div className="below-post"></div>
            <div className="below-post-1"></div>
          </div>
          <div className="latest-post-card row">
            <div className="card-main col-md-4">
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
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
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
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
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
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-most-viewed">
          <div className="blog-most-viewed-text">
            <div className="most-viewed">
              <h2>
                <span>Most Viewed</span> by the people
              </h2>
            </div>
          </div>
          <div className="most-viewed-cards">
            <div className="most-viewed-post-card row">
              <div className="card-main col-md-4">
                <div class="card">
                  <img src={resourcepage1} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">
                      Title can be one liner or consists of multiple lines!
                    </h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                    <a href="#" class="btn btn-read">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-main col-md-4">
                <div class="card">
                  <img src={resourcepage1} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">
                      Title can be one liner or consists of multiple lines!
                    </h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                    <a href="#" class="btn btn-read">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-main col-md-4">
                <div class="card">
                  <img src={resourcepage1} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">
                      Title can be one liner or consists of multiple lines!
                    </h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                    <a href="#" class="btn btn-read">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-all-post">
          <div>
            <h4>All Posts</h4>
          </div>
          <div className="below-line">
            <div className="below-post"></div>
            <div className="below-post-1"></div>
          </div>
          <div className="all-post-card row ">
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="card-main col-md-4">
              <div class="card ">
                <img src={resourcepage1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                    Title can be one liner or consists of multiple lines!
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p class="blog-date">Jan 15, 2024 - 5 min read</p>
                  <a href="#" class="btn btn-read">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="view-more">
            <button class="btn btn-read " id="show-more">
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
