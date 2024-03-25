'use client';

import { useGetUsersQuery } from "@/libs/query/users.query";
import UserAddForm from "./components/UserAddForm";
import UsersTable from "./components/UsersTable";
import UserEditForm from "./components/UserEditForm";

const ClientPage = () => {
  const { data } = useGetUsersQuery();

  return (
    <div className="flex flex-col space-y-8 mt-20 mb-10">
      <UserAddForm />
      <UserEditForm list={data ?? []} />
      <UsersTable list={data ?? []} />
    </div>
  );
};

export default ClientPage;
