import {
  Box,
  Button,
  IconButton,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "./header";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { postApi } from "../utilis/postApi";
import DropDown from "./dropDown";
import React from "react";
import AutoComplete from "./autoComplete";
const AddCampaign = ({ onClose, onsubmit, setFiles }) => {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [city, setCity] = React.useState([]);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { city: city },
    mode: "onTouched",
  });
  const { errors } = formState;

  const req = async () => {
    const res = await postApi("/get_cities");
    setData(res);
  };
  React.useEffect(() => {
    req();
  }, []);

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
      <Box className="form_box" sx={{ width: { xs: "280px", md: "700px" } }}>
        <Header textCenter="center" title="new campaign" />
        <form
          method="post"
          onSubmit={handleSubmit(onsubmit)}
          style={{ width: "100%" }}
        >
          <Stack spacing={2}>
            <TextField
              autoComplete="off"
              id="name"
              label="Name"
              type="text"
              variant="filled"
              {...register("name", {
                required: "This field is required!",
              })}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <TextField
              id="start_date"
              label="Start Date"
              type="date"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              {...register("start_date", {
                required: "This field is required!",
              })}
              error={!!errors.start_date}
              helperText={errors?.start_date?.message}
            />
            <TextField
              id="draw_date"
              label="Draw Date"
              type="date"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              {...register("draw_date", {
                required: "This field is required!",
              })}
              error={!!errors.draw_date}
              helperText={errors?.draw_date?.message}
            />
            <TextField
              id="prize_name"
              label="Prize Name"
              type="text"
              variant="filled"
              {...register("prize_name", {
                required: "This field is required!",
              })}
              error={!!errors.prize_name}
              helperText={errors?.prize_name?.message}
            />
            <TextField
              id="prize_url"
              label="Prize URL"
              type="text"
              variant="filled"
              {...register("prize_url", {
                required: "This field is required!",
              })}
              error={!!errors.prize_url}
              helperText={errors?.prize_url?.message}
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
            <TextField
              id="images"
              label="Images"
              multiple
              type="file"
              variant="filled"
              {...register("images", {
                required: "This images is required!",
              })}
              onChange={(e) => setFiles(e.target.files)}
              error={!!errors.images}
              helperText={errors?.remaining_qty?.message}
              inputProps={{
                multiple: true,
              }}
            />
            {/* <TextField
              id="product_id"
              label="Product ID"
              type="number"
              variant="filled"
              {...register("product_id", {
                required: "This field is required!",
              })}
              error={!!errors.product_id}
              helperText={errors?.product_id?.message}
            /> */}
            <TextField
              id="target"
              label="Target"
              type="number"
              variant="filled"
              {...register("target", {
                required: "This field is required!",
              })}
              error={!!errors.target}
              helperText={errors?.target?.message}
            />
            <TextField
              id="note"
              label="Note"
              type="text"
              variant="filled"
              multiline
              rows={4}
              {...register("note")}
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
export default AddCampaign;
