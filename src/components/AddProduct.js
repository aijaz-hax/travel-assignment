import React, { useState } from 'react'
import "./product.css";
import { useMutation } from 'react-query';

const AddProduct = ({open,setOpen}) => {

    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
      });

      const addProductMutation = useMutation(
        async (formData) => {
          const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          return response.json();
        },
        {
          onSuccess: (data) => {
            alert("Product added successfully");
            console.log("fg",data)
            setOpen(false)
            // You can perform any action after successful product addition
          },
          onError: (error) => {
            alert("something went wrong");
            // You can handle errors here
          },
        }
      );
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const addProduct = async (event) => {
        event.preventDefault();
    
        // Make sure to add validation or additional checks here if necessary
    
        addProductMutation.mutate(formData);
      };

  return (
    <>
       {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='modal-container'>
              <h2>Add Produt</h2>
              <button className='deleteStyle' onClick={()=>setOpen(false)}>close</button>
            </div>
            <div className='modal-body'>
              <div className='modal-body-val'>
                <h3 className='widthStyl'>Product Name:</h3>
                <input 
                  type='text' 
                  name="productName"
                  placeholder='Enter product name' 
                  className="custom-input"
                  value={formData.productName}
                  onChange={handleChange}  
                  />
              </div>
              <div className='modal-body-val'>
                <h3 className='widthStyl'>Description:</h3>
                <textarea 
                  type='text' 
                  name="productDescription"
                  placeholder='Enter description' 
                  className="custom-input"
                  value={formData.productDescription}
                  onChange={handleChange}  
                  />
              </div>
              <div className='modal-body-val'>
                <h3 className='widthStyl'>Price:</h3>
                <input 
                  type='number' 
                  name="productPrice"
                  placeholder='Enter price' 
                  className="custom-input"
                  value={formData.productPrice}
                  onChange={handleChange}  
                  />
              </div>
            </div>
            <div className='footer-data'>
              <div></div>
              <div>
              <button className="btnStyle" onClick={addProduct}>{addProductMutation.isLoading ? 'Adding...' : 'Add Product'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddProduct