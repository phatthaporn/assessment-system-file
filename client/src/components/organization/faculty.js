import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material/";
import MUIDataTable from "mui-datatables";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Snackbar from "../../utils/Snackbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { hostname } from "../../hostname";
import axios from "axios";
import moment from "moment";

function Faculty() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openEditFaculty, setOpenEditFaculty] = useState(false);
  const [openDeleteFaculty, setOpenDeleteFaculty] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [faculty, setFaculty] = useState([]);
  const [addFaculty, setAddFaculty] = useState("");
  const [editFaculty, setEditFaculty] = useState({ id: "", name: "" });
  const [deleteFaculty, setDeleteFaculty] = useState("");

  const getFaculty = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/faculty/get-all`);
      if (data.status === "success") {
        setFaculty(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createFaculty = async () => {
    try {
      const { data } = await axios.post(`${hostname}/api/faculty/create`, {
        name: addFaculty,
      });
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "เพิ่มคณะสำเร็จ",
        });
        getFaculty();
        setAddFaculty("");
        setOpenAddFaculty(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const updateFaculty = async () => {
    try {
      const { data } = await axios.put(
        `${hostname}/api/faculty/update/${editFaculty.id}`,
        {
          name: editFaculty.name,
        }
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "แก้ไขชื่อคณะสำเร็จ",
        });
        getFaculty();
        setEditFaculty({ id: "", name: "" });
        setOpenEditFaculty(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const destroyFaculty = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/faculty/destroy/${deleteFaculty}`
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "ลบคณะสำเร็จ",
        });
        getFaculty();
        setDeleteFaculty("");
        setOpenDeleteFaculty(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFaculty();
  }, []);

  return (
    <Box>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{
            boxShadow: 0,
            borderRadius: "3px",
            mr: { md: "10px" },
            mt: { md: "15px", xs: "15px" },
            mb: { xs: "20px", md: "15px" },
          }}
          onClick={() => setOpenAddFaculty(true)}
        >
          <AddCircleIcon fontSize="small" sx={{ mr: "5px" }} />
          เพิ่มคณะ
        </Button>
      </Grid>

      <Box justify="center" sx={{ p: { md: "10px" } }}>
        <MUIDataTable
          title={"ตารางคณะทั้งหมด"}
          data={faculty}
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
              name: "name",
              label: "ชื่อคณะ",
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
              name: "updatedAt",
              label: "วันที่แก้ไข",
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value) =>
                  `${moment(value).format("DD/MM/YYYY HH:mm")} น.`,
              },
            },
            {
              name: "",
              label: "จัดการ",
              options: {
                customBodyRenderLite: (dataIndex) => {
                  let rowData = faculty[dataIndex];
                  return (
                    <>
                      <IconButton
                        onClick={() => {
                          setOpenEditFaculty(true);
                          setEditFaculty({
                            id: rowData.id,
                            name: rowData.name,
                          });
                        }}
                        size="large"
                      >
                        <Edit fontSize="medium" color="warning" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setOpenDeleteFaculty(true);
                          setDeleteFaculty(rowData.id);
                        }}
                        size="large"
                      >
                        <Delete fontSize="medium" color="danger" />
                      </IconButton>
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
        open={openAddFaculty}
        onClose={() => setOpenAddFaculty(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{"เพิ่มคณะ"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container sx={{ mt: "2%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={addFaculty}
                    sx={{ mt: -1, mb: 2 }}
                    size="small"
                    fullWidth
                    label="ชื่อคณะ"
                    variant="outlined"
                    required
                    onChange={(e) => setAddFaculty(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => setOpenAddFaculty(false)}
              color="danger"
              variant="outlined"
            >
              ยกเลิก
            </Button>
            <Button
              color="success"
              variant="contained"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
              onClick={() => createFaculty()}
            >
              เพิ่มคณะ
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditFaculty}
        onClose={() => setOpenEditFaculty(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{"แก้ไขคณะ"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container sx={{ mt: "2%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="ชื่อคณะ"
                    variant="outlined"
                    required
                    value={editFaculty.name}
                    onChange={(e) => {
                      setEditFaculty({ ...editFaculty, name: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "15px", mb: "15px" }}>
          <Button onClick={() => setOpenEditFaculty(false)} color="inherit">
            ยกเลิก
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ boxShadow: 0, borderRadius: "3px" }}
            disabled={editFaculty.name === ""}
            onClick={() => updateFaculty()}
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteFaculty}
        onClose={() => setOpenDeleteFaculty(false)}
        maxWidth="xl"
      >
        <DialogTitle>ลบคณะ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
          <Button onClick={() => setOpenDeleteFaculty(false)} color="inherit">
            ยกเลิก
          </Button>
          <Button
            onClick={() => destroyFaculty()}
            color="danger"
            variant="contained"
            sx={{ boxShadow: 0, borderRadius: "3px" }}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Faculty;
