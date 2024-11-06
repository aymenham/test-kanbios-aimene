import React from "react";
import UserTable from "../components/user/UserTable";
import Layout from "../components/Layout";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <Layout>
      <UserTable />
    </Layout>
  );
};

export default AdminPage;
