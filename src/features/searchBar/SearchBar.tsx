import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  setSearchTerm,
  setSelectedCategory,
  selectCategories,
  selectStatus,
  selectSearchTerm,
} from "../../entities/Search/SearcBarSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { AppDispatch } from "../../app/store";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector(selectSearchTerm);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setSelectedCategory(value));
  };

  return (
    <div className="search-bar-container">
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="category-select">
          <SelectValue
            placeholder={
              status === "loading"
                ? "Загрузка категорий..."
                : "Выберите категорию"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">
            Все категории
          </SelectItem>
          {categories.map((category, index) => (
            <SelectItem key={index} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="text"
        className="search-input"
        placeholder="Поиск товаров..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  );
};

export default SearchBar;
