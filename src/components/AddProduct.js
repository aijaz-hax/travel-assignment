import React, { useState } from 'react'
import "./product.css";
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
const AddProduct = ({open,setOpen, setProduct, product}) => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
      });
      const addProductMutation = useMutation(
        async () => {
          const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title:formData.productName}),
          });
          return response.json();
        },
        {
          onSuccess: (data) => {
            toast.success("Product added successfully")
            const obj = {
              id: data?.id,
              title: formData?.productName,
              description: formData?.productDescription,
              price: formData?.productPrice
            }
            setProduct([obj, ...product])
            setOpen(false)
            // You can perform any action after successful product addition
          },
          onError: (error) => {
            setOpen(false)
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