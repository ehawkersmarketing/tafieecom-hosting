import "./SingleBlog.css";
import { useState ,useEffect } from "react";
import { Link, useParams  } from "react-router-dom";
import resourcepage1 from "../../../assets/resourcecenter1.png";
import blogpage_img from "../../../assets/blogpage_head.jpeg";
import { useFetch } from "../../../hooks/api_hook";
import dayjs from "dayjs";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import { useNavigate } from "react-router-dom";
const SingleBlog = () => {
  const { blogId } = useParams();

  const { data: blog } = useFetch(`/api/blog/${blogId}`);
  const { data: blogs } = useFetch("/api/blogs");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch order data from the backend

    const fetchBlog = async () => {
      try {        
          const response = await fetch("http://localhost:8080/api/blog/" + blogId);
          
          if (response) {
            const data = await response.json();
           if(data.success === false){
            navigate(`/blog`)

          }else if(data.success === true){
            if(data.data.user._id === user?._id){
              
            }else {
              
              // navigate(`/blog`);
            }
          } 
           
                   
          } else {
            throw new Error('Order not found');
          }
        
        }catch (error) {
          setError(error.message);
        }
      }
        
    fetchBlog(); 
    
  }, [blogId]);



  const backHandler = () => {
    navigate("/blog");
  };
  const scrollToTop = () => {
    document.getElementById("head").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <div className="single_blog">
        <div className="single_blog_tile row">
          <div className="tile-circle"></div>
          <div className="tile_title col-md-5 col-12 ">
            <div className="title_text">
              <div>
                <h1>{blog && blog.title.substring(0,30)}..</h1>
              </div>
              <div>
                <p>
                  {blog && `${dayjs(blog.createdAt).format("MMMM D, YYYY")}`}
                </p>
              </div>
            </div>
          </div>
          <div className="tile_image col-md-7">
            <div
              className="blogpage_img"
              style={{ backgroundImage: `url(${blog?.image})` }}
            ></div>
          </div>
        </div>
        <div className="single_blog_below_tile row">
          <div className="single_blog_content col-md-9">
            <div className="single_blog_content_title">
              <div>
                <button
                  type="button"
                  class="btn btn-circle back-button"
                  onClick={backHandler}
                >
                  <i class="bi bi-arrow-left-circle-fill"></i>
                </button>
              </div>
              <div>
                <h1>{blog && blog.title}</h1>
              </div>
            </div>
            <div className="single_blog_content_below_title row">
              <div className="single_blog_content_keywords">
                {blog &&
                  blog.tags.map((tag, index) => {
                    return (
                      <span className="keyword" key={index}>
                        <Link>{tag}</Link>
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="single_blog_content_description">
              <p>{blog && blog.content}</p>
            </div>
          </div>
          <div className="single_blog_relatedpost col-md-3">
            <div>
              <h4>Related Posts</h4>
            </div>
            <div className="relatedpost_line">
              <div className="below_relatedpost"></div>
              <div className="below_relatedpost_1"></div>
            </div>
            <div className="relatedpost_card d-flex">
              {blogs &&
                blogs.slice(0,2).map((item) => {
                  return (
                    <div class="card" key={item._id}>
                      <img src={item.image} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{item.title}</h5>
                        <p class="card-text">
                          {item.content.substring(0, 70)}....
                        </p>
                        <p class="blogcard_color">{`${dayjs(
                          item.createdAt
                        ).format("MMMM D, YYYY")}`}</p>
                        <Link
                          to={`/singleBlog/${item._id}`}
                          onClick={scrollToTop}
                          class="btn btn-read"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;
