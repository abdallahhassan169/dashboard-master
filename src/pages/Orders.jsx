import { DataGrid } from "@mui/x-data-grid";
import { Container, useTheme, Box, Button } from "@mui/material";
import Header from "../components/header";
import { RemoveRedEye } from "@mui/icons-material";

import React from "react";
import { postApi } from "../utilis/postApi";
import Search from "../components/search";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "material-react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Orders() {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const nav = useNavigate();

  const req = async (data) => {
    const res = await postApi("/get_admin_orders", data);
    setData(res);
  };
  React.useEffect(() => {
    req();
  }, []);

  const search = (query) => {
    req({ query: query });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "created_at",
      headerName: "Creation Date",
      flex: 1,
      valueGetter: (params) => params.row?.created_at?.substring(0, 10),
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Show",
      flex: 1,

      renderCell: (params) => (
        <td>
          <RemoveRedEye
            sx={{
              cursor: "pointer",
              ["&:hover"]: { color: theme.palette.red },
            }}
            onClick={(e) => nav("/admin/followOrder/" + params?.row.id)}
          />
        </td>
      ),
    },
  ];
  return (
    <Box className="emplayee_show" sx={{ position: "relative" }}>
      <Container>
        <Header title="Orders" />

        <Search onSubmit={search} />
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </Container>
      <ToastContainer />
    </Box>
  );
}
