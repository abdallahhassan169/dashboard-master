import {
  Box,
  InputAdornment,
  Button,
  TextField,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useForm } from "react-hook-form";

import { AccountCircle, Email, Password } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import { forwardRef, useState } from "react";
import { postApi } from "../utilis/postApi";
import React from "react";
import { useAuth } from "../context/auth";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = () => {
  const form = useForm({
    mode: "onTouched",
  });
  const { login } = useAuth();
  const [signUp, setSignUp] = React.useState(false);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //   on submit login & register
  const onsubmit = async (data1) => {
    try {
      console.log(data1);
      if (!signUp) {
        data1 = {
          email: data1.user_name,
          password: data1.password,
        };
      }
      console.log(data1, "222");
      const retToken = await postApi("/login", data1);
      if (retToken.status === 200) {
        login(retToken.token);
        setSuccess(
          signUp ? "success register , please login" : "login success"
        );
      } else setError("login failed");

      setOpen(true);
    } catch (error) {
      setOpen(true);
      setError(error.response.data.msg);
    }
  };

  return (
    <Box
      className="Auth_User"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "280px", sm: "350px", md: "400px" },
          p: "30px",
          backgroundColor: "#fff",
          boxShadow: "1px 1px 5px #999",
          borderRadius: "10px",
        }}
      >
        <Box className="title_Form" sx={{ textAlign: "center", mb: "20px" }}>
          <Typography
            variant="p"
            component="p"
            color="primary"
            sx={{ fontSize: "28px", fontWeight: "bold", mb: "5px" }}
          >
            welcom {!signUp && "Back"}
          </Typography>
          <Typography variant="span" sx={{ fontWeight: "bold" }}>
            {signUp ? "Sign up now" : "Sign in"} to get start
          </Typography>
        </Box>
        <form sx={{ width: "100%" }} onSubmit={handleSubmit(onsubmit)}>
          <Stack>
            {signUp && (
              <>
                <TextField
                  autoComplete="off"
                  sx={{ mb: "30px" }}
                  id="username"
                  label="User name"
                  type="text"
                  {...register("user_name", {
                    required: "username feild is required",
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  error={!!errors?.user_name}
                  helperText={errors?.user_name?.message}
                />
                <TextField
                  autoComplete="off"
                  sx={{ mb: "30px" }}
                  id="tel"
                  label="mobile number"
                  type="number"
                  {...register("mobile", {
                    required: "mobile number feild is required",
                    minLength: {
                      value: 11,
                      message: "mobile number feild at lest 11 digit",
                    },
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  error={!!errors?.mobile}
                  helperText={errors?.mobile?.message}
                />
              </>
            )}
            <TextField
              autoComplete="off"
              sx={{ mb: "30px" }}
              id="user_name"
              label="user_name"
              type="text"
              {...register("user_name", {
                required: "ID_number feild is required",
                maxLength: {
                  value: 20,
                  message: "This length must less than or equal 20",
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              error={!!errors?.ID_number}
              helperText={errors?.ID_number?.message}
            />
            <TextField
              autoComplete="off"
              sx={{ mb: "30px" }}
              id="Password"
              label="password"
              type="password"
              {...register("password", {
                required: "password feild is required",
                minLength: {
                  value: 2,
                  message: "This length must more than or equal 8",
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                mb: "10px",
                "&:hover": { backgroundColor: "blue" },
              }}
            >
              {signUp ? "sign up" : "sign in"}
            </Button>
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              variant="div"
              component="div"
            >
              {/* {signUp ? "Already have an Account ? " : "Create new account ? "}

              <Typography
                variant="span"
                color="primary"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setSignUp(false)}
              >
                {signUp ? "sign in" : "sign up"}
              </Typography> */}
            </Typography>
          </Stack>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth;
