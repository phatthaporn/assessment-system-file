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
import { CatchingPokemon, Delete, Edit, Tune, Visibility } from "@mui/icons-material";
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

function Facultymajor() {
  const [openAddFacultymajor, setOpenAddFacultymajor] = useState(false);
  const [openEditFacultymajor, setOpenEditFacultymajor] = useState(false);
  const [openDeleteFacultymajor, setOpenDeleteFacultymajor] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [faculty, setFaculty] = useState([]);
  const [facultymajor, setFacultymajor] = useState([]);
  const [addFacultymajor, setAddFacultymajor] = useState({name: "", facultyId: ""});
  const [editFacultymajor, setEditFacultymajor] = useState({
    id: "",
    name: "",
  });
  const [deleteFacultymajor, setDeleteFacultymajor] = useState("");

  const getFacultymajor = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/faculty-major/get-all`);
      if (data.status === "success") {
        setFacultymajor(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadFaculty = async () => {
      try {
          const { data } = await axios.get(`${hostname}/api/faculty/get-all`);
          console.log(data.result)
          if(data.status === "success") {
              setFaculty(data.result);
              setOpenAddFacultymajor(true);
          }
      } catch(err) {alert(err)}
  }

  const createFacultymajor = async () => {
    try {
        console.log(addFacultymajor.name)
      const { data } = await axios.post(
        `${hostname}/api/faculty-major/create`,
        {
          name: addFacultymajor.name,
          facultyId: addFacultymajor.facultyId
        }
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "เพิ่มสาขาสำเร็จ",
        });
        setOpenAddFacultymajor(false)
        setFacultymajor([])
        getFacultymajor();
        setAddFacultymajor({name: "", facultyId: ""})
      }
    } catch (err) {
      alert(err);
    }
  };

  const updateFacultymajor = async () => {
    try {
        console.log(editFacultymajor.name)
      const { data } = await axios.put(
        `${hostname}/api/faculty-major/update/${editFacultymajor.id}`,
        {
          name: editFacultymajor.name,
        facultyId: editFacultymajor.facultyId
        }
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "แก้ไขชื่อสาขาสำเร็จ",
        });
        getFacultymajor();
        setEditFacultymajor({ id: "", name: "" })
        setOpenEditFacultymajor(false);
        setEditFacultymajor([])
      }
    } catch (err) {
      alert(err);
    }
  };

  const destroyFacultymajor = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/faculty-major/destroy/${deleteFacultymajor}`
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "ลบสาขาสำเร็จ",
        });
        getFacultymajor();
        setDeleteFacultymajor("");
        setOpenDeleteFacultymajor(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFacultymajor();
  }, []);

  return (
    <Box>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{
            mr: { md: "10px" },
            mt: { md: "15px", xs: "15px" },
            mb: { xs: "20px", md: "15px" },
          }}
          onClick={() => {
            loadFaculty();
            
          }}
        >
          <AddCircleIcon fontSize="small" sx={{ mr: "5px" }} />
          เพิ่มสาขา
        </Button>
      </Grid>

      <Box justify="center" sx={{ p: { md: "10px" } }}>
        <MUIDataTable
          title={"ตารางสาขาทั้งหมด"}
          data={facultymajor}
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
              label: "ชื่อสาขา",
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
              name: "updateedAt",
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
                  let rowData = facultymajor[dataIndex];
                  return (
                    <>
                      <IconButton
                        onClick={() => {
                          setOpenEditFacultymajor(true);
                          setEditFacultymajor({
                            id: rowData.id,
                            name: rowData.name,
                          });
                        }}
                        size="large"
                      >
                        <Edit fontSize="madium" color="warning" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setOpenDeleteFacultymajor(true);
                          setDeleteFacultymajor(rowData.id);
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
        <Dialog
          open={openAddFacultymajor}
          onClose={() => setOpenAddFacultymajor(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{"เพิ่มสาขา"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container sx={{ mt: "2%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                     value={addFacultymajor.name}
                     size="small"
                     fullWidth
                     label="ชื่อสาขา"
                     variant="outlined"
                     onChange={(e) => setAddFacultymajor({ ...addFacultymajor, ["name"]: e.target.value})}
                    />
                    <TextField
                     value={addFacultymajor.facultyId}
                     sx={{ mt: 1 }}
                     size="small"
                     fullWidth
                     select
                     label="ชื่อคณะ"
                     variant="outlined"
                     onChange={(e) => setAddFacultymajor({ ...addFacultymajor, ["facultyId"]: e.target.value})}
                    >
                        {faculty && faculty.map((item) => {
                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        })}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={() => setOpenAddFacultymajor(false)}
                color="danger"
                variant="outlined"
              >
                ยกเลิก
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => createFacultymajor()}
              >
                เพิ่มสาขา
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>

      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />

      <Dialog
        open={openEditFacultymajor}
        onClose={() => setOpenEditFacultymajor(true)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{"แก้ไขสาขา"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container sx={{ mt: "2%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="ชื่อสาขา"
                    variant="outlined"
                    required
                    value={editFacultymajor.name}
                    onChange={(e) => {
                      setEditFacultymajor({
                        ...editFacultymajor,
                        name: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "15px", mb: "15px" }}>
          <Button
            onClick={() => setOpenEditFacultymajor(false)}
            color="inherit"
          >
            ยกเลิก
          </Button>
          <Button
            color="success"
            variant="contained"
            // disabled={() => updateFacultymajor()}
            onClick={() => updateFacultymajor()}
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteFacultymajor}
        onClose={() => setOpenDeleteFacultymajor(false)}
        maxWidth="xl"
      >
        <DialogTitle>ลบสาขา</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
          <Button
            onClick={() => setOpenDeleteFacultymajor(false)}
            color="inherit"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={() => destroyFacultymajor()}
            color="danger"
            veriant="contained"
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Facultymajor;
