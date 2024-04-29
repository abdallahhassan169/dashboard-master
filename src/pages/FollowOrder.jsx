import React, { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { postApi } from "../utilis/postApi";
const FollowOrder = () => {
  const [status, setStatus] = useState("Under Process");
  const [item, setItem] = React.useState({});

  const { id } = useParams();
  console.log(id);
  const orderData = async () => {
    try {
      const res = await postApi("/order_by_id", { id: id });
      setItem(res[0].full_data);
      console.log(res[0].full_data.products, "lllll");
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  React.useEffect(() => {
    orderData();
  }, [id]);
  const userInfo = item?.user;

  const orderInfo = {
    orderId: item?.order?.id,
    items: item?.order?.products,
  };
  const handleStatusChange = async (newStatus) => {
    console.log(newStatus, "hhh");
    try {
      // Map status string to status number
      let statusNumber;
      switch (newStatus) {
        case "Under Process":
          statusNumber = 1;
          break;
        case "Delivered":
          statusNumber = 4;
          break;
        case "Cancelled":
          statusNumber = 3;
          break;
        default:
          statusNumber = 1; // Default to "Under Process" if status is unknown
      }

      // Make API call to update status
      const res = await postApi("/change_order_status", {
        id: id,
        status: statusNumber,
      });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 4: // Delivered
        return "green";
      case 3: // Cancelled
        return "red";
      default:
        return "orange"; // Default to "Under Process"
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 2,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <Typography>Name: {userInfo?.name}</Typography>
        <Typography>Email: {userInfo?.email}</Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Order Information
        </Typography>
        <Typography>Order ID: {orderInfo?.orderId}</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">CampaignId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderInfo?.items?.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.name}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: getStatusColor(),
            color: "white",
          }}
        >
          Status: {status}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleStatusChange(2)}
            color="warning"
          >
            Under Process
          </Button>
          <Button
            variant="contained"
            onClick={() => handleStatusChange(4)}
            color="success"
          >
            Delivered
          </Button>
          <Button
            variant="contained"
            onClick={() => handleStatusChange(3)}
            color="error"
          >
            Cancelled
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default FollowOrder;
