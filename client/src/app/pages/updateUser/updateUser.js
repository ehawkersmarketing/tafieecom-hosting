import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    userName: "",
    phone: "",
    email:"",
    DOB:"" ,
    location:""
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      if (user.role.role !== "User" ) {
        history("/auth/login");
      } else {
      history(`/updateUser/${id}`);
      }
    }else {
      history("/auth/login");
    }
  }, []);

  const getOneUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/auth/user/${id}`)
      setInputHandler({
        userName: data.data[0].userName,
        phone: data.data[0].phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);
  useEffect(() => {
    axios.put(`http://localhost:8080/auth/updateUser/${id}`)
      .then((res) => {
        console.log(res.data.data)
        setInputHandler({
          ...inputHandler,
         userName: res.data.data.userName,
          phone: res.data.data.phone,     
        });
      })
      .catch((err) => {
        console.log(err);
      });
      axios.put(`http://localhost:8080/api/updateUserAddress/${id}`)
      .then((res) => {
        console.log(res)
        setInputHandler({
          ...inputHandler,
         location: res.data.data.city    
        });
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const backToDashboard = () =>{
    history(`/myaccount/${id}`)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
      axios
      .put(`http://localhost:8080/auth/updateUser/${id}`, {
        userName: inputHandler.userName,
        phone: inputHandler.phone,
      })
      .then((res) => {
        console.log(res.data);
        history(`/myaccount/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
      axios.put(`http://localhost:8080/api/updateUserAddress/${id}`, {
        city: inputHandler.location,
      })
      .then((res) => {
        console.log(res.data);
        // history(`/myaccount/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });

    }
  

  return (
    <section>
      <div className="form_data">
      <div className="cross" onClick={backToDashboard}>
           <i class="bi bi-file-x-fill"></i>
            </div>
        <div className="form_heading">
          <h1>Update User</h1>
        </div>

        <form>
          <div className="form_input">
            <label htmlFor="title">User Name</label>
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="userName"
              name="userName"
              value={inputHandler.userName}
              placeholder="userName"
            />
          </div>
          <div className="form_input">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="phone"
              name="phone"
              value={inputHandler.phone}
              placeholder="phone"
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={onChangeInputHandler}
              id="email"
              name="email"
              value={inputHandler.email}
              placeholder="Email ..."
            />
          </div>
          <div className="form_input">
            <label htmlFor="phone">Location</label>
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="location"
              name="location"
              value={inputHandler.location}
              placeholder="Location..."
            />
          </div>
         
          <button className="btn" onClick={onSubmitHandler}>
            update User
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateUser;
