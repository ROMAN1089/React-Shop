import React from "react";
import ProductCard from "../productCard/ProductCard";
import { Iproduct } from "../../entities/products/types";
import './ProductsList.css'

interface IproductListProps {
  products: Iproduct[];
}

const ProductsList: React.FC<IproductListProps> = ({ products }) => {
  return (
    <div className="products-list-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
