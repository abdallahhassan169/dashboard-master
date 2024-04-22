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
  ImageList,
  ImageListItem,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import { postApi } from "../utilis/postApi";

import { ToastContainer, toast } from "react-toastify";

import { backEnd } from "../utilis/config";

export default function DetailedCampaign() {
  const { id } = useParams();
  const [item, setItem] = React.useState({});

  const fetchCampaignData = async () => {
    try {
      const res = await postApi("/campaign_products", { ids: [id] });
      setItem(res.rows[0].full_data);
      console.log(res.rows[0].full_data.images);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  React.useEffect(() => {
    fetchCampaignData();
  }, [id]);

  return (
    <>
      <Box className="detailed-product">
        <Container maxWidth="lg">
          <Stack spacing={4} mt={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
              >
                {item?.images?.map((item) => (
                  <ImageListItem key={item.url}>
                    <img
                      srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={backEnd + "/image?img=" + item?.url}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Carousel>
                {item?.images?.map((item) => (
                  <Carousel.Item>
                    <img
                      srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={backEnd + "/image?img=" + item?.url}
                      alt={item.title}
                      loading="lazy"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" align="center" mb={2}>
                  معلومات الحملة
                </Typography>
                <Grid container spacing={2} sx={{ textAlign: "right" }}>
                  <Grid item xs={12} sm={6}>
                    <Item title="اسم الحملة" value={item?.campaign?.name} />
                    <Item
                      title="تاريخ البدء"
                      value={item?.campaign?.start_date}
                    />
                    <Item
                      title="تاريخ السحب"
                      value={item?.campaign?.draw_date}
                    />
                    <Item
                      title="هل تم إلغاء الحملة؟"
                      value={item?.campaign?.is_deactivated ? "نعم" : "لا"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Item
                      title="اسم الجائزة"
                      value={item?.campaign?.prize_name}
                    />
                    <Item
                      title="رابط الجائزة"
                      value={item?.campaign?.prize_url}
                    />
                    <Item
                      title="الكمية المتبقية"
                      value={item?.campaign?.remaining_qty}
                    />
                    <Item title="ID" value={item?.campaign?.id} />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    onClick={() => {}}
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
