import React, { useState, useEffect } from "react";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from '../utils/Snackbar';
import { Box } from "@mui/system";
import axios from "axios";
import { hostname } from "../hostname";

function Password() {
  const [profile, setProfile] = useState({});
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState({ status: false, type: "", msg: "" });

  const getProfile = async () => {
    try {
      const storage = localStorage.getItem("USER_PROFILE");
      setProfile(JSON.parse(storage));
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (prop) => (event) => {
    console.log(password);
    setPassword({ ...password, [prop]: event.target.value });
  };

  const resetPassword = async() => {
    if(password.newPassword.length < 5) {
        alert("รหัสผ่านควรมีมากกว่า 5 ตัวอักษร!");
        return;
    }
    if(password.newPassword !== password.confirmPassword) {
        alert("รหัสไม่สอดคล้องกัน!");
        return;
    }
    try {
        const formData = {
            password: password.newPassword,
            oldPassword: password.oldPassword
        }
        const {data} = await axios.post(`${hostname}/api/auth/reset-password`, formData);
        if(data.status === "success") {
            setOpenSnackbar({ status: true, type: "success", msg: "เปลี่ยนรหัสผ่านสำเร็จ" });
            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
        }else {
            alert("รหัสผ่านเดิมไม่ถูกต้อง!");
        }
    }catch(err) {
        alert(err)
    }
  }

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div style={{ marginTop: "10px" }}>
      <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <div>เปลี่ยนรหัสผ่าน</div>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          m: 1,
        }}
      >
        <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: "5px",
              mt: 10,
              m: 1,
              p: 2,
              border: "2px solid #DCDCDC",
              display: "flex",
              flexDirection: "column",
              
            }}
          >
            <Stack display="flex" sx={{ justifyContent: "center" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center", mb: 3 }}
              >
                เปลี่ยนรหัสผ่าน
              </Typography>
              <TextField
                value={password.oldPassword}
                size="small"
                label="รหัสผ่านเดิม"
                variant="outlined"
                type="password"
                onChange={handleChange("oldPassword")}
              ></TextField>
              <TextField
                value={password.newPassword}
                sx={{ marginTop: "20px" }}
                size="small"
                label="รหัสผ่านใหม่"
                variant="outlined"
                type="password"
                onChange={handleChange("newPassword")}
              ></TextField>
              <TextField
                value={password.confirmPassword}
                sx={{ marginTop: "20px" }}
                size="small"
                label="ยืนยันรหัสผ่าน"
                variant="outlined"
                type="password"
                onChange={handleChange("confirmPassword")}
              ></TextField>
            </Stack>
            <Button
              color="success"
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
              onClick={resetPassword}
            >
              <SaveIcon fontSize="small" sx={{ mr: "5px" }} />
              เปลี่ยนรหัสผ่าน
            </Button>
          </Box>
        </Grid>
        </Grid>
       
        <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
      </Box>
    </div>
  );
}

export default Password;
