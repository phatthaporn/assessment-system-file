import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const HomeCard = ({ itemThree, itemTwo, itemOne, roleId }) => {
  const shadowSetting =
    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)";
  return (
    <>
      {roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c" ? (
        <Grid container>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "120px",
                borderRadius: "12px",
                boxShadow: shadowSetting,
                borderRight: "10px solid #982d07",
                m: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid
                  xs={7}
                  sx={{ display: "flex", flexDirection: "column", m: 2 }}
                >
                  <Typography variant="h6">แบบประเมินทั้งหมด</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {`${itemOne}`} แบบประเมิน
                  </Typography>
                </Grid>
                <Grid
                  xs={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mr: 4,
                    mt: 1,
                  }}
                >
                  <img
                    src="/image/itemOne.svg"
                    alt=""
                    style={{ height: "100px" }}
                  />
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "120px",
                borderRadius: "12px",
                boxShadow: shadowSetting,
                borderRight: "10px solid #982d07",
                m: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid
                  xs={7}
                  sx={{ display: "flex", flexDirection: "column", m: 2 }}
                >
                  <Typography variant="h6">ประเมินเดือนนี้</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {`${itemTwo}`} ครั้ง
                  </Typography>
                </Grid>
                <Grid
                  xs={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mr: 4,
                    mt: 1,
                  }}
                >
                  <img
                    src="/image/itemTwo.svg"
                    alt=""
                    style={{ height: "100px" }}
                  />
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "120px",
                borderRadius: "12px",
                boxShadow: shadowSetting,
                borderRight: "10px solid #982d07",
                m: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid
                  xs={7}
                  sx={{ display: "flex", flexDirection: "column", m: 2 }}
                >
                  <Typography variant="h6">ผู้ใช้งานระบบทั้งหมด</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {`${itemThree}`} ผู้ใช้
                  </Typography>
                </Grid>
                <Grid
                  xs={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mr: 4,
                    mt: 1,
                  }}
                >
                  <img
                    src="/image/itemThree.svg"
                    alt=""
                    style={{ height: "100px" }}
                  />
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      ) : <Grid container>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            height: "120px",
            borderRadius: "12px",
            boxShadow: shadowSetting,
            borderRight: "10px solid #982d07",
            m: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Grid
              xs={7}
              sx={{ display: "flex", flexDirection: "column", m: 2 }}
            >
              <Typography variant="h6">แบบประเมินของฉัน</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {`${itemOne}`} แบบประเมิน
              </Typography>
            </Grid>
            <Grid
              xs={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 4,
                mt: 1,
              }}
            >
              <img
                src="/image/itemOne.svg"
                alt=""
                style={{ height: "100px" }}
              />
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            height: "120px",
            borderRadius: "12px",
            boxShadow: shadowSetting,
            borderRight: "10px solid #982d07",
            m: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Grid
              xs={7}
              sx={{ display: "flex", flexDirection: "column", m: 2 }}
            >
              <Typography variant="h6">จำนวนการประเมิน</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {`${itemTwo}`} ครั้ง
              </Typography>
            </Grid>
            <Grid
              xs={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 4,
                mt: 1,
              }}
            >
              <img
                src="/image/itemTwo.svg"
                alt=""
                style={{ height: "100px" }}
              />
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>}
    </>
  );
};
