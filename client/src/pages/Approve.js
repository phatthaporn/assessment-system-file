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
          msg: "????????????????????????????????????????????????",
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
          msg: "??????????????????????????????????????????????????????",
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
        >
          <>?????????????????????????????????????????????????????????</>
        </Breadcrumbs>
      </Box>
      <Box justify="center" sx={{ p: { md: "10px" } }}>
        <MUIDataTable
          title={"?????????????????????????????????????????????????????????????????????????????????"}
          data={allUser}
          options={{
            viewColumns: false,
            filter: true,
            print: false,
            download: false,
            selectableRows: false,
            textLabels: {
              body: {
                noMatch: "?????????????????????????????????",
              },
            },
          }}
          columns={[
            {
              name: "status",
              label: "???????????????",
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
                          ? "???????????????????????????????????????????????????????????????"
                          : "?????????????????????????????????????????????????????????"}
                      </Typography>
                    </>
                  );
                },
              },
            },
            {
              name: "firstname",
              label: "????????????",
            },
            {
              name: "lastname",
              label: "?????????????????????",
            },
            {
              name: "email",
              label: "???????????????",
            },
            {
              name: "role",
              label: "?????????????????????????????????????????????",
              options: {
                customBodyRender: value => `${value === null ? "????????????????????????????????????????????????????????????" : value.display_name}`
              }
            },
            {
              name: "",
              label: "??????????????????",
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
          >
            {"???????????????????????????????????????????????????????????????"}
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                justifyContent: "start",
                color: "red",
              }}
            >
              ??????????????????????????????????????????????????????????????????????????????????????????????????????*
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
                        label="????????????"
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
                        label="???????????????"
                        component="h6"
                        href="#basic-chip"
                        sx={{ mx: 2, cursor: "default" }}
                        clickable
                      />
                      {`${selectUser?.email}`}
                    </Typography>
                    <TextField
                      label="?????????????????????????????????????????????"
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
                      sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                      fullWidth
                      onClick={() => sendApproveUser()}
                    >
                      ?????????????????????????????????????????????????????????
                    </Button>
                    <Button
                      color="danger"
                      variant="contained"
                      sx={{ mt: 1, boxShadow: 0, borderRadius: "3px" }}
                      fullWidth
                      onClick={() => setOpenApproveDialog(false)}
                    >
                      ??????????????????
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
          <DialogTitle>??????????????????????????????????????????</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>???????????????????????????????????????????????????????????????????????????????????????????????????????????? ?</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="success"
              variant="outlined"
            >
              ??????????????????
            </Button>
            <Button onClick={deleteUser} color="danger" variant="contained" sx={{ boxShadow: 0, borderRadius: "3px" }}>
              ????????????
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </Fragment>
  );
}

export default Approve;
