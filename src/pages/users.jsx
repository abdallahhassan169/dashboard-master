import { DataGrid } from "@mui/x-data-grid";

import { Container, useTheme, Box } from "@mui/material";
import Header from "../components/header";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import { postApi } from "../utilis/postApi";
import Badge from "@mui/material/Badge";
import Search from "../components/search";

const Users = () => {
  const theme = useTheme();

  const [data, setData] = React.useState([]);
  console.log(data);
  const req = async (data) => {
    const res = await postApi("/all_users", { ...data });
    setData(res);
  };
  const search = (query) => {
    req({ query: query });
  };
  React.useEffect(() => {
    req();
  }, []);
  const del = async (id) => {
    await postApi("/change_user_status", { id: id });
    req();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "user_name", headerName: "User Name", flex: 1 },
    {
      field: "reg_date",
      headerName: "Date of Register",
      flex: 1,
      valueGetter: (params) => params.row?.reg_date?.substring(0, 10),
    },
    { field: "location", headerName: "Location", flex: 1, align: "center" },
    {
      field: "is_active",
      headerName: "Is Active",
      flex: 1,

      renderCell: (params) => (
        <td>
          <Badge
            badgeContent={params.value ? "فعال" : "موقوف"}
            color={params.value ? "success" : "error"}
          />
        </td>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,

      renderCell: (params) => (
        <td>
          <Delete
            sx={{
              cursor: "pointer",
              ["&:hover"]: { color: theme.palette.red },
            }}
            onClick={() => del(params.id)}
          />
        </td>
      ),
    },
  ];
  return (
    <Box className="users_show">
      <Container>
        <Header title="Users" />
        <Search onSubmit={search} />
        <DataGrid
          getRowId={(row) => row?.id}
          rows={data}
          columns={columns}
          pageSize={2}
        />
      </Container>
    </Box>
  );
};
export default Users;
