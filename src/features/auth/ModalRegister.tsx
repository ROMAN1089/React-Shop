import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../shared/ui/Modal";
import { Button } from "../../components/ui/button";
import Inputs from "../../shared/ui/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { closeRegisterModal, openRegisterModal, registerUser } from "./authSlice";
import { AppDispatch } from "../../app/store";

interface IregisterFormValues {
  username: string;
  password: string;
  email: string;
  phone: string;
}

const ModalRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRegisterModalOpen = useSelector((state: any) => state.auth.isRegisterModalOpen);
  const registerError = useSelector((state: any) => state.auth.registerError);
  const loading = useSelector((state: any) => state.auth.loading);

  const initialValues: IregisterFormValues = {
    username: "",
    password: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Имя пользователя должно содержать минимум 3 символа")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Обязательное поле"),
    email: Yup.string()
      .email("Введите корректный email")
      .required("Обязательное поле"),
    phone: Yup.string()
      .matches(/^[\d\-+()\s]*$/, "Введите корректный номер телефона")
      .required("Обязательное поле"),
  });

  const handleRegisterSubmit = (values: { username: string; password: string; email: string; phone: string }) => {
    dispatch(registerUser(values));
  };


  return (
    <div>
      <Button onClick={() => dispatch(openRegisterModal())}>Зарегистрироваться</Button>
      <Modal isOpen={isRegisterModalOpen} onClose={() => dispatch(closeRegisterModal())} title="Регистрация">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Inputs
                name="username"
                type="text"
                label="Имя пользователя"
                value={values.username}
                onChange={handleChange}
              />
              <Inputs
                name="password"
                type="password"
                label="Пароль"
                value={values.password}
                onChange={handleChange}
              />
              <Inputs
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
              />
              <Inputs
                name="phone"
                type="text"
                label="Телефон"
                value={values.phone}
                onChange={handleChange}
              />
              {registerError && <div style={{ color: "red", marginBottom: "10px" }}>{registerError}</div>}
              <Button type="submit" disabled={loading}>
                {loading ? "load" : "Зарегистрироваться"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalRegister;
