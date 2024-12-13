import React from "react";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  removeFromCart,
  updateItemQuantity,
} from "../../entities/cart/cartSlice";
import { IcartItem } from "../../entities/cart/types";
import styles from "./CartCard.module.css";

interface CartCardProps {
  item: IcartItem;
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, action: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      let newQuantity = item.quantity;
      if (action === "increase") {
        newQuantity += 1;
      } else if (action === "decrease" && newQuantity > 1) {
        newQuantity -= 1;
      }
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className={styles.cartItems}>
      <div key={item.id} className={styles.cartCard}>
        <div className={styles.cartCardImage}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={styles.cartCardDetails}>
          <h3>{item.title}</h3>
          <div className={styles.cartCardPrice}>
            <span className={styles.price}>{item.price}₽</span>
          </div>
          <div className={styles.cartCardActions}>
            <Button
              onClick={() => handleRemove(item.id)}
              className={styles.removeButton}
            >
              Удалить
            </Button>
            <Button className={styles.favoriteButton}>В избранное</Button>
          </div>

          <div className={styles.cartCardQuantity}>
            <Button
              onClick={() => handleQuantityChange(item.id, "decrease")}
            >
              -
            </Button>
            <span>{item.quantity}</span>
            <Button
              onClick={() => handleQuantityChange(item.id, "increase")}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard
