import { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Stack,
} from "@mui/material/";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { hostname } from "../hostname";
import Snackbar from "../utils/Snackbar";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
});

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
  };

  const onClickLogin = async () => {
    try {
      const { data } = await axios.post(`${hostname}/api/auth/sign-in`, {
        email: userData.username,
        password: userData.password,
      });
      if (data.status === "Authenticated") {
        localStorage.setItem("Authenticated", "Authenticated");
        localStorage.setItem("TOKEN", data.token);
        localStorage.setItem("USER_PROFILE", JSON.stringify(data.user_profile));
        window.location.href = "/home";
      }
      if (data.status === "UnAuthenticated") {
        setOpenSnackbar({
          status: true,
          type: "error",
          msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRegister = async () => {
    if(userData.firstname === "" || userData.lastname === "" || userData.email === "" || userData.password === "" || userData.checkPassword === "") {
      alert("กรุณากรอกข้อมูลให้ครบ!")
      return;
    }
    if(userData.password !== userData.checkPassword) {
      alert("รหัสผ่านไม่สอดคล้องกัน!");
      return;
    }
    try {
      const { data } = await axios.post(`${hostname}/api/auth/sign-up`, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password
      });
      if(data.status === "success") {
        Swal.fire({
          icon: 'success',
          title: `สมัครสมาชิกสำเร็จ`,
          text: `โปรดรอผู้ดูแลระบบยืนยันการใช้งานระบบ`
        }).then(result => {
          if(result.isConfirmed) {
            window.location.href = "/login";
          }
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'สมัครสมาชิกไม่สำเร็จ',
        text: 'มีผู้ใช้อีเมลล์นี้อยู่ในระบบแล้ว กรุณาติดต่อผู้ดูแลระบบ',
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url(${"/image/download-4.svg"})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };

  return (
    <>
      <Box style={styles.paperContainer}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <Box
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "5px",
              marginTop: "-50px",
            }}
          >
            <Stack
              direction="column"
              spacing={3}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Stack direction={{ xs: "column", md: "row" }}>
                <img
                  src="/image/RMUTI_LOGO.png"
                  alt=""
                  style={{ height: "11rem" }}
                />
              </Stack>
              <Typography variant="h6">สมัครสมาชิก</Typography>
              <Typography variant="subtitle2" sx={{ marginTop: "-20px" }}>
                มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
              </Typography>
              <Stack direction="column" spacing={2} my={1}>
                <TextField
                  size="small"
                  required
                  onChange={handleChange("firstname")}
                  sx={{ width: "30ch" }}
                  label="ชื่อจริง"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  required
                  onChange={handleChange("lastname")}
                  sx={{ width: "30ch" }}
                  label="นามสกุล"
                  variant="outlined"
                />
                <TextField
                  size="small"
                  required
                  onChange={handleChange("email")}
                  sx={{ width: "30ch" }}
                  label="อีเมล"
                  variant="outlined"
                />
                <FormControl
                  required
                  sx={{ width: "30ch" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    type={userData.showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {userData.showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="รหัสผ่าน"
                  />
                </FormControl>
                <FormControl
                  required
                  sx={{ width: "30ch" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    ยืนยันรหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    type={userData.showPassword ? "text" : "password"}
                    value={userData.checkPassword}
                    onChange={handleChange("checkPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {userData.showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="รหัสผ่าน"
                  />
                </FormControl>
              </Stack>
              <Button
                onClick={onClickRegister}
                variant="contained"
                color="rmuti"
                fullWidth
              >
                สมัครสมาชิก
              </Button>
              <Link
                to="/login"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button variant="contained" color="warning" fullWidth>
                  ไปที่หน้าเข้าสู่ระบบ
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </>
  );
}

export default Register;
