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
  Stack,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { hostname } from "../hostname";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "../utils/Snackbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import DeleteDialog from "../components/assessment-setting/dialog-delete";

function CreateAssessment() {
  const [faculty, setFaculty] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [facultyMajor, setFacultyMajor] = useState([]);
  const [facultyMajorId, setFacultyMajorId] = useState("");
  const [assessment, setAssessment] = useState([]);
  const [addAssessment, setAddAssessment] = useState({});
  const [openConditionDialog, setOpenConditionDialog] = useState(false);
  const [editAssessment, setEditAssessment] = useState({});
  const [editCondition, setEditCondition] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openCreateWithTemplate, setOpenCreateWithTemplate] = useState(false);
  const [templateData, setTemplateData] = useState(false);
  const [templateCondition, setTemplateCondition] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

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

  const getFacultyMajor = async (id) => {
    try {
      setFacultyId(id);
      const { data } = await axios.get(
        `${hostname}/api/faculty-major/get-where-faculty/${id}`
      );
      if (data.status === "success") {
        setFacultyMajor(data.result);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getAssessment = async (id) => {
    try {
      setFacultyMajorId(id);
      const { data } = await axios.get(
        `${hostname}/api/assessment/get-by-faculty-major/${id}`
      );
      if (data.status === "success") {
        setAssessment(data.result);
      }
    } catch (err) {
      alert(err);
    }
  };

  const setPublish = async (index) => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/assessment/set-publish/${assessment[index].id}`,
        { publish: !assessment[index].publish }
      );
      if (data.status === "success") {
        let items = [...assessment];
        items[index].publish = !items[index].publish;
        setAssessment(items);
      }
    } catch (err) {
      alert(err);
    }
  };

  const sendAddAssessment = async () => {
    try {
      const { data } = await axios.post(`${hostname}/api/assessment/create`, {
        title: addAssessment.title,
        sub_title: addAssessment.sub_title,
        conditions,
        facultyMajorId,
      });
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "เพิ่มแบบประเมินสำเร็จ",
        });
        setConditions([]);
        setAddAssessment({ title: "", sub_title: "" });
        setAssessment([]);
        getAssessment(facultyMajorId);
        setOpenConditionDialog(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const editAssessmentOpen = async (data) => {
    try {
      setEditAssessment({
        id: data.id,
        title: data.title,
        sub_title: data.sub_title,
      });
      setEditCondition(data.assessment_conditions);
      setOpenEditDialog(true);
    } catch (err) {
      alert(err);
    }
  };

  const destroyAssessment = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/assessment/delete/${deleteId}`
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "ลบแบบประเมินสำเร็จ",
        });
        setAssessment([]);
        getAssessment(facultyMajorId);
        setOpenDeleteDialog(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const updateAssessment = async () => {
    try {
      const { data } = await axios.put(
        `${hostname}/api/assessment/update/${editAssessment.id}`,
        {
          assessment: {
            title: editAssessment.title,
            sub_title: editAssessment.sub_title,
          },
          conditions: editCondition,
        }
      );
      if (data.status === "success") {
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "แก้ไขแบบประเมินสำเร็จ",
        });
        setEditAssessment({});
        setEditCondition([]);
        setAssessment([]);
        getAssessment(facultyMajorId);
        setOpenEditDialog(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handlerCreateWithTheplate = async (rowData) => {
    setTemplateData(rowData);
    setTemplateCondition(rowData.assessment_conditions)
    setOpenCreateWithTemplate(true);
  }

  const createWithTemplate = async () => {
    try {
      const formData = {
        title: templateData.title,
        sub_title: templateData.sub_title,
        conditions: templateCondition,
        facultyMajorId
      };
      const { data } = await axios.post(`${hostname}/api/assessment/create`, formData);
    }catch(err) {
      alert(err);
    }
  }

  useEffect(() => {
    getFaculty();
  }, []);
  return (
    <div style={{ marginTop: "10px" }}>
      <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <>ตั้งค่าการประเมิน</>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center", mb: 2 }}
              >
                เลือกคณะที่จะสร้างแบบประเมิน
              </Typography>
              <TextField
                value={facultyId}
                size="small"
                label="คณะ"
                variant="outlined"
                required
                select
                onChange={(e) => getFacultyMajor(e.target.value)}
              >
                {faculty.length !== 0 &&
                  faculty.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 1 }}
              >
                เลือกสาขา
              </Typography>
              <TextField
                value={facultyMajorId}
                size="small"
                label="สาขา"
                variant="outlined"
                disabled={facultyId === ""}
                required
                select
                onChange={(e) => getAssessment(e.target.value)}
              >
                {facultyMajor.length !== 0 &&
                  facultyMajor.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Box>
          </Grid>
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
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center", mb: 2 }}
              >
                โปรดกรอกข้อมูลการประเมิน
              </Typography>
              <TextField
                sx={{ mb: 3 }}
                value={addAssessment?.title}
                disabled={facultyMajorId === ""}
                size="small"
                label="หัวข้อ"
                variant="outlined"
                required
                onChange={(e) =>
                  setAddAssessment({
                    ...addAssessment,
                    ["title"]: e.target.value,
                  })
                }
              />
              <TextareaAutosize
                value={addAssessment?.sub_title}
                disabled={facultyMajorId === ""}
                sx={{ borderRadius: "5px", border: "2px solid #DCDCDC", mt: 5 }}
                minRows={20}
                size="small"
                variant="outlined"
                placeholder="รายละเอียด"
                style={{
                  maxWidth: "100%",
                  minWidth: "100%",
                  maxHeight: 90,
                  minHeight: 20,
                }}
                onChange={(e) =>
                  setAddAssessment({
                    ...addAssessment,
                    ["sub_title"]: e.target.value,
                  })
                }
              />
              <Button
                sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                variant="contained"
                color="success"
                disabled={
                  (addAssessment?.title === "" &&
                    addAssessment?.sub_title === "") ||
                  addAssessment?.sub_title === undefined ||
                  addAssessment?.title === undefined
                }
                onClick={() => {
                  setConditions([
                    ...conditions,
                    { description: "", examinations: [{ description: "" }] },
                  ]);
                  setOpenConditionDialog(true);
                }}
              >
                เพิ่มข้อมูล
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
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
              <MUIDataTable
                title={"แบบประเมินทั้งหมดของสาขานี้"}
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
                      customBodyRenderLite: (index) => (
                        <Switch
                          checked={assessment[index]?.publish}
                          color="success"
                          onClick={() => setPublish(index)}
                        />
                      ),
                    },
                  },
                  {
                    name: "title",
                    label: "หัวข้อประเมิน",
                  },
                  {
                    name: "assessment_conditions",
                    label: "จำนวนหัวข้อที่ประเมิน",
                    options: {
                      customBodyRender: (value) => `${value.length}  หัวข้อ`,
                    },
                  },
                  {
                    name: "",
                    label: "",
                    options: {
                      customBodyRenderLite: (dataIndex) => {
                        let rowData = assessment[dataIndex];
                        return (
                          <Stack sx={{ display: "flex", flexDirection: { md: "row", xs: "column"}}}>
                            <Button
                              size="small"
                              color="warning"
                              variant="contained"
                              sx={{ boxShadow: 0, borderRadius: "3px", mb: { xs: 0.5, md: 0 } }}
                              onClick={() => {
                                editAssessmentOpen(rowData);
                              }}
                            >
                              <Edit fontSize="small" color="#FFFFFF" />
                              แก้ไข
                            </Button>
                            <Button size="small" sx={{ ml: {md: 1, xs: 0}, mb: { xs: 0.5, md: 0 }, boxShadow: 0, borderRadius: "3px" }} variant="contained" color="success" onClick={() => handlerCreateWithTheplate(rowData)}>สร้างจากแบบประเมิน</Button>
                            <Button
                              sx={{ ml: {md:1 , xs: 0}, boxShadow: 0, borderRadius: "3px", mb: { xs: 0.5, md: 0 } }}
                              size="small"
                              color="danger"
                              variant="contained"
                              onClick={() => {
                                setDeleteId(rowData.id);
                                setOpenDeleteDialog(true);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                              ลบ
                            </Button>
                          </Stack>
                        );
                      },
                    },
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={openConditionDialog}
          onClose={() => setOpenConditionDialog(false)}
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "Bold" }}>
            {"เพิ่มข้อที่ประเมิน"}
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
              {conditions?.length !== 0 &&
                conditions?.map((item, index) => {
                  return (
                    <>
                      <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        justifyContent="flex-start"
                        sx={{ mt: 3 }}
                      >
                        <TextField
                          key={index}
                          value={item.description}
                          size="small"
                          label="หัวข้อประเมิน"
                          fullWidth
                          onChange={(e) => {
                            let items = [...conditions];
                            items[index] = {
                              ...items[index],
                              description: e.target.value,
                            };
                            setConditions(items);
                          }}
                        />
                        <AddCircleIcon
                          sx={{ cursor: "pointer" }}
                          color="primary"
                          onClick={() => {
                            let items = [...conditions];
                            items[index].examinations.push({ description: "" });
                            setConditions(items);
                          }}
                        />
                        <LibraryAddIcon
                          sx={{ cursor: "pointer" }}
                          color="success"
                          onClick={() =>
                            setConditions([
                              ...conditions,
                              {
                                description: "",
                                examinations: [{ description: "" }],
                              },
                            ])
                          }
                        />
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          color="danger"
                          onClick={() =>
                            setConditions(
                              conditions.filter(
                                (item, indexItem) => indexItem !== index
                              )
                            )
                          }
                        />
                      </Stack>
                      <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="flex-start"
                      >
                        {item?.examinations?.length !== 0 &&
                          item?.examinations?.map((element, indexElement) => {
                            return (
                              <Stack direction="row" spacing={2}>
                                <Stack sx={{ mt: 2 }} direction="row">
                                  <DeleteIcon
                                    sx={{
                                      mx: 2,
                                      marginTop: "4px",
                                      cursor: "pointer",
                                    }}
                                    color="danger"
                                    onClick={() => {
                                      let items = [...conditions];
                                      items[index].examinations = items[
                                        index
                                      ].examinations.filter(
                                        (item, keyIndex) =>
                                          keyIndex !== indexElement
                                      );
                                      setConditions(items);
                                    }}
                                  />
                                  <Chip
                                    label={`ข้อที่ ${indexElement + 1}`}
                                    color="success"
                                  />
                                </Stack>
                                <TextField
                                  value={element.description}
                                  size="small"
                                  variant="standard"
                                  label="ข้อประเมิน"
                                  fullWidth
                                  onChange={(e) => {
                                    let items = [...conditions];
                                    items[index].examinations[indexElement] = {
                                      ...items[index].examinations[
                                        indexElement
                                      ],
                                      description: e.target.value,
                                    };
                                    setConditions(items);
                                  }}
                                />
                              </Stack>
                            );
                          })}
                      </Stack>
                    </>
                  );
                })}
            </DialogContentText>
            <DialogActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ m: 2, mt: 6, boxShadow: 0, borderRadius: "3px" }}
                color="success"
                variant="contained"
                fullWidth
                onClick={() => sendAddAssessment()}
              >
                บันทึกข้อมูล
              </Button>
              <Button
                sx={{ mr: 1, boxShadow: 0, borderRadius: "3px" }}
                onClick={() => setOpenConditionDialog(false)}
                color="danger"
                variant="contained"
                fullWidth
              >
                ยกเลิก
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "Bold" }}
          >
            {"แก้ไขแบบประเมิน"}
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
              <Stack
                direction="column"
                spacing={3}
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mt: 1 }}
              >
                <Typography sx={{ mb: -3 }} variant="h6">
                  หัวข้อ
                </Typography>
                <TextField
                  value={editAssessment?.title}
                  size="small"
                  label="หัวข้อ"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setEditAssessment({
                      ...editAssessment,
                      ["title"]: e.target.value,
                    })
                  }
                />
                <Typography variant="h6">รายละเอียด</Typography>
                <TextareaAutosize
                  value={editAssessment?.sub_title}
                  minRows={20}
                  size="small"
                  variant="outlined"
                  placeholder="รายละเอียด"
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    maxHeight: 90,
                    minHeight: 20,
                  }}
                  onChange={(e) =>
                    setEditAssessment({
                      ...editAssessment,
                      ["sub_title"]: e.target.value,
                    })
                  }
                />
              </Stack>
              <>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ my: 3 }}
                >
                  <Typography variant="h6">แบบประเมิน</Typography>
                </Stack>
                {editCondition?.length !== 0 &&
                  editCondition?.map((item, index) => {
                    return (
                      <>
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="center"
                          justifyContent="flex-start"
                          sx={{ mt: 3 }}
                        >
                          <TextField
                            key={index}
                            value={item.description}
                            disabled={true}
                            size="small"
                            label="หัวข้อประเมิน"
                            fullWidth
                            onChange={(e) => {
                              let items = [...editCondition];
                              items[index] = {
                                ...items[index],
                                description: e.target.value,
                              };
                              setEditCondition(items);
                            }}
                          />
                          {/* <AddCircleIcon
                            sx={{ cursor: "pointer" }}
                            color="primary"
                            onClick={() => {
                              let items = [...editCondition];
                              items[index].examinations.push({
                                description: "",
                              });
                              setEditCondition(items);
                            }}
                          />
                          <LibraryAddIcon
                            sx={{ cursor: "pointer" }}
                            color="success"
                            onClick={() =>
                              setEditCondition([
                                ...editCondition,
                                {
                                  description: "",
                                  examinations: [{ description: "" }],
                                },
                              ])
                            }
                          />
                          <DeleteIcon
                            sx={{ cursor: "pointer" }}
                            color="danger"
                            onClick={() =>
                              setEditCondition(
                                editCondition.filter(
                                  (item, indexItem) => indexItem !== index
                                )
                              )
                            }
                          /> */}
                        </Stack>
                        <Stack
                          direction="column"
                          spacing={2}
                          justifyContent="flex-start"
                        >
                          {item?.examinations?.length !== 0 &&
                            item?.examinations?.map((element, indexElement) => {
                              return (
                                <Stack direction="row" spacing={2}>
                                  <Stack sx={{ mt: 2 }} direction="row">
                                    {/* <DeleteIcon
                                      sx={{
                                        mx: 2,
                                        marginTop: "4px",
                                        cursor: "pointer",
                                      }}
                                      color="danger"
                                      onClick={() => {
                                        let items = [...editCondition];
                                        items[index].examinations = items[
                                          index
                                        ].examinations.filter(
                                          (item, keyIndex) =>
                                            keyIndex !== indexElement
                                        );
                                        setEditCondition(items);
                                      }}
                                    /> */}
                                    <Chip
                                      label={`ข้อที่ ${indexElement + 1}`}
                                      color="success"
                                    />
                                  </Stack>
                                  <TextField
                                    value={element.description}
                                    disabled={true}
                                    size="small"
                                    variant="standard"
                                    label="ข้อประเมิน"
                                    fullWidth
                                    onChange={(e) => {
                                      let items = [...editCondition];
                                      items[index].examinations[indexElement] =
                                        {
                                          ...items[index].examinations[
                                            indexElement
                                          ],
                                          description: e.target.value,
                                        };
                                      setEditCondition(items);
                                    }}
                                  />
                                </Stack>
                              );
                            })}
                        </Stack>
                      </>
                    );
                  })}
              </>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ m: 2, mt: 6, boxShadow: 0, borderRadius: "3px" }}
              color="success"
              variant="contained"
              fullWidth
              onClick={() => updateAssessment()}
            >
              บันทึกข้อมูล
            </Button>
            <Button
              sx={{ mr: 1, boxShadow: 0, borderRadius: "3px" }}
              onClick={() => setOpenEditDialog(false)}
              color="danger"
              variant="contained"
              fullWidth
            >
              ยกเลิก
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCreateWithTemplate}
          onClose={() =>{ 
            setTemplateCondition([]);
            setTemplateData([]);
            setOpenCreateWithTemplate(false)
          }}
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "Bold" }}
          >
            {"แก้ไขแบบประเมิน"}
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
              <Stack
                direction="column"
                spacing={3}
                alignItems="center"
                justifyContent="flex-start"
                sx={{ mt: 1 }}
              >
                <Typography sx={{ mb: -3 }} variant="h6">
                  หัวข้อ
                </Typography>
                <TextField
                  value={templateData?.title}
                  size="small"
                  label="หัวข้อ"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) =>
                    setTemplateData({
                      ...templateData,
                      ["title"]: e.target.value,
                    })
                  }
                />
                <Typography variant="h6">รายละเอียด</Typography>
                <TextareaAutosize
                  value={templateData?.sub_title}
                  minRows={20}
                  size="small"
                  variant="outlined"
                  placeholder="รายละเอียด"
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    maxHeight: 90,
                    minHeight: 20,
                  }}
                  onChange={(e) =>
                    setTemplateData({
                      ...templateData,
                      ["sub_title"]: e.target.value,
                    })
                  }
                />
              </Stack>
              <>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ my: 3 }}
                >
                  <Typography variant="h6">แบบประเมิน</Typography>
                </Stack>
                {templateCondition?.length !== 0 &&
                  templateCondition?.map((item, index) => {
                    return (
                      <>
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="center"
                          justifyContent="flex-start"
                          sx={{ mt: 3 }}
                        >
                          <TextField
                            key={index}
                            value={item.description}
                            size="small"
                            label="หัวข้อประเมิน"
                            fullWidth
                            onChange={(e) => {
                              let items = [...templateCondition];
                              items[index] = {
                                ...items[index],
                                description: e.target.value,
                              };
                              setTemplateCondition(items);
                            }}
                          />
                          <AddCircleIcon
                            sx={{ cursor: "pointer" }}
                            color="primary"
                            onClick={() => {
                              let items = [...templateCondition];
                              items[index].examinations.push({
                                description: "",
                              });
                              setTemplateCondition(items);
                            }}
                          />
                          <LibraryAddIcon
                            sx={{ cursor: "pointer" }}
                            color="success"
                            onClick={() =>
                              setTemplateCondition([
                                ...templateCondition,
                                {
                                  description: "",
                                  examinations: [{ description: "" }],
                                },
                              ])
                            }
                          />
                          <DeleteIcon
                            sx={{ cursor: "pointer" }}
                            color="danger"
                            onClick={() =>
                              setTemplateCondition(
                                templateCondition.filter(
                                  (item, indexItem) => indexItem !== index
                                )
                              )
                            }
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          spacing={2}
                          justifyContent="flex-start"
                        >
                          {item?.examinations?.length !== 0 &&
                            item?.examinations?.map((element, indexElement) => {
                              return (
                                <Stack direction="row" spacing={2}>
                                  <Stack sx={{ mt: 2 }} direction="row">
                                    <DeleteIcon
                                      sx={{
                                        mx: 2,
                                        marginTop: "4px",
                                        cursor: "pointer",
                                      }}
                                      color="danger"
                                      onClick={() => {
                                        let items = [...templateCondition];
                                        items[index].examinations = items[index].examinations.filter((item, keyIndex) =>keyIndex !== indexElement);
                                        setTemplateCondition(items);
                                      }}
                                    />
                                    <Chip
                                      label={`ข้อที่ ${indexElement + 1}`}
                                      color="success"
                                    />
                                  </Stack>
                                  <TextField
                                    value={element.description}
                                    size="small"
                                    variant="standard"
                                    label="ข้อประเมิน"
                                    fullWidth
                                    onChange={(e) => {
                                      let items = [...templateCondition];
                                      items[index].examinations[indexElement] =
                                        {
                                          ...items[index].examinations[
                                            indexElement
                                          ],
                                          description: e.target.value,
                                        };
                                      setTemplateCondition(items);
                                    }}
                                  />
                                </Stack>
                              );
                            })}
                        </Stack>
                      </>
                    );
                  })}
              </>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ m: 2, mt: 6, boxShadow: 0, borderRadius: "3px" }}
              color="success"
              variant="contained"
              fullWidth
              size="small"
              onClick={() => createWithTemplate()}
            >
              สร้างแบบประเมินนี้
            </Button>
            <Button
              sx={{ mr: 1, boxShadow: 0, borderRadius: "3px" }}
              onClick={() => {
                setTemplateCondition([]);
                setTemplateData([]);
                setOpenCreateWithTemplate(false);
              }}
              color="danger"
              variant="contained"
              size="small"
              fullWidth
            >
              ยกเลิก
            </Button>
          </DialogActions>
        </Dialog>
        <DeleteDialog
          deleteToggle={openDeleteDialog}
          setDeleteToggle={setOpenDeleteDialog}
          deleteFunction={destroyAssessment}
        />
      </Box>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </div>
  );
}

export default CreateAssessment;
