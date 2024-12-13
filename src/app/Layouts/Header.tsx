import CartButton from "../../widgets/CartButton/CartButton";
import Logo from "../../features/Logo/Logo";
import SearchBar from "../../features/searchBar/SearchBar";
import s from "./Header.module.css";
import AccountPopup from "../../features/AccountPopUp/AccountPopUp";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.logo}>
          <Logo />
        </div>
        <div className={s.searchBar}>
          <SearchBar />
        </div>
        <div className={s.cartButton}>
          <CartButton />
        </div>
        <div>
          <AccountPopup />
        </div>
        <div>
          <Link to="/admin"><Button> Админ </Button></Link>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
