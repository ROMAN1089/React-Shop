import React from "react";
import Header from "./Header";

interface IlayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;