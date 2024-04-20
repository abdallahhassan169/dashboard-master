import { DataGrid } from "@mui/x-data-grid";
import { Container, useTheme, Box, Button } from "@mui/material";
import Header from "../components/header";
import {
  Add,
  Campaign,
  Delete,
  PlusOne,
  RemoveRedEye,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";

import React from "react";
import { postApi } from "../utilis/postApi";
import Search from "../components/search";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "material-react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Campaigns = () => {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const nav = useNavigate();

  const req = async (data) => {
    const res = await postApi("/get_admin_campaigns", data);
    setData(res);
  };
  React.useEffect(() => {
    req();
  }, []);
  const del = async (id) => {
    await postApi("/change_user_status", { id: id });
    req();
  };
  const search = (query) => {
    req({ query: query });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
      valueGetter: (params) => params.row?.start_date?.substring(0, 10),
    },
    {
      field: "draw_date",
      headerName: "Draw Date",
      flex: 1,
      valueGetter: (params) => params.row?.draw_date?.substring(0, 10),
    },
    { field: "product", headerName: "Product", flex: 1 },
    {
      field: "target",
      headerName: "Target",
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
            onClick={(e) => nav("/admin/campaigns/" + params?.row.id)}
          />
        </td>
      ),
    },
  ];
  return (
    <Box className="emplayee_show" sx={{ position: "relative" }}>
      <Container>
        <Header title="Campaigns" />

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
};
export default Campaigns;
