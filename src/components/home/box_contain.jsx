import { Box, Container, Grid, Typography } from "@mui/material";

const BoxContain = ({ title, count, icon ,borderColor }) => {

  return (
    <Grid xs={12} sm={6} md={4}>
      <Box className="box_contain" sx={{borderBottom:`5px solid ${borderColor}` , m:'5px'}}>
        <Typography
          variant="p"
          component="p"
          sx={{
            mb: "20px",
            ["&:hover"]: { fontWeight: "bold", cursor: "pointer" },
            fontSize: "18px",
            color:borderColor
          }}
        >
          {title}
        </Typography>
        <Box
          className="box_icon"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {icon}
          <Typography
            variant="p"
            component="p"
            sx={{ fontWeight: "bold", fontSize: "22px" }}
          >
            {count}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
export default BoxContain;
