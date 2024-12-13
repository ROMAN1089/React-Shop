import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AdminList from "../features/Admin/AdminList/AdminList";
import AdminAdd from "../features/Admin/AdminAdd/AdminAdd";
import styles from "./styles/AdminPages.module.css"

const AdminPages: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/admin/products" className={styles.navLink}>
              Список товаров
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/admin/add-product" className={styles.navLink}>
              Добавить товар
            </Link>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Routes>
          <Route path="products" element={<AdminList />} />
          <Route path="add-product" element={<AdminAdd />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPages;
