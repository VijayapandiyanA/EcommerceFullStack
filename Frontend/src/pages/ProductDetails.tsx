import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../store/hooks";
import { fetchProductById } from "../store/slices/productSlice";
import { addToCartAPI } from "../store/slices/cartSlice";


import React from 'react'



export const ProductDetails = () => {

const {id} = useParams()
const dispatch = useAppDispatch()
const {selectedProduct, loading, error}= useAppSelector((state)=>
state.products
)

useEffect(()=>{
    if(id){
      dispatch(fetchProductById(Number(id)))  
    }
},[id,dispatch])

if(loading) return <p>Loading.....</p>
if(error) return <p style={{color:"red"}}>{error}</p>
if(!selectedProduct) return <p>Product Not Found</p>

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* IMAGE */}
        <img
          src={
            selectedProduct.imageUrl ||
            "https://via.placeholder.com/300"
          }
          alt={selectedProduct.name}
          style={{ width: "300px", borderRadius: "10px" }}
        />

        {/* DETAILS */}
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>

          <h3>₹ {selectedProduct.price}</h3>

          <p>
            Category: <b>{selectedProduct.category}</b>
          </p>

          <p
            style={{
              color:
                selectedProduct.stock > 0 ? "green" : "red",
            }}
          >
            {selectedProduct.stock > 0
              ? `In Stock (${selectedProduct.stock})`
              : "Out of Stock"}
          </p>

  <button
  onClick={() => {
    if (!selectedProduct) return;

    dispatch(
      addToCartAPI({
        productId: selectedProduct.id,
        quantity: 1,
      })
    );
  }}
>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
}
