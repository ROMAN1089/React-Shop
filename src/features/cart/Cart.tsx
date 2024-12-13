import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { clearCart } from "../../entities/cart/cartSlice";
import CartCard from "../CartCard/CartCard";
import styles from "./Cart.module.css"; // импортируем стили

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleClear = () => {
    dispatch(clearCart());
  };

  const totalItems = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItemsContainer}>
        {items.length === 0 ? (
          <p className={styles.cartEmptyMessage}>Сложите в корзину необходимое</p>
        ) : (
          <>
            {items.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
            <button
              onClick={handleClear}
              className={styles.clearCartButton}
            >
              Очистить корзину
            </button>
          </>
        )}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.cartSummaryHeader}>
          <h3 className={styles.cartSummaryTitle}>Итого</h3>
          <p className={styles.cartSummaryPrice}>{total.toFixed(2)} ₽</p>
        </div>
        <div className={styles.cartSummaryDetails}>
          <p className={styles.cartSummaryItem}>
            <span>Всего товаров</span>
            <span>{totalItems} шт</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
