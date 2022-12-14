import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Button,
  LinearProgress,
  Switch,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState, useEffect } from "react";
import { hostname } from "../hostname";
import { useParams } from "react-router";
import Snackbar from "../utils/Snackbar";

function Assessment() {
  const { id } = useParams();
  const styles = {
    paperContainer: {
      backgroundImage: `url(${"/image/download-4.svg"})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };
  const [assessment, setAssessment] = useState({});
  const [disableDetail, setDisableDetail] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [sendData, setSendData] = useState({});
  const [pageStatus, setPageStatus] = useState(1);
  const [currentItems, setCurrentItems] = useState(0);
  const [age, setAge] = useState([]);
  const [recomendId, setRecomendId] = useState("");
  const [recomendSended, setRecomendSended] = useState(false);
  const [recomend, setRecomend] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const getAssessment = async () => {
    try {
      let ageData = [];
      const { data } = await axios.get(
        `${hostname}/api/assessment/get-by-id/${id}`
      );
      for (let i = 18; i <= 60; i++) {
        await ageData.push(i);
      }
      if (data.status === "success") {
        let item = data.result;
        let answer = [];
        await item.assessment_conditions.forEach(async (el) => {
          let ex = [];
          await el.examinations.forEach(async (element) => {
            await ex.push({
              answer: "",
              description: element.description,
            });
          });
          await answer.push({ ...el, ["examinations"]: ex });
        });
        item.assessment_conditions = answer;
        setAssessment(item);
        setAge(ageData);
      } else {
        setPageStatus(0);
        alert("???????????????????????????????????????????????????");
      }
    } catch (err) {
      setPageStatus(0);
      alert("???????????????????????????????????????????????????");
    }
  };

  const sendCheckEmail = async () => {
    if(disableDetail === true) {
      if (sendData?.detail === "") {
        alert("?????????????????????????????????????????????");
        return;
      }
    }
    setConditions(
      assessment.assessment_conditions[currentItems].examinations
    );
    setPageStatus(2);
  };

  const setConditionToNextPage = async () => {
    try {
      let item = assessment;
      item.assessment_conditions[currentItems].examinations = conditions;
      setAssessment(item);
      setConditions(
        assessment.assessment_conditions[currentItems + 1].examinations
      );
      setCurrentItems(currentItems + 1);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (err) {
      alert(err);
    }
  };

  const setConditionToPrevious = async () => {
    try {
      let item = assessment;
      item.assessment_conditions[currentItems].examinations = conditions;
      setAssessment(item);
      setConditions(
        assessment.assessment_conditions[currentItems - 1].examinations
      );
      setCurrentItems(currentItems - 1);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (err) {
      alert(err);
    }
  };

  const sendAnswer = async () => {
    try {
      const formData = {
        answer: assessment.assessment_conditions,
        detail: sendData,
      };
      const { data } = await axios.post(
        `${hostname}/api/assessment/send-answer/${id}`,
        formData
      );
      if (data.status === "success") {
        setPageStatus(3);
        setRecomendId(data.result.id);
      }
    } catch (err) {
      alert(err);
    }
  };

  const sendRecomend = async () => {
    try {
      console.log(recomend)
      console.log(recomendId)
      const { data } = await axios.put(`${hostname}/api/assessment/send-recomend/${recomendId}`, { recomend });
      if(data.status === "success") {
        setRecomendSended(true);
        setOpenSnackbar({
          status: true,
          type: "success",
          msg: "??????????????????????????????????????????????????????????????????",
        });
      }
    }catch(err) {
      alert(err);
    }
  }

  const handleAnswer = async (answer, index) => {
    let item = [...conditions];
    item[index].answer = answer;
    setConditions(item);
  };

  useEffect(() => {
    getAssessment();
  }, []);
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
          {pageStatus === 0 ? (
            <div style={{ color: "#FFFFFF" }}>??????????????????????????????????????????????????????</div>
          ) : null}
          {pageStatus === 1 ? (
            <Box
              sx={{
                p: 3,
                width: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <Grid
                direction="column"
                spacing={3}
                display="flex"
                justifyContent="center"
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{assessment?.title}</Typography>
                </Stack>

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ justifyContent: "center" }}
                  >
                    {assessment?.sub_title}
                  </Typography>
                </Stack>
                <Grid sx={{ display: "flex", justifyContent: {md: "start", xs: "center"}}}><Typography sx={{ color: "red", mt: 2, mb: 1  }} variant="subtitle2">
                  *??????????????????????????????????????????????????????????????????????????????????????????
                </Typography></Grid>
                <Grid container>
                  <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Switch
                      value={disableDetail}
                      color="success"
                      label="????????????????????????????????????????????????"
                      onClick={() => setDisableDetail(!disableDetail)}
                    />
                    <Typography variant="subtitle2" sx={{ pt: 1 }}>
                      ???????????????????????????
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <TextField
                      size="small"
                      required
                      disabled={!disableDetail}
                      label="??????????????????????????????"
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        setSendData({ ...sendData, ["detail"]: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mb: 2,
                      }}
                    >
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{ mt: 1, mr: 2 }}
                      >
                        ?????????
                      </FormLabel>
                      <RadioGroup
                        onChange={(e) =>
                          setSendData({
                            ...sendData,
                            ["gender"]: e.target.value,
                          })
                        }
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="?????????"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="????????????"
                          control={<Radio />}
                          label="????????????"
                        />
                        <FormControlLabel
                          value="?????????????????????????????????"
                          control={<Radio />}
                          label="?????????????????????????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      size="small"
                      required
                      label="????????????"
                      fullWidth
                      variant="outlined"
                      select
                      onChange={(e) =>
                        setSendData({ ...sendData, ["age"]: e.target.value })
                      }
                    >
                      {age?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item}
                          >{`${item} ??????`}</MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  sx={{ mt: 2,boxShadow: 0, borderRadius: "3px" }}
                  color="success"
                  variant="contained"
                  disabled={
                    
                    sendData?.gender === undefined ||
                    sendData?.age === undefined
                  }
                  onClick={sendCheckEmail}
                >
                  ????????????????????????????????????
                </Button>
              </Grid>
            </Box>
          ) : null}
          {pageStatus === 2 ? (
            <div style={{ justifyContent: "center" }}>
              <LinearProgress
                sx={{
                  borderRadius: "5px",
                  mt: { xs: 1, md: 3 },
                  pt: 1,
                  mx: { xs: -3, md: 0 },
                }}
                color="success"
                variant="determinate"
                value={parseInt(
                  ((currentItems + 1) /
                    assessment?.assessment_conditions.length) *
                    100
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "5px",
                  border: "2px solid #DCDCDC",
                  background: "white",
                  flexDirection: "column",
                  width: { md: 800, sm: 500, xs: 360 },
                  mx: { xs: -4, md: 0 },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                >
                  {`${currentItems + 1}`} of{" "}
                  {`${assessment?.assessment_conditions.length}`}
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    mt: 5,
                    mx: 5,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ?????????????????? :
                  </Typography>
                  <Typography variant="h6" sx={{ mx: 2 }}>
                    {`${assessment?.assessment_conditions[currentItems].description}`}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                    ?????????????????????????????? :
                  </Typography>
                  {conditions?.length !== 0 &&
                    conditions.map((item, index) => {
                      return (
                        <Stack
                          key={index}
                          m={2}
                          sx={{
                            marginTop: "20px",
                            borderBottom: "double",
                            borderColor: "grey",
                          }}
                        >
                          <RadioGroup
                            value={item.answer}
                            onChange={(e) =>
                              handleAnswer(e.target.value, index)
                            }
                            sx={{ marginTop: "10px", marginBottom: "10px" }}
                          >
                            <Typography variant="h6">
                              {item.description}
                            </Typography>
                            <Stack
                              sx={{
                                flexDirection: {
                                  xs: "column",
                                  md: "row",
                                  mt: { md: 0, s: 4, xs: 5 },
                                },
                              }}
                            >
                              <FormControlLabel
                                control={<Radio color="success" />}
                                value="excellent"
                                label="????????????????????????"
                              />
                              <FormControlLabel
                                control={<Radio color="primary" />}
                                value="good"
                                label="??????"
                              />
                              <FormControlLabel
                                control={<Radio color="info" />}
                                value="standard"
                                label="?????????????????????"
                              />
                              <FormControlLabel
                                control={<Radio color="rmuti" />}
                                value="fair"
                                label="???????????????"
                              />
                              <FormControlLabel
                                control={<Radio color="warning" />}
                                value="bad"
                                label="????????????????????????"
                              />
                              <FormControlLabel
                                control={<Radio color="danger" />}
                                value="so bad"
                                label="?????????"
                              />
                            </Stack>
                          </RadioGroup>
                        </Stack>
                      );
                    })}
                </Stack>
                <Box
                  display="table"
                  sx={{
                    display: { xs: "table", md: "flex" },
                    justifyContent: "flex-end",
                    mt: 3,
                    mx: { xs: 3, md: 0 },
                    mb: 3,
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: { sx: "column", md: "row" },
                    }}
                  >
                    {currentItems + 1 !== 1 ? (
                      <Button
                        variant="contained"
                        color="danger"
                        sx={{ width: { xs: "94%", md: "17vh" }, m: 1, boxShadow: 0, borderRadius: "3px" }}
                        onClick={() => {
                          setConditionToPrevious();
                          setCurrentItems(currentItems - 1);
                        }}
                      >
                        ????????????????????????
                      </Button>
                    ) : null}
                    {currentItems + 1 !==
                    assessment?.assessment_conditions.length ? (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: { xs: "94%", md: "17vh" }, m: 1, boxShadow: 0, borderRadius: "3px" }}
                        onClick={() => {
                          setConditionToNextPage();
                        }}
                      >
                        ???????????????
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: { xs: "94%", md: "17vh" }, m: 1, boxShadow: 0, borderRadius: "3px" }}
                        onClick={() => {
                          sendAnswer();
                        }}
                      >
                        ????????????????????????
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Box>
            </div>
          ) : null}
          {pageStatus === 3 ? (
            <Box
              sx={{
                p: 3,
                width: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <Grid
                direction="column"
                spacing={3}
                display="flex"
                justifyContent="center"
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5">
                    ?????????????????????????????????????????????????????????????????????????????????
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ justifyContent: "center" }}
                  >
                    ?????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????
                  </Typography>
                </Stack>
              </Grid>
              <Stack sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mt: 2}}>
                <Stack sx={{ justifyContent: "end"}}><Typography variant="subtitle2" sx={{ color: "red" }}>?????????????????????????????????????????????????????????????????? *</Typography></Stack>
                <TextareaAutosize size="small"
                onChange={(e) => setRecomend(e.target.value)}
                disabled={recomendSended}
                variant="outlined"
                placeholder="??????????????????????????????"
                style={{
                  maxWidth: "100%",
                  minWidth: "100%",
                  maxHeight: 200,
                  minHeight: 75,
                  fontFamily: "kanit",
                  borderColor: "#C1C1C1",
                  borderRadius: "3px",
                }}/>
                <Button variant="contained" sx={{ mt: 2}} disabled={recomend === "" || recomendSended} onClick={sendRecomend}>????????????????????????</Button>
              </Stack>
              <Button
                sx={{ mt: 2, boxShadow: 0, borderRadius: "3px" }}
                color="rmuti"
                variant="contained"
                onClick={() => {
                  window.open("about:blank", "_self");
                  window.close();
                }}
              >
                ??????????????????????????????????????????
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </>
  );
}

export default Assessment;
