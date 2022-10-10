import {
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { hostname } from "../hostname";
import { PieChart } from "../components/report/pie-chart";
import * as XLSX from "xlsx";
import moment from "moment";
import MUIDataTable from "mui-datatables";

function Report() {
  const [assessment, setAssessment] = useState([]);
  const [selectAssessment, setSelectAssessment] = useState("");
  const [openChart, setOpenChart] = useState(false);
  const [history, setHistory] = useState([]);
  const [detail, setDetail] = useState({});
  const [detailDialog, setDetailDialog] = useState(false);
  const [pieChartData, setPieChartData] = useState([0, 0, 0]);
  const [average, setAverage] = useState([]);
  const [excel, setExcel] = useState([]);

  const getAssessment = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/assessment/get-all`);
      if (data.status === "success") {
        setAssessment(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChartData = async (id) => {
    try {
      setSelectAssessment(id);
      const { data } = await axios.get(
        `${hostname}/api/assessment/report-by-id/${id}`
      );
      if (data.status === "success") {
        if (data.result.length !== 0) {
          setExcel(data.result);
          let point_average = [];
          let items = [];
          let answer = [];
          for (let i = 0; i < data.result.length; i++) {
            let el = data.result[i];
            for (let j = 0; j < data.result[0].points.length; j++) {
              let element = el.points[j];
              await items.push({ ...element, index: j });
            }
          }
          for (let i = 0; i < data.result[0].points.length; i++) {
            let filteredData = await items.filter((item) => item.index == i);
            await answer.push(filteredData);
          }
          await answer.forEach((el) => {
            let avg = el.reduce((r, c) => r + c.point, 0);
            let sd = [];
            let sum = 0.0;
            for(let item of el) {
              let xBar = (item.point - (avg / el.length)) * (item.point - (avg / el.length));
              sd.push(xBar);
            }
            sum = sd.reduce((r, c) => r + c, 0)
            console.log(Math.sqrt(sum))
            point_average.push({
              average: parseFloat(avg / data.result.length).toFixed(2),
              percentage: parseFloat((avg / (el.length * 5)) * 100).toFixed(2),
              description: el[0].description,
              sd: parseFloat(Math.sqrt(sum)).toFixed(5)
            });
          });

          setAverage(point_average);
        }
        let pieData = [0, 0, 0];
        await data.result.forEach((element) => {
          switch (element.gender) {
            case "ชาย":
              pieData[0]++;
              break;
            case "หญิง":
              pieData[1]++;
              break;
            case "เพศทางเลือก":
              pieData[2]++;
              break;
          }
        });
        setPieChartData(pieData);
        setHistory(data.result);
        setOpenChart(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const downloadExcel = async () => {
    let fileName = await assessment.find(item => item.id === selectAssessment).title;
    let pointThai = ["แย่", "ปรับปรุง", "พอใช้", "มาตราฐาน", "ดี", "ดีเยี่ยม"];
    let jsonFile = [];
    for (let item of excel) {
      let objectInJson = {};
      await item.points.forEach(async (el) => {
        objectInJson[el.description] = `${el.point} คะแนน (${
          pointThai[el.point]
        })`;
      });
      await jsonFile.push({
        ["time-stamp"]: `${moment(item.createdAt).format("DD/MM/YYYY HH:mm")} น.`,
        ["เพศ"]: item.gender,
        ["อายุ"]: `${item.age} ปี`,
        ...objectInJson,
      });
    }
    const worksheet = await XLSX.utils.json_to_sheet(jsonFile);
    const workbook = await XLSX.utils.book_new();
    await XLSX.utils.book_append_sheet(workbook, worksheet);
    await XLSX.writeFile(workbook, `${fileName}-${Date.now().toString()}.xlsx`);
  };

  const openDetailDialog = async (data) => {
    try {
      setDetail(data);
      setDetailDialog(true);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAssessment();
  }, []);
  return (
    <div style={{ marginTop: "10px" }}>
      <Box sm={{ display: "flex", flexDirection: "row" }}>
        <Stack sx={{ alignItems: "start", ml: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <div>สรุปรายงาน</div>
          </Breadcrumbs>
        </Stack>
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
          <Grid item xs={12} md={12}>
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
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    marginBottom: "20px",
                  }}
                >
                  สรุปผลการประเมิน
                </Typography>
                <Button
                  disabled={!openChart}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ height: "35px", boxShadow: 0, borderRadius: "3px" }}
                  onClick={downloadExcel}
                >
                  <b>EXCEL REPORT</b>
                </Button>
              </Stack>
              <TextField
                value={selectAssessment}
                size="small"
                label="หัวข้อประเมิน"
                variant="outlined"
                required
                select
                onChange={(e) => getChartData(e.target.value)}
              >
                {assessment.length !== 0 &&
                  assessment.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
              </TextField>
              {openChart ? (
                <>
                  <Grid container sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Stack sx={{ mt: 2 }}>
                        <Stack
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: { md: "300px", xs: "140px", sm: "200px" },
                          }}
                        >
                          <PieChart point={pieChartData} />
                        </Stack>
                        <Typography
                          variant="h6"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                            mb: 5,
                          }}
                        >
                          {`ผู้ประเมินทั้งหมด ${history.length} คน`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack
                        sx={{ mt: { md: 2, xs: 0 }, mb: { xs: 2, md: 0 } }}
                      >
                        <MUIDataTable
                    title={"ผู้ประเมิน"}
                    data={history}
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
                        name: "detail",
                        label: "ผู้ประเมิน",
                      },
                      {
                        name: "gender",
                        label: "เพศ",
                      },
                      {
                        name: "age",
                        label: "อายุ",
                        options: {
                          customBodyRender: (value) => `${value} ปี`,
                        },
                      },
                      {
                        name: "total_points",
                        label: "คะแนนที่ประเมิน",
                        options: {
                          customBodyRender: (value) => (
                            <Typography
                              variant="subtitle2"
                              sx={{ color: value < 80 ? "red" : "green" }}
                            >{`${value} คะแนน`}</Typography>
                          ),
                        },
                      },
                      {
                        name: "",
                        label: "รายละเอียด",
                        options: {
                          customBodyRenderLite: (index) => {
                            let rowData = history[index];
                            return (
                              <Button
                                variant="contained"
                                sx={{ boxShadow: 0, borderRadius: "3px" }}
                                color="warning"
                                size="small"
                                onClick={() => openDetailDialog(rowData)}
                              >
                                ดูรายละเอียด
                              </Button>
                            );
                          },
                        },
                      },
                    ]}
                  />
                      </Stack>
                    </Grid>
                  </Grid>
                  
                  <MUIDataTable
                          title={"การประเมิน"}
                          data={average}
                          options={{
                            viewColumns: false,
                            filter: false,
                            print: false,
                            download: true,
                            downloadOptions: {
                              filename: `${assessment.find(item => item.id === selectAssessment).title}-${new Date().toDateString()}`,
                            },
                            search: false,
                            pagination: true,
                            selectableRows: false,
                            rowsPerPage: 3,
                            rowsPerPageOptions: [3, 6, 9, 12],
                            textLabels: {
                              body: {
                                noMatch: "ไม่พบข้อมูล",
                              },
                            },
                          }}
                          columns={[
                            {
                              name: "description",
                              label: "คำถาม",
                            },
                            {
                              name: "average",
                              label: "ค่าเฉลี่ย",
                              options: {
                                customBodyRender: (value) => (
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ color: value < 3 ? "red" : "green" }}
                                  >{`${parseFloat(value).toFixed(
                                    2
                                  )} คะแนน`}</Typography>
                                ),
                              },
                            },
                            {
                              name: "percentage",
                              label: "ร้อยละ",
                              options: {
                                customBodyRender: value => <Typography variant="subtitle2" sx={{ color: value < 50 ? "red" : "green" }}>{`${parseFloat(value).toFixed(2)} %`}</Typography>
                              }
                            },
                            {
                              name: "sd",
                              label: "ส่วนเบียงเบนมาตราฐาน",
                            },
                          ]}
                        />
                </>
              ) : null}
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={detailDialog}
          onClose={() => setDetailDialog(false)}
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "Bold" }}>{"รายละเอียด"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container sx={{ mt: "2%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label="ข้อมูลผู้ประเมิน"
                        component="h6"
                        href="#basic-chip"
                        sx={{ mx: 2, cursor: "default" }}
                        clickable
                      />
                      {detail?.detail}
                    </Typography>
                    <Grid display="flex" flexDirection="row">
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          mb: 2,
                        }}
                      >
                        <Chip
                          label="อายุ"
                          component="h6"
                          href="#basic-chip"
                          sx={{ mx: 2, cursor: "default" }}
                          clickable
                        />
                        {detail?.age}
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
                          label="เพศ"
                          component="h6"
                          href="#basic-chip"
                          sx={{ mx: 2, cursor: "default" }}
                          clickable
                        />
                        {detail?.gender}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <MUIDataTable
                      data={detail?.points}
                      options={{
                        viewColumns: false,
                        filter: false,
                        print: false,
                        download: false,
                        search: false,
                        pagination: false,
                        responsive: "standard",
                        selectableRows: false,
                        textLabels: {
                          body: {
                            noMatch: "ไม่พบข้อมูล",
                          },
                        },
                      }}
                      columns={[
                        {
                          name: "description",
                          label: "คำถาม",
                        },
                        {
                          name: "point",
                          label: "คะแนนที่ได้",
                          options: {
                            filter: false,
                            sort: false,
                            customBodyRender: (value) => {
                              let color = "";
                              switch (value) {
                                case 5:
                                  color = "#6fbf73";
                                  break;
                                case 4:
                                  color = "#416393";
                                  break;
                                case 3:
                                  color = "#10254a";
                                  break;
                                case 2:
                                  color = "#982d07";
                                  break;
                                case 1:
                                  color = "#ffa000";
                                  break;
                                case 0:
                                  color = "red";
                                  break;
                              }
                              return (
                                <Typography
                                  variant="subtitle2"
                                  sx={{ color: color }}
                                >
                                  {`${value} คะแนน`}
                                </Typography>
                              );
                            },
                          },
                        },
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}

export default Report;
