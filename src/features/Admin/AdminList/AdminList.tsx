import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { deleteProduct } from "../../../entities/products/productsSlice";
import { Link } from "react-router-dom";
import styles from "./AdminList.module.css"

const AdminList = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Список товаров</h1>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>Цена: {product.price} ₽</p>
            <p className={styles.productDescription}>{product.description}</p>
            <button
              className={styles.button}
              onClick={() => handleDelete(product.id)}
            >
              Удалить
            </button>
            <Link to={`/edit-product/${product.id}`} className={styles.link}>
              Редактировать
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
