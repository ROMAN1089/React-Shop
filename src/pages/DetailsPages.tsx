import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { Iproduct } from "../entities/products/types";
import styles from "./styles/DetailsPages.module.css";
import { addToCart } from "../entities/cart/cartSlice";
import { IcartItem } from "../entities/cart/types";
import { Button } from "../components/ui/button";

const DetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const products = useSelector((state: RootState) => state.products.items);
  const [product, setProduct] = useState<Iproduct | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => { //useLayout
    if (productId) {
      const foundProduct = products.find(
        (item) => item.id === Number(productId)
      );
      setProduct(foundProduct || null);
      console.log(12);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: IcartItem = {
        ...product,
        quantity: 1,
      };
      dispatch(addToCart(cartItem));
    }
  };

  if (!product) {
    return <div className={styles.noProductFound}>Продукт не найден</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.imageSection}>
        <div className={styles.mainImageContainer}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.thumbnailSection}>
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>Цена: ${product.price}</p>
        <Button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
};

export default DetailsPage;
