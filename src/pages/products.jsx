import { useTheme } from "@emotion/react";
import { Add, Delete, Edit, PlusOne, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { postApi } from "../utilis/postApi";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";

import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/addProduct";
import Search from "../components/search";
import Header from "../components/header";
const Products = () => {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [productId, setProductId] = React.useState();
  const [files, setFiles] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [currentObj, setCurrentObj] = React.useState({});

  const nav = useNavigate();
  const onClose = (refresh) => {
    if (refresh) {
      setShowForm(false);
      req();
    } else setShowForm(false);
  };

  const onAddSubmit = async (data) => {
    try {
      console.log(files, "data");

      const formData = new FormData();

      formData.append(`image`, files);
      formData.append(`id`, productId);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("usd_price", data.usd_price);
      formData.append("egp_price", data.egp_price);
      formData.append("brand_name", data.brand_name);
      formData.append("total_qty", data.total_qty);
      console.log(formData);
      const response = await fetch(
        "http://127.0.0.1:3000" + "/upsert_product",
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
  console.log(data);
  const req = async () => {
    const res = await postApi("/get_products");
    setData(res);
  };
  React.useEffect(() => {
    req();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "brand_name",
      headerName: "Brand",
      flex: 1,
    },
    { field: "egp_price", headerName: "Price(EGP)", flex: 1 },

    {
      field: "show",
      headerName: "show",
      flex: 1,

      renderCell: (params) => (
        <td>
          <RemoveRedEye
            sx={{
              cursor: "pointer",
              ["&:hover"]: { color: theme.palette.red },
            }}
            onClick={(e) => nav("/admin/products/" + params?.row.id)}
          />
        </td>
      ),
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,

      renderCell: (params) => (
        <td>
          <Edit
            sx={{
              cursor: "pointer",
              ["&:hover"]: { color: theme.palette.red },
            }}
            onClick={(e) => {
              setProductId(params.row.id);
              setCurrentObj(params.row);
              setShowForm(true);
            }}
          />
        </td>
      ),
    },
  ];
  return (
    <Box className="emplayee_show" sx={{ position: "relative" }}>
      {showForm && (
        <AddProduct
          onClose={onClose}
          editData={currentObj}
          onsubmit={onAddSubmit}
          setFiles={setFiles}
        />
      )}
      <Container maxWidth="lg">
        <Header title="Products" />
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
          ADD PRODUCT
        </Button>
        <Search />
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

export default Products;
