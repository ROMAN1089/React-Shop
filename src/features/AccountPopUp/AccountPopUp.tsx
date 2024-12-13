import { useSelector } from "react-redux";
import Sheets from "../../shared/ui/Sheets";
import ModalAuth from "../auth/ModalAuth";
import { RootState } from "../../app/store";
import ButtonResetUser from "../auth/ButtonResetUser";
import ModalRegister from "../auth/ModalRegister";
import st from "./AccountPopUp.module.css";

const AccountPopup = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Sheets
      trigger="https://img.icons8.com/?size=100&id=11849&format=png&color=000000"
      title="Профиль пользователя"
    >
      <div className={st.accountPopup}>
        {user ? (
          <div className={st.accountLoggedIn}>
            <p className={st.welcomeMessage}>
              🎉 Добро пожаловать!
            </p>
            <ButtonResetUser />
          </div>
        ) : (
          <div className={st.accountNotLoggedIn}>
            <p className={st.authMessage}>
              🔒 Вы не авторизованы. Пожалуйста, войдите или зарегистрируйтесь.
            </p>
            <div className={st.authActions}>
              <ModalAuth />
              <ModalRegister />
            </div>
          </div>
        )}
      </div>
    </Sheets>
  );
};

export default AccountPopup;
