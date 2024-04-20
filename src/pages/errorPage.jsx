import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const theme = useTheme()
    const navigate=  useNavigate()
    const error = useRouteError();
  return (
    <Box
      className="errorPage"
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
          width: { xs: "280px", sm: "400px", md: "600px", textAlign: "center" },
        }}
      >
        <img
          src={require("../assets/undraw_Warning_re_eoyh.png")}
          width="100%"
          alt="errorImage"
        />
        <Typography variant="p" component='p' sx={{fontWeight:'bold' , color:theme.palette.red , mb:'10px'}}>{`${error.status} || Something is Warnning `} </Typography>
        <Button
          sx={{
            textTransform: "capitalize",
            background: theme.palette.blue,
            color: "#fff",
            ["&:hover"]: {
              border: `1px solid ${theme.palette.blue}`,
              color: theme.palette.blue,
            },
          }}
          onClick={()=> navigate('/',{replace:true})}
        >
          Back To Home page
        </Button>
      </Box>
    </Box>
  );
};
export default ErrorPage;
