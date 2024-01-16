import react ,{useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import './createProduct.css'

const CreateProduct = () =>{

  const user =  JSON.parse(localStorage.getItem("user"));

    const [inputHandler, setInputHandler] = useState({title:'',
        description:'' , price:'' , image:'' , quantity:'', productType:''
      });

      const history = useNavigate() 
    
      const onChangeInputHandler = (e) => {
        const { name, value } = e.target; 
        setInputHandler(() => {
          return { ...inputHandler, [name]: value };
        });

      };

      // console.log(inputHandler)
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const { title , description ,image,price ,quantity, productType } = inputHandler;
        console.log(inputHandler)
        //  console.log(image)
        if (title === "") {
          alert("Add Title"); 
        } else if (description === "") {
          alert(" Add Description");
        } else if (quantity === "") {
            alert("Add Quantity");
          } else if (price === "") {
            alert("Price");
          } 
         else {
          const data = await fetch("http://localhost:8080/api/createProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              title , description ,image, price , quantity, productType  
            })
          });
   
          const res =await  data.json()
              console.log(res)
          if(res.status === 200){
            setInputHandler({...inputHandler , title:" ",image:" ", description:" " , price:'' , quantity:'', productType:'' })
                history('/')
          }
        }
      };

  return (
    <section>
        {  <div className="form_data">
          <div className="form_heading">
            <h1>Create Product</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>
            <div className="form_input">
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.description}
                id="description"
                name="description"
                placeholder="Description"
              />
            </div>
            <div className="form_input">
            <label for="productImage">Product Image</label>
        <input type="file" id="productImage" onChange={(e) =>{
          console.log(e.target.files);
          // setInputHandler({...inputHandler, ['image']:e.target.files[0] });
        }}
                 name="productImage" value={inputHandler.image} required />
</div>

            <div className="form_input">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.price}
                id="price"
                name="price"
                placeholder="Price"
              />
            </div>
            <div className="form_input">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.quantity}
                id="quantity"
                name="quantity"
                placeholder="quantity"
              />
            </div>
            <div className="form_input">
              <label htmlFor="productType">Product Type</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.productType}
                id="productType"
                name="productType"
                placeholder="productType"
              />
            </div>
            <button className="btn" onClick={onSubmitHandler}>
              Create Product
            </button>
          </form>
        </div>}
      </section>
  )
}

export default CreateProduct;