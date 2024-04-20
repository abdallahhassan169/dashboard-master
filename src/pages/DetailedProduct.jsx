import React from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { postApi } from "../utilis/postApi";
import { backEnd } from "../utilis/config";
import AddCampaign from "../components/addCampaign";
import { ToastContainer, toast } from "react-toastify";

export default function DetailedProduct() {
  const { id } = useParams();
  const [files, setFiles] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [showForm, setShowForm] = React.useState(false);
  const onClose = (refresh) => {
    if (refresh) {
      setShowForm(false);
    } else setShowForm(false);
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

      // Append other data fields
      formData.append("name", data.name);
      formData.append("start_date", data.start_date);
      formData.append("draw_date", data.draw_date);
      formData.append("prize_name", data.prize_name);
      formData.append("prize_url", data.prize_url);
      formData.append("remaining_qty", data.remaining_qty);
      formData.append("product_id", id);
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
  const fetchProductData = async () => {
    try {
      const res = await postApi("/get_products", { id: id });
      setProduct(res[0]);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  React.useEffect(() => {
    fetchProductData();
  }, [id]);

  return (
    <>
      {showForm ? (
        <AddCampaign
          onClose={onClose}
          onsubmit={onAddSubmit}
          setFiles={setFiles}
        />
      ) : (
        <Box className="detailed-product">
          <Container maxWidth="lg">
            <Stack spacing={4} mt={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={backEnd + "/image?img=" + product?.image_url}
                  alt={product?.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    borderRadius: "10px",
                    boxShadow: "3px 5px 12px #eee",
                  }}
                />
              </Box>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4" align="center" mb={2}>
                    معلومات المنتج
                  </Typography>
                  <Grid container spacing={2} sx={{ textAlign: "right" }}>
                    <Grid item xs={12} sm={6}>
                      <Item title="ماركة الجهاز" value={product?.brand_name} />
                      <Item title="الفئة" value={product?.category} />
                      <Item title="الوصف" value={product?.description} />
                      <Item title="السعر" value={product?.egp_price} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Item title="الاسم" value={product?.name} />
                      <Item title="السعر بالدولار" value={product?.usd_price} />
                      <Item
                        title="الكمية المتبقية"
                        value={product?.remaining_qty}
                      />
                      <Item title="ID" value={product?.id} />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Button
                      onClick={() => setShowForm(true)}
                      variant="contained"
                      color="success"
                      sx={{ width: "50%" }}
                    >
                      إضافة حملة
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Container>
          <ToastContainer />
        </Box>
      )}
    </>
  );
}

function Item({ title, value }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}
