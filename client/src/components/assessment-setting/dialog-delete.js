import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

function DeleteDialog({ deleteToggle, setDeleteToggle, deleteFunction}) {
    return <Dialog
    open={deleteToggle}
    onClose={() => setDeleteToggle(false)}
    maxWidth="xl"
  >
    <DialogTitle>ลบคณะ</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?</Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
      <Button onClick={() => setDeleteToggle(false)} color="inherit">
        ยกเลิก
      </Button>
      <Button
        onClick={() => deleteFunction()}
        color="danger"
        variant="contained"
      >
        ตกลง
      </Button>
    </DialogActions>
  </Dialog>
}

export default DeleteDialog;