import { useNavigate } from "react-router-dom";
import s from "./Logo.module.css";

const Logo = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/')
  }

  return (
    <button className={s.logo} onClick={handleGoToMain}>
      <div className={s.logoIcon}>
        <div className={s.smile}></div>
      </div>
      <div className={s.logoText}>My-SHOp</div>
    </button>
  );
};

export default Logo;
