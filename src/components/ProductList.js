// ProductList.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import "./product.css"
import { TITLE } from '../constants';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';

const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=0');
  const data = await response.json();
  console.log("DATA", data)
  return data.products;
};

const ProductList = () => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);
  const [openModal, setOpenModal] = useState(false)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [value, setValue] = useState({})


  const openProduct = () => {
    setOpenModal(!openModal)
  }

  const deleteModal = (val) => {
    setValue(val)
    setDeleteOpenModal(true)
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className='displaySpcStyle'>
        <h1>Product List</h1>
        <div className='spaceDataStyl'>
          {/* <input
            type='text'
            placeholder='Search product'
            className="custom-input"
          /> */}
          <button className="btnStyle" onClick={openProduct}>Add Product</button>
        </div>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            {
              TITLE.map((item, id) => {
                return (
                  <th key={id}>{item}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td><button className='deleteStyle' onClick={() => deleteModal(product)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        openModal && (
          <AddProduct
            open={openModal}
            setOpen={setOpenModal}
          />
        )
      }
      {
        deleteOpenModal && (
          <DeleteProduct
            open={deleteOpenModal}
            setOpen={setDeleteOpenModal}
            data={value}
          />
        )
      }
    </div>
  );
};

export default ProductList;
