import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { hostname, hostURL } from "../hostname";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "../utils/Snackbar";
import QRCode from "react-qr-code";

function AssessmentAll({ roleId }) {
  const [assessment, setAssessment] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

  const getAssessment = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/assessment/get-all`);
      if (data.status === "success") {
        setAssessment(data.result);
        console.log(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setPublish = async (index) => {
    try {
      const { data } = await axios.post(`${hostname}/api/assessment/set-publish/${assessment[index].id}`, {publish: !assessment[index].publish});
      if(data.status === "success") {
        let items = [...assessment];
        items[index].publish = !items[index].publish;
        setAssessment(items);
      }
    }catch(err) {
      alert(err)
    }
  }

  useEffect(() => {
    getAssessment();
  }, []);
  return (
    <Box>
      <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <div>{roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c" ? "แบบประเมินทั้งหมด" : "แบบประเมินของฉัน"}</div>
        </Breadcrumbs>
      </Box>
      <Box justify="center" sx={{ p: { md: "10px" } }}>
        <MUIDataTable
          title={roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c" ? "แบบประเมินทั้งหมด" : "แบบประเมินของฉัน"}
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
              name: "",
              label: "เผยแพร่",
              options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (index) => <Switch checked={assessment[index]?.publish} color="success" onClick={() => setPublish(index)} />,
              },
            },
            {
              name: "title",
              label: "ชื่อแบบประเมิน",
            },
            {
              name: "faculty_major",
              label: "คณะ",
              options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => `${value?.faculty?.name}`,
              },
            },
            {
              name: "faculty_major",
              label: "สาขา",
              options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => `${value?.name}`,
              },
            },
            {
              name: "",
              label: "ผู้สร้างแบบประเมิน",
              options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (index) => {
                  let element = assessment[index];
                  return `${element.user.firstname}  ${element.user.lastname}`;
                },
              },
            },
            {
              name: "",
              label: "จัดการ",
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
                          setShareLink(`${hostURL}/assessment/${element.id}`);
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
      </Box>
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
          {/* <Button
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
          </Button> */}
          <Button
            sx={{ mr: 1}}
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

export default AssessmentAll;
