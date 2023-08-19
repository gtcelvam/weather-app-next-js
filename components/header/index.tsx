import React, { FC } from "react";
import CustomButton from "../ui-elements/buttons";
import { useRouter } from "next/router";
import Link from "next/link";
import S from "./style";

const Header = () => {
  //constants
  const router = useRouter();

  //functions
  const handlePath = (route: string) => {
    router.push(route);
  };

  return (
    <div className={S.HeaderContainer}>
      <CustomButton
        name="Product Page"
        onClick={() => handlePath("/products")}
      />
      <Link href={"/products/1"}>Product 1</Link>
      <Link href={"/products/2"}>Product 2</Link>
      <Link href={"/products/3"}>Product 3</Link>
      <Link href={"/users"}>Users</Link>
    </div>
  );
};

export default Header;
