import { DataGrid } from "@mui/x-data-grid";
import { Container, useTheme, Box, Button } from "@mui/material";
import Header from "../components/header";
import {
  Add,
  Campaign,
  Delete,
  Edit,
  PlusOne,
  RemoveRedEye,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import AddEmployee from "../components/addform";
import React from "react";
import { postApi } from "../utilis/postApi";
import Search from "../components/search";
import AddCampaign from "../components/addCampaign";
import { backEnd } from "../utilis/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "material-react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Campaigns = () => {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = React.useState([]);
  const [id, setId] = React.useState();
  const [editData, setEditData] = React.useState();
  const nav = useNavigate();
  const onClose = (refresh) => {
    if (refresh) {
      setShowForm(false);
      req();
    } else setShowForm(false);
  };

  const req = async (data) => {
    const res = await postApi("/get_admin_campaigns");
    setData(res);
  };
  React.useEffect(() => {
    req();
  }, []);

  const search = (query) => {
    req({ query: query });
  };
  const onAddSubmit = async (data) => {
    try {
      console.log(data, "data");

      const formData = new FormData();

      // Append files to the form data
      [...files].forEach((file, index) => {
        console.log(file.name);
        formData.append(`images`, file, file.name); // Since each file is an array, we take the first item
      });
      console.log(id);
      // Append other data fields
      formData.append("id", editData.id);

      formData.append("name", data.name);
      formData.append("start_date", data.start_date);
      formData.append("draw_date", data.draw_date);
      formData.append("prize_name", data.prize_name);
      formData.append("prize_url", data.prize_url);
      formData.append("remaining_qty", data.remaining_qty);
      formData.append("product_id", data.product_id ?? editData.product_id);
      formData.append("target", data.target);
      formData.append("note", data.note);
      console.log(formData);
      // Send the form data to the server using fetch or your preferred HTTP client library
      const response = await fetch(
        "http://127.0.0.1:3000" + "/upsert_campaign",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
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
      field: "Show",
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,

      renderCell: (params) => (
        <td>
          <Edit
            sx={{
              cursor: "pointer",
              ["&:hover"]: { color: theme.palette.red },
            }}
            onClick={() => {
              setShowForm(true);
              setId(params.id);
              console.log(params.id);
              setEditData(params.row);
            }}
          />
        </td>
      ),
    },
  ];
  return (
    <Box className="emplayee_show" sx={{ position: "relative" }}>
      {showForm && (
        <AddCampaign
          onClose={onClose}
          onsubmit={onAddSubmit}
          setFiles={setFiles}
          editData={editData}
        />
      )}
      <Container>
        <Header title="Campaigns" />

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
