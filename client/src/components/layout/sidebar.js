import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LockIcon from "@mui/icons-material/Lock";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

function Sidebar({ roleId }) {
  return roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c" ? (
    <List>
      <ListItem button component={Link} to="/home">
        <ListItemIcon>
          <HomeIcon color="rmuti" titleAccess="หน้าหลัก" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="หน้าหลัก" />
      </ListItem>
      <ListItem button component={Link} to="/assessment">
        <ListItemIcon>
          <LibraryAddCheckIcon color="rmuti" titleAccess="แบบประเมินทั้งหมด" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="แบบประเมินทั้งหมด" />
      </ListItem>
      <ListItem button component={Link} to="/assessment-setup">
        <ListItemIcon>
          <NoteAddIcon color="rmuti" titleAccess="สร้างแบบประเมิน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="สร้างแบบประเมิน" />
      </ListItem>
      <ListItem button component={Link} to="/report">
        <ListItemIcon>
          <AutoGraphIcon color="rmuti" titleAccess="สรุปผลการประเมิน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="สรุปผลการประเมิน" />
      </ListItem>
      <ListItem button component={Link} to="/organization">
        <ListItemIcon>
          <CorporateFareIcon color="rmuti" titleAccess="จัดการข้อมูลทั่วไป" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="จัดการข้อมูลทั่วไป" />
      </ListItem>
      <ListItem button component={Link} to="/approve">
        <ListItemIcon>
          <HowToRegIcon color="rmuti" titleAccess="จัดการผู้ใช้งาน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="จัดการผู้ใช้งาน" />
      </ListItem>
      <ListItem button component={Link} to="/password">
        <ListItemIcon>
          <LockIcon color="rmuti" titleAccess="เปลี่ยนรหัสผ่าน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="เปลี่ยนรหัสผ่าน" />
      </ListItem>
    </List>
  ) : (
    // role stuff
    <List>
      <ListItem button component={Link} to="/home">
        <ListItemIcon>
          <HomeIcon color="rmuti" titleAccess="หน้าหลัก" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="หน้าหลัก" />
      </ListItem>
      <ListItem button component={Link} to="/assessment">
        <ListItemIcon>
          <LibraryAddCheckIcon color="rmuti" titleAccess="แบบประเมินของฉัน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="แบบประเมินของฉัน" />
      </ListItem>
      <ListItem button component={Link} to="/assessment-setup">
        <ListItemIcon>
          <NoteAddIcon color="rmuti" titleAccess="สร้างแบบประเมิน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="สร้างแบบประเมิน" />
      </ListItem>
      <ListItem button component={Link} to="/report">
        <ListItemIcon>
          <AutoGraphIcon color="rmuti" titleAccess="สรุปผลการประเมิน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="สรุปผลการประเมิน" />
      </ListItem>
      <ListItem button component={Link} to="/password">
        <ListItemIcon>
          <LockIcon color="rmuti" titleAccess="เปลี่ยนรหัสผ่าน" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#982d07" }} primaryTypographyProps={{ fontSize: "14px", fontWeight: "bold" }} primary="เปลี่ยนรหัสผ่าน" />
      </ListItem>
    </List>
  );
}

export default Sidebar;
