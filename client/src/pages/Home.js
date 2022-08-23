import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { HomeCard } from "../components/home/HomeCard";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { hostname, hostURL } from "../hostname";
import moment from "moment";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "../utils/Snackbar";
import QRCode from "react-qr-code";

function Home({roleId}) {
  const [profile, setProfile] = useState({});
  const [itemOne, setItemOne] = useState(0);
  const [itemTwo, setItemTwo] = useState(0);
  const [itemThree, setItemThree] = useState(0);
  const [assessment, setAssessment] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

  const getProfile = async () => {
    setProfile(JSON.parse(localStorage.getItem("USER_PROFILE")));
    const { data } = await axios.get(`${hostname}/api/assessment/home-info`);
    if (data.status === "success") {
      setItemOne(data.allAssessment.length);
      setItemTwo(data.allDoAssessment.length);
      setItemThree(data.allUsers.length);
      setAssessment(data.tableAssessment);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={12}>
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Grid
              item
              xs={8}
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ยินดีต้อนรับสู่ระบบประเมินผลโครงการคณะวิศวกรรมศาสตร์
              </Typography>
              <Typography variant="body2">
                ผู้ใช้งาน :{" "}
                {`${profile?.firstname} ${profile?.lastname} (${profile?.email})`}
              </Typography>
              <Typography variant="body2">
                สังกัด : มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
              </Typography>
            </Grid>
          </Stack>
          <HomeCard itemOne={itemOne} itemTwo={itemTwo} itemThree={itemThree} roleId={roleId} />
          <Grid container>
            <Grid item xs={12} sx={{ mx: 2 }}>
              <MUIDataTable
                title={roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c" ? "แบบประเมินที่ยังเปิดใช้งานอยู่" : "แบบประเมินที่ยังเปิดใช้อยู่ของฉัน"}
                data={assessment}
                options={{
                  viewColumns: false,
                  filter: true,
                  print: false,
                  download: false,
                  selectableRows: false,
                  textLabels: {
                    body: {
                      noMatch: "ไม่พบข้อมูล",
                    },
                  },
                }}
                columns={[
                  {
                    name: "title",
                    label: "หัวข้อประเมิน",
                  },
                  {
                    name: "assessment_conditions",
                    label: "จำนวนข้อทั้งหมด",
                    options: {
                      filter: false,
                      sort: false,
                      customBodyRender: (value) => {
                        return `${value.length} หัวข้อ`;
                      },
                    },
                  },
                  {
                    name: "createdAt",
                    label: "วันที่สร้าง",
                    options: {
                      filter: true,
                      sort: true,
                      customBodyRender: (value) =>
                        `${moment(value).format("DD/MM/YYYY HH:mm")} น.`,
                    },
                  },
                  {
                    name: "",
                    label: "แชร์",
                    options: {
                      customBodyRenderLite: (index) => {
                        let element = assessment[index];
                        return (
                          <>
                            <ShareIcon
                              sx={{ cursor: "pointer" }}
                              size="large"
                              color="success"
                              onClick={() => {
                                setShareLink(
                                  `${hostURL}/assessment/${element.id}`
                                );
                                setOpenShare(true);
                              }}
                            />
                          </>
                        );
                      },
                    },
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
      <Dialog
        open={openShare}
        onClose={() => setOpenShare(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle display="flex" justifyContent="center">
          {"แชร์ลิ้งค์แบบประเมิน"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack display="flex" sx={{ textDecoration: "row" }}>
              {shareLink !== "" ? (
                <QRCode
                  fgColor="#982d07"
                  size={parseInt(200)}
                  value={`${shareLink}`}
                />
              ) : null}
              <TextField
                size="small"
                value={shareLink}
                sx={{ mt: 2 }}
                inputProps={{ readOnly: true }}
                fullWidth
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ diplay: "flex", flexDirection: "column" }}>
          <Button
            sx={{ mb: 1 }}
            color="success"
            variant="contained"
            fullWidth
            onClick={() => {
              navigator.clipboard.writeText(shareLink).then(() =>
                setOpenSnackbar({
                  status: true,
                  type: "success",
                  msg: "บันทึกลิ้งค์ในคลิปบอร์ดแล้ว",
                })
              );
            }}
          >
            copy path to clipboard
          </Button>
          <Button
            sx={{ mr: 1 }}
            onClick={() => setOpenShare(false)}
            color="rmuti"
            variant="contained"
            fullWidth
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
