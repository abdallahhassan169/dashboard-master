import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, useTheme, Typography } from "@mui/material";
import Header from "../components/header";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postApi } from "../utilis/postApi";
import { DataGrid } from "@mui/x-data-grid";
import Search from "../components/search";

const Report = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const columns = [
    {
      field: "name",
      headerName: "Report Name",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Typography variant="p" component="p">
            name: {params.row.user ?? "زائر"}
          </Typography>
          <Typography variant="p" component="p">
            location: الحرم المكي
          </Typography>
        </div>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    {
      field: "actions",
      headerName: "Icons",
      flex: 1,
      renderCell: (params) => (
        <div>
          <RemoveRedEye
            onClick={() =>
              navigate("/admin/detailReport", { state: { id: params.row.id } })
            }
            sx={{
              mr: "10px",
              ["&:hover"]: { color: "green", cursor: "pointer" },
            }}
          />
          <Delete
            onClick={() => del(params.row.id)}
            sx={{
              ["&:hover"]: { color: theme.palette.red, cursor: "pointer" },
            }}
          />
        </div>
      ),
    },
  ];

  const req = async (data) => {
    const res = await postApi("/get_admin_complains", { ...data });
    setData(res);
  };
  const search = (query) => {
    req({ query: query });
  };
  React.useEffect(() => {
    req();
  }, []);
  const del = async (id) => {
    await postApi("/cancel_complain", { id: id });
    req();
  };

  return (
    <>
      <Search onSubmit={search} />
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </>
  );
};

export default Report;
