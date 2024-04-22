import { Box, Stack } from "@mui/material";
import NavBar from "./components/navbar";
import SlideBar from "./components/slidBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Auth from "./pages/auth";
import React from "react";
import { AuthProvider, useAuth } from "./context/auth";
function App() {
  const token = localStorage.getItem("token");

  const { isLoggedIn } = useAuth();

  return (
    <>
      {true ? (
        <Box className="App" sx={{ width: "100%", height: "100%" }}>
          <Stack direction="row">
            <SlideBar />
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#fefefe",
                height: "100vh",
              }}
            >
              <NavBar />
              <Outlet />
            </Box>
          </Stack>
        </Box>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
