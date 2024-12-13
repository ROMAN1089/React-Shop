import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { addProduct } from "../../../entities/products/productsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import s from "./AdminAdd.module.css";
import { selectCategories } from "../../../entities/Search/SearcBarSlice";

const AdminAdd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const items = useSelector((state: RootState) => state.products.items);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!title || price === "" || !description || !category || !image) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    const newProduct = {
      id: items.length + 1,
      title,
      price: Number(price),
      description,
      category,
      image,
    };

    dispatch(addProduct(newProduct));
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
  };

  return (
    <div className={s.container}>
      <h1 className={s.header}>Добавить товар</h1>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <input
          className={s.inputField}
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={s.inputField}
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
        />
        <textarea
          className={s.textareaField}
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <Select onValueChange={setCategory}>
          <SelectTrigger className={s.categorySelect}>
            <SelectValue
              placeholder={
                "Выберите категорию"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          className={s.inputField}
          type="text"
          placeholder="URL изображения"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className={s.button} onClick={handleSubmit}>
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AdminAdd;
