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
        if(data.result.length !== 0) {
          let point_average = [];
          let items = [];
          let answer = [];
          for(let i = 0; i < data.result.length; i++) {
            let el = data.result[i];
            for (let j = 0; j < data.result[0].points.length; j++) {
              let element = el.points[j];
              await items.push({...element, index: j});
            }
          }
          for(let i = 0; i < data.result[0].points.length; i++) {
            let filteredData = await items.filter((item) => item.index == i)
            await answer.push(filteredData);
          }
          console.log(answer)
          await answer.forEach((el) => {
            let avg = el.reduce((r, c) => r + c.point, 0);
            point_average.push({ average: avg / data.result.length, description: el[0].description });
          })
          setAverage(point_average);
          console.log(point_average)
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                สรุปผลการประเมิน
              </Typography>
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
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Stack sx={{ mt: 2 }}>
                        <Stack
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: {md: "300px", xs: "140px", sm: "200px"},
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
                      <Stack sx={{ mt: {md: 2, xs: 0}, mb: { xs: 2, md: 0} }}>
                        <MUIDataTable
                        title={"การประเมิน"}
                        data={average}
                        options={{
                          viewColumns: false,
                          filter: false,
                          print: false,
                          download: false,
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
                            label: "คำถาม"
                          },
                          {
                            name: "average",
                            label: "คะแนนเฉลี่ย",
                            options: {
                              customBodyRender: value => <Typography variant="subtitle2" sx={{ color: value < 3 ? "red" : "green"}}>{`${parseFloat(value).toFixed(2)} คะแนน`}</Typography>
                            }
                          },
                          {
                            name: "average",
                            label: "เปอร์เซ็น",
                            options: {
                              customBodyRender: value => {
                                let percent =  (value/5) * 100;
                                return <Typography variant="subtitle2">{`${parseFloat(percent).toFixed(2)} %`}</Typography>
                              }
                            }
                          },

                        ]}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
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
                        label: "อีเมลผู้ประเมิน",
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
          <DialogTitle sx={{ fontWeight: "Bold" }}>
            {"รายละเอียด"}
          </DialogTitle>
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