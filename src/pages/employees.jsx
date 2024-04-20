import { DataGrid } from "@mui/x-data-grid";
import { Container, useTheme, Box, Button } from "@mui/material";
import Header from "../components/header";
import { Add, Delete, PlusOne, Rsvp } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import AddEmployee from "../components/addform";
import React from "react";
import { postApi } from "../utilis/postApi";
import Search from "../components/search";
import { ToastContainer, toast } from "react-toastify";

const Employees = () => {
  const theme = useTheme();

  const [data, setData] = React.useState([]);
  const [showForm, setShowForm] = useState(false);
  const onClose = (refresh) => {
    if (refresh) {
      setShowForm(false);
      req();
    } else setShowForm(false);
  };

  const req = async (data) => {
    const res = await postApi("/get_admins", { ...data });
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
  const onAddSubmit = (formState) => {
    try {
      const response = postApi("/add_admin", formState);
      console.log(response);
      if (response.status === 200) {
        toast.success("Created succefully");
        onClose(true);
      } else {
        toast.error("Error in Creation");
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },

    {
      field: "mobile_no",
      headerName: "Date of Register",
      flex: 1,
    },
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
    <Box className="emplayee_show" sx={{ position: "relative" }}>
      {showForm && <AddEmployee onClose={onClose} onsubmit={onAddSubmit} />}
      <Container>
        <Header title="Users" />

        <Button
          sx={{
            textTransform: "capitalize",
            background: theme.palette.green,
            color: "#fff",
            ["&:hover"]: {
              border: `1px solid ${theme.palette.green}`,
              color: theme.palette.green,
            },
          }}
          onClick={() => setShowForm(true)}
        >
          <Add sx={{ fontSize: "16px" }} />
          create new
        </Button>

        <Search onSubmit={search} />
        <DataGrid rows={data} columns={columns} pageSize={2} />
        <ToastContainer />
      </Container>
    </Box>
  );
};
export default Employees;
