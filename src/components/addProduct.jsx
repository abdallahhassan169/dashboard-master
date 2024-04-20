import React from "react";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { postApi } from "../utilis/postApi";
import Header from "./header";
const AddProduct = ({ onClose, onsubmit, setFiles }) => {
  const theme = useTheme();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmitHandler = async (data) => {
    try {
      await onsubmit(data);
    } catch (error) {
      console.error("Error submitting campaign:", error);
    }
  };

  return (
    <Box
      className="Add_employee"
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        background: "#eee",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: theme.palette.darkred,
          color: "#fff",
          ["&:hover"]: { background: theme.palette.darkred, color: "#fff" },
        }}
      >
        <Close />
      </IconButton>
      <Box className="form_box" sx={{ width: { xs: "280px", md: "500px" } }}>
        <Header textCenter="center" title="New Campaign" />
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          style={{ width: "100%" }}
        >
          <Stack spacing={2}>
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="filled"
              {...register("name", { required: "This field is required!" })}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <TextField
              id="description"
              label="Description"
              type="text"
              variant="filled"
              {...register("description", {
                required: "This field is required!",
              })}
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
            <TextField
              id="category"
              label="Category"
              type="text"
              variant="filled"
              {...register("category", { required: "This field is required!" })}
              error={!!errors.category}
              helperText={errors?.category?.message}
            />
            <TextField
              id="usd_price"
              label="USD Price"
              type="number"
              variant="filled"
              {...register("usd_price", {
                required: "This field is required!",
              })}
              error={!!errors.usd_price}
              helperText={errors?.usd_price?.message}
            />
            <TextField
              id="egp_price"
              label="EGP Price"
              type="number"
              variant="filled"
              {...register("egp_price", {
                required: "This field is required!",
              })}
              error={!!errors.egp_price}
              helperText={errors?.egp_price?.message}
            />
            <TextField
              id="brand_name"
              label="Brand Name"
              type="text"
              variant="filled"
              {...register("brand_name", {
                required: "This field is required!",
              })}
              error={!!errors.brand_name}
              helperText={errors?.brand_name?.message}
            />
            <TextField
              id="image"
              label="image"
              type="file"
              variant="filled"
              {...register("image", {
                required: "This images is required!",
              })}
              onChange={(e) => setFiles(e.target.files[0])}
              error={!!errors.images}
              helperText={errors?.remaining_qty?.message}
              inputProps={{
                multiple: true,
              }}
            />
            <TextField
              id="total_qty"
              label="Total Quantity"
              type="number"
              variant="filled"
              {...register("total_qty", {
                required: "This field is required!",
              })}
              error={!!errors.total_qty}
              helperText={errors?.total_qty?.message}
            />
            <TextField
              id="remaining_qty"
              label="Remaining Quantity"
              type="number"
              variant="filled"
              {...register("remaining_qty", {
                required: "This field is required!",
              })}
              error={!!errors.remaining_qty}
              helperText={errors?.remaining_qty?.message}
            />
            <Button
              type="submit"
              sx={{
                textTransform: "capitalize",
                background: theme.palette.green,
                color: "#fff",
                ["&:hover"]: {
                  border: `1px solid ${theme.palette.green}`,
                  color: theme.palette.green,
                },
              }}
            >
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
