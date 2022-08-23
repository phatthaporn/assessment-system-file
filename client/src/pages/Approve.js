import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useState, useEffect, Fragment } from "react";
import { hostname } from "../hostname";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Snackbar from "../utils/Snackbar";

function Approve() {
  const [allUser, setAllUser] = useState([]);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectUser, setSelectUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [roles, setRoles] = useState([]);

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/auth/get-unapprove`);
      setAllUser(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const openApprove = async (user) => {
    try {
      setSelectUser({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
      const { data } = await axios.get(`${hostname}/api/auth/get-roles`);
      setRoles(data.result);
      setOpenApproveDialog(true);
    } catch (err) {
      alert(err);
    }
  };

  const sendApproveUser = async () => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/auth/approve/${selectUser.id}`,
        { roleId: selectUser.roleId }
      );
      if (data.status === "success") {
        setSelectUser({
          id: "",
          firstname: "",
          lastname: "",
          email: "",
        });
        setAllUser([]);
        getAllUser();
        setOpenApproveDialog(false);
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "เปิดใช้งานสำเร็จ",
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const sendUnApproveUser = async (userData) => {
    try {
      setSelectUser(userData);
      setOpenDeleteDialog(true);
    } catch (err) {
      alert(err);
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/auth/un-approve/${selectUser.id}`
      );
      if (data.status === "success") {
        setSelectUser({
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          roleId: "",
        });
        setAllUser([]);
        getAllUser();
        setOpenDeleteDialog(false);
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "ดำเนินการเสร็จสิ้น",
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <Fragment style={{ marginTop: "10px" }}>
      <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          onClick={() => console.log(allUser)}
        >
          <>จัดการผู้ใช้งานระบบ</>
        </Breadcrumbs>
      </Box>
      <Box justify="center" sx={{ p: { md: "10px" } }}>
        <MUIDataTable
          title={"ตารางการจัดการผู้ใช้งานระบบ"}
          data={allUser}
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
              name: "status",
              label: "สถานะ",
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                  return (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: value === 0 ? "red" : "green" }}
                      >
                        {value === 0
                          ? "ยังไม่ยืนยันการใช้งาน"
                          : "ยืนยันการใช้งานแล้ว"}
                      </Typography>
                    </>
                  );
                },
              },
            },
            {
              name: "firstname",
              label: "ชื่อ",
            },
            {
              name: "lastname",
              label: "นามสกุล",
            },
            {
              name: "email",
              label: "อีเมล",
            },
            {
              name: "role",
              label: "สิทธิ์ผู้ใช้งาน",
              options: {
                customBodyRender: value => `${value === null ? "ยังไม่มีสิทธิ์ใช้งาน" : value.display_name}`
              }
            },
            {
              name: "",
              label: "จัดการ",
              options: {
                customBodyRenderLite: (dataIndex) => {
                  let rowData = allUser[dataIndex];
                  return (
                    <>
                      {rowData.status === 0 ? (
                        <IconButton
                          size="large"
                          onClick={() => openApprove(rowData)}
                        >
                          <VerifiedUserIcon fontSize="medium" color="success" />
                        </IconButton>
                      ) : null}

                      <IconButton
                        size="large"
                        onClick={() => sendUnApproveUser(rowData)}
                      >
                        <Delete fontSize="medium" color="danger" />
                      </IconButton>
                    </>
                  );
                },
              },
            },
          ]}
        ></MUIDataTable>
        <Dialog
          open={openApproveDialog}
          onClose={() => setOpenApproveDialog(false)}
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "Bold" }}
            onClick={() => console.log(selectUser)}
          >
            {"จัดการสิทธิ์ผู้ใช้งาน"}
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                justifyContent: "start",
                color: "red",
              }}
            >
              ตรวจสอบข้อมูลก่อนการยืนยันทุกครั้ง*
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container sx={{ mt: "2%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label="ชื่อ"
                        component="h6"
                        href="#basic-chip"
                        sx={{ mx: 2, cursor: "default" }}
                        clickable
                      />
                      {`${selectUser?.firstname}  ${selectUser?.lastname}`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label="อีเมล"
                        component="h6"
                        href="#basic-chip"
                        sx={{ mx: 2, cursor: "default" }}
                        clickable
                      />
                      {`${selectUser?.email}`}
                    </Typography>
                    <TextField
                      label="สิทธิ์ผู้ใช้งาน"
                      size="small"
                      select
                      required
                      fullWidth
                      onChange={(e) => setSelectUser({...selectUser, ['roleId']: e.target.value})}
                    >{roles?.length !== 0 && roles.map(item => {
                      return <MenuItem key={item.id} value={item.id}>{item.display_name}</MenuItem>
                    })}</TextField>
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ mt: 3 }}
                      fullWidth
                      onClick={() => sendApproveUser()}
                    >
                      ยืนยันการเปิดใช้งาน
                    </Button>
                    <Button
                      color="danger"
                      variant="contained"
                      sx={{ mt: 1 }}
                      fullWidth
                      onClick={() => setOpenApproveDialog(false)}
                    >
                      ยกเลิก
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="xl"
        >
          <DialogTitle>ยกเลิกบัญชีนี้</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="success"
              variant="outlined"
            >
              ยกเลิก
            </Button>
            <Button onClick={deleteUser} color="danger" variant="contained">
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </Fragment>
  );
}

export default Approve;
