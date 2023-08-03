import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';

function ProductsList({category}) {
   const [productsList, setProductsList] = useState([]);

   useEffect(() => {
      fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
      .then((response) => {
         return response.json()
      })
      .then((data) => {
         setProductsList(data)
      })
   }, [category]);

   return (
      <div className="wrapper">
         {productsList.map((prod) => (
            <ProductCard product={prod} />
         ))}
      </div>
   )
}

export default ProductsList;