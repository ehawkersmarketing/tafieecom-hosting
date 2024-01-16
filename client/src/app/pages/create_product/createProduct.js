import react ,{useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import './createProduct.css'

const CreateProduct = () =>{

  const user =  JSON.parse(localStorage.getItem("user"));
  
  const [value ,setValue] = useState(1)
  const [maxValue , setMaxValue] = useState(8)

  const[image , setImage] = useState('')
    const [inputHandler, setInputHandler] = useState({title:'',
        description:'' , price:'' ,maxQuantity:maxValue , minQuantity:value , quantity:'', productType:''
      });


      const history = useNavigate() 
    
      const onChangeInputHandler = (e) => {
        const { name, value } = e.target;   
         if(name == "minQuantity"){
          setValue(value) 
         }

        setInputHandler(() => {
          return { ...inputHandler, [name]: value };
        });

      };

      function limitInputValue(e) {
        if(e.target.value >maxValue)
        {
      <p>The Minimum value should be less than maximum value</p>
        } 
       
      
    }
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const { title , description ,price ,maxQuantity , minQuantity,quantity, productType } = inputHandler;
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
              title , description ,price , quantity, productType  
            })
          });

          // const category = await fetch("http://localhost:8080/api/createCategory",
          // {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body:JSON.stringify({
          //     title , description ,image, price , quantity, productType  
          //   })
          //   })
   
          const res =await  data.json()
              console.log(res)
          if(res.status === 200){
            setInputHandler({...inputHandler , title:" ",description:" " , maxQuantity:" " , minQuantity:' ' , price:'' , quantity:'', productType:'' })
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
        <input type="file" id="productImage" onChange={(e) =>{ setImage(e.target.files[0])}} name="productImage"  required />
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
              <label htmlFor="minQuantity">Minimum Quantity</label>
              <input
                type="text"
                onChange={onChangeInputHandler} 
                value={inputHandler.minQuantity}
                id="minQuantity"
                name="minQuantity"
                onKeyUp={limitInputValue}
                max="8"
                placeholder="Minimum Quantity"
              />
             {value == 1  && <span>(Default)</span>}
            </div>

            <div className="form_input">
              <label htmlFor="maxQuantity">Maximum Quantity</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.maxQuantity}
                id="maxQuantity"
                name="maxQuantity"
                placeholder="8 (Default)"
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