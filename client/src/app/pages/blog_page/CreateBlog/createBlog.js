import react, { useState } from 'react';

const CreateBlog = () =>{
 const [inputHandler , setInputHandler]= useState({
    title:" " , content:" "
 }) 

    const onChangeInputHandler = (e) =>{
            const { name, value } = e.target; 
            setInputHandler(() => {
              return { ...inputHandler, [name]: value };
            });     
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const { title , content } = inputHandler;
        if (title === "") {
          alert("Add Title"); 
        } else if (content === "") {
          alert(" Add Content");
        }   else {
          const data = await fetch("http://localhost:8080/api/composeBlog", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              title , content  
            })
          });
   
          const res =await  data.json()
              console.log(res)
          if(res.status === 200){
            setInputHandler({...inputHandler , title:" ",content:" "  })
                // history('/')
          }
        }
      };

    return (
        <section>
        {  <div className="form_data">
          <div className="form_heading">
            <h1>Create Blog</h1>
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
              <label htmlFor="Content">Content</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.content}
                id="content"
                name="content"
                placeholder="Content ...."
              />
            </div>

            <button className="btn" onClick={onSubmitHandler}>
              Create Blog
            </button>
          </form>
        </div>}
      </section>
    )
} 

export default CreateBlog ; 