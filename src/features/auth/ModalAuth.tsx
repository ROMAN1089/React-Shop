import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../shared/ui/Modal";
import { Button } from "../../components/ui/button";
import Inputs from "../../shared/ui/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal, loginUser } from "./authSlice";
import { AppDispatch } from "../../app/store";

interface IloginFormValues {
  username: string;
  password: string;
}

const ModalAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoginModalOpen = useSelector((state: any) => state.auth.isLoginModalOpen);
  const loading = useSelector((state: any) => state.auth.loading);
  const error = useSelector((state: any) => state.auth.loginError);

  const initialValues: IloginFormValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Минимум 3 символа").required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Обязательное поле"),
  });

  const handleCloseModal = () => {
    dispatch(closeLoginModal());
  };

  const handleSubmit = async (values: IloginFormValues) => {
    dispatch(loginUser({ username: values.username, password: values.password }));
  };

  return (
    <div>
      <Button onClick={() => dispatch(openLoginModal())}> Войти </Button>
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal} title="Логин">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Inputs
                name="username"
                type="text"
                label="Email"
                value={values.username}
                onChange={handleChange}
                error={touched.username ? errors.username : undefined}
              />
              <Inputs
                name="password"
                type="password"
                label="Пароль"
                value={values.password}
                onChange={handleChange}
                error={touched.password ? errors.password : undefined}
              />
              {error && <div className="text-red-500 mt-2">{error}</div>}
              <Button type="submit" disabled={loading}>
                {loading ? "Загрузка..." : "Войти!"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalAuth;
