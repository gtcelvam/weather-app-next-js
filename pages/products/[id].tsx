import React from "react";

const ProductByID = ({ id }: { id: string }) => {
  return <div>ProductByID : {id}</div>;
};

export default ProductByID;

const Id_List = [1, 2, 3, 4, 5, 6];
export const getStaticPaths = () => {
  const paths = Id_List.map((id) => {
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (context: any) => {
  return {
    props: {
      id: context.params.id,
    },
  };
};
