import { USER_URL } from "@/utils/constants";
import React from "react";

//Types
type UserType = {
  id: string;
  name: string;
};

const Users = ({ users }: { users: [] }) => {
  return (
    <div>
      <ul>
        {users.map((user: UserType) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

export const getStaticProps = async () => {
  const data = await (await fetch(USER_URL)).json();
  return {
    props: { users: data },
  };
};
