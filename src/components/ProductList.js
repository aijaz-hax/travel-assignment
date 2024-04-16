// ProductList.js
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import "./product.css";
import AddProduct from './AddProduct';
const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=0');
  const data = await response.json();
  return data.products;
};
const ProductList = () => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);
  const [product, setProduct]=useState()
  const [openModal, setOpenModal] = useState(false)

  const openProduct = () => {
    setOpenModal(!openModal)
  }

  useEffect(()=>{
    (async()=>{
      const val = await fetchProducts()
      setProduct(val)
    })()
    
  },[])

  if (isLoading) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}> <h3> Loading...</h3></div>;
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
        product?.map((itm) => {
          return (
            <div className="product-card">
              <img className="product-image" src={itm?.images?.[0] || process.env.PUBLIC_URL + '/dummy.jpg'} alt={"img/"} />
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
            setProduct={setProduct}
            product={product}
          />
        )
      }
    </>
  );
};
export default ProductList;