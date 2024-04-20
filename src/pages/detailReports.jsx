import { useTheme } from "@emotion/react";
import { Box, Stack, Container, Button } from "@mui/material";
import Header from "../components/header";
import { useLocation, useParams } from "react-router-dom";
import { postApi } from "../utilis/postApi";
import React from "react";
import { useState, useEffect } from "react";
import { backEnd } from "../utilis/config";
const dataName1 = [
  "الاسم :",
  "الجنسيه :",
  "العمر :",
  "مكان الفقد :",
  "الاوصاف:",
  "لون اللبس :",
];
const dataName2 = [
  "رقم الهويه :",
  "الاسم :",
  "رقم الجوال  :",
  "صله القرابه :",
  "اللوكيشن:",
  "تاريخ البلاغ :",
];

const Detail_Report = () => {
  const theme = useTheme();
  const location = useLocation();
  const [data, setData] = React.useState({});
  let id = location?.state?.id;

  const getData = async () => {
    const res = await postApi("/get_complain_by_id", { id: id });
    setData(res[0]);
    console.log(res, "resss");
  };
  React.useEffect(() => {
    getData();
  }, []);
  const del = async () => {
    await postApi("/cancel_complain", { id: id });
    getData();
  };
  const [imageSrc, setImageSrc] = useState("");

  // useEffect(() => {
  //   console.log("first", imageSrc);
  //   postApi(`/image`, { filename: data.img })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.ok) {
  //         return response.blob();
  //       }
  //       throw new Error("Image not found");
  //     })
  //     .then((blob) => {
  //       console.log(blob, "blob");
  //       const imageUrl = URL.createObjectURL(blob);
  //       setImageSrc(imageUrl);
  //     })
  //     .catch((error) => console.error(error));
  // }, [data.img]);
  return (
    <Box className="detail_report">
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            mt: "20px",
            mb: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              background: "#eee",
              borderRadius: "10px",
              boxShadow: "3px 5px 12px #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width="100%"
              height="100%"
              style={{
                margin: "auto",
                display: "block",
                maxHeight: "500px",
                maxWidth: "1000px",
              }}
              src={backEnd + "/image?img=" + data.img}
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                direction: "rtl",
                justifyContent: "space-between",
                mt: "15px",
                mb: "15px",
              }}
            >
              <ul>
                {dataName1.map((el, indx) => {
                  return (
                    <li
                      key={indx}
                      style={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      {el}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <li style={{ marginBottom: "10px" }}> {data.name}</li>

                <li style={{ marginBottom: "10px" }}>{data.name}</li>
                <li style={{ marginBottom: "10px" }}> {data.age}</li>
                <li style={{ marginBottom: "10px" }}> {data.description}</li>
                <li style={{ marginBottom: "10px" }}> {data.clothes_color} </li>
              </ul>
            </Box>
            <Header
              title="معلومات المبلغ"
              textCenter="center"
              textColor="#fff"
              bgColor={theme.palette.blue}
              pad="8px 2px"
            />
            <Box
              sx={{
                display: "flex",
                width: "300px",
                direction: "rtl",
                justifyContent: "space-between",
                mt: "15px",
                mb: "15px",
              }}
            >
              <ul>
                {dataName2.map((el, indx) => {
                  return (
                    <li
                      key={indx}
                      style={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      {el}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <li style={{ marginBottom: "10px" }}>
                  {" "}
                  {data.passport ?? " "}
                </li>
                <li style={{ marginBottom: "10px" }}> {data.user ?? " "}</li>
                <li style={{ marginBottom: "10px" }}>
                  {data.user_phone ?? ""}
                </li>
                <li style={{ marginBottom: "10px" }}>
                  {" "}
                  {data.relation ?? " "}
                </li>
                <li style={{ marginBottom: "10px" }}> {data.city ?? " "} </li>
                <li style={{ marginBottom: "10px" }}> {data.date} </li>
              </ul>
            </Box>
            {data.status === null ? (
              <Box sx={{ textAlign: "center", mt: "10px", mb: "10px" }}>
                <Button
                  onClick={del}
                  sx={{
                    width: "120px",
                    display: "inline-block",
                    mr: "10px",
                    background: theme.palette.red,
                    color: "#fff",
                    fontWeight: "bold",
                    ["&:hover"]: {
                      background: theme.palette.red,
                      color: "#fff",
                      boxShadow: "2px 4px 6px #999",
                    },
                  }}
                >
                  رفض
                </Button>
                <Button
                  sx={{
                    width: "120px",
                    background: theme.palette.green,
                    color: "#fff",
                    fontWeight: "bold",
                    ["&:hover"]: {
                      background: theme.palette.green,
                      color: "#fff",
                      boxShadow: "2px 4px 6px #999",
                    },
                  }}
                >
                  قبول
                </Button>
              </Box>
            ) : (
              <Header
                title="تم رفض البلاغ"
                textCenter="center"
                textColor="#fff"
                bgColor={theme.palette.red}
                pad="8px 2px"
              />
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Detail_Report;
