import React, { useState } from 'react'
import "./product.css";
import { useMutation } from 'react-query';

const DeleteProduct = ({open,setOpen,data}) => {
   console.log("DT",data)
   const deleteProductMutation = useMutation(
    async () => {
      const response = await fetch(`https://dummyjson.com/products/${data.id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    {
      onSuccess: () => {
        alert('Product deleted successfully');
        setOpen(false)
        // You can perform any action after successful deletion
      },
      onError: (error) => {
        alert('something went wrong');
        // You can handle errors here
      },
    }
  );

    const deleteProduct = ()=>{
        deleteProductMutation.mutate();
    }

  return (
    <>
       {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='modal-container'>
              <h2>{`Delete ${data.title}`}</h2>
              <button className='deleteStyle' onClick={()=>setOpen(false)}>close</button>
            </div>
            <div className='modal-body'>
              <h3>Are you sure you want to delete this product?</h3>
            </div>
            <div className='footer-data'>
              <div></div>
              <div>
              <button className="deleteStyle" onClick={deleteProduct}>{deleteProductMutation.isLoading ? 'Deleting...' : 'Delete Product'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteProduct