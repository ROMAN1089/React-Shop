import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../entities/products/productsSlice";
import { AppDispatch, RootState } from "../app/store";
import ProductsList from "../features/productsList/ProductsList";


const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedCategory = useSelector((state: RootState) => state.search.selectedCategory);

  useEffect(() => {
    if (status === "idle" && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
  );

  return (
    <div>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка загрузки товаров</p>}
      {status === "idle" && <ProductsList products={filteredProducts} />}
    </div>
  );
};

export default MainPage;
