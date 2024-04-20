import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "./header";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { postApi } from "../utilis/postApi";
import DropDown from "./dropDown";
import React from "react";
const AddEmployee = ({ onClose, onsubmit }) => {
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
        height: "95vh",
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
      <Box className="form_box" sx={{ width: { xs: "280px", md: "400px" } }}>
        <Header textCenter="center" title="new employee" />
        <form
          method="post"
          onSubmit={handleSubmit(onsubmit)}
          style={{ width: "100%" }}
        >
          <Stack spacing={2}>
            <TextField
              autoComplete="off"
              id="name"
              label="Full name"
              type="text"
              variant="filled"
              {...register("user_name", {
                required: "This Field Is Required!",
              })}
              error={!!errors.user_name}
              helperText={errors?.user_name?.message}
            />
            <TextField
              id="email"
              label="email"
              type="email"
              variant="filled"
              {...register("email", { required: "This Field Is Required!" })}
              error={!!errors.phone}
              helperText={errors?.phone?.message}
            />
            <TextField
              id="phone"
              label="phone"
              type="text"
              variant="filled"
              {...register("phone", { required: "This Field Is Required!" })}
              error={!!errors.phone}
              helperText={errors?.phone?.message}
            />

            <TextField
              id="password"
              label="password"
              type="password"
              variant="filled"
              {...register("password", { required: "This Field Is Required!" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
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
              create
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
export default AddEmployee;
