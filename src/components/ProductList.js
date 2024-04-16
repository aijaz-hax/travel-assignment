// ProductList.js
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import "./product.css"
import { TITLE } from '../constants';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';

const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=0');
  const data = await response.json();
  console.log("DATA", data);
  return data.products;
};

const ProductList = () => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);
  const [openModal, setOpenModal] = useState(false)
  // const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  // const [value, setValue] = useState({})

  const addList = (value)=>{
    //  data = [value , ...data]
    for(let i = 0; i < value.length;i++){
      data.unshift(value[i]);
    }
    // data.unshift(value);
  }
  const openProduct = () => {
    setOpenModal(!openModal)
  }

  // useEffect(()=>{
  //   addList(newData);
  // },[data])

  // const deleteModal = (val) => {
  //   setValue(val)
  //   setDeleteOpenModal(true)
  // }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className='displDataList'>
      <h2>Product Listing</h2>
      <div>
      <button className="btnStyle" onClick={openProduct}>Add Product</button>
      </div>
    </div>
    <div className='flxData'>
      {
        data?.map((itm) => {
          return (
            <div className="product-card">
              <img className="product-image" src={itm?.images?.[0]} alt={"img/"} />
              <div className="product-details">
                <h2 className="product-name">{itm?.title}</h2>
                <p className="product-description">{itm?.description}</p>
                <p className="product-price">${itm?.price}</p>
              </div>
            </div>
          )
        })
      }
    </div>
    {
        openModal && (
          <AddProduct
            open={openModal}
            setOpen={setOpenModal}
            addList={addList}
          />
        )
      }
    </>
  );
};

export default ProductList;
