import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core"
import React from "react"
import * as Yup from "yup"
import Dropzone from "../../../../UtilityComponents/Dropzone"
import CourseAddSyllabus from "./CourseAddSyllabus"

function CourseAddMainCard({ open, handleClose, callback, additionalData }) {
  let schema = Yup.object().shape({
    courseName: Yup.string().required(),
    courseDuration: Yup.string().required(),
  })

  console.log(additionalData)

  const [courseName, setCourseName] = React.useState("")
  const [courseDuration, setCourseDuration] = React.useState("")
  const [courseAreaLevel, setCourseAreaLevel] = React.useState("")
  const [courseImage, setCourseImage] = React.useState("")
  const [courseEmec, setCourseEmec] = React.useState("")
  const [courseSyllabus, setCourseSyllabus] = React.useState([])

  const [courseNameError, setCourseNameError] = React.useState(false)
  const [courseDurationError, setCourseDurationError] = React.useState(false)

  const validateCourseName = () => {
    Yup.reach(schema, "courseName")
      .validate(courseName)
      .then(() => {
        setCourseNameError(false)
      })
      .catch(error => {
        setCourseNameError(true)
      })
  }

  const validateCourseDuration = () => {
    Yup.reach(schema, "courseDuration")
      .validate(courseDuration)
      .then(() => {
        setCourseDurationError(false)
      })
      .catch(error => {
        setCourseDurationError(true)
      })
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Adicionar um curso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos e clique em <strong>adicionar curso</strong>
          </DialogContentText>
          <Box py={1}>
            <TextField
              fullWidth
              onChange={e => setCourseName(e.target.value)}
              onBlur={validateCourseName}
              error={courseNameError}
              label={"Nome do curso"}
              helperText={courseNameError ? "Digite o nome do curso" : ""}
            ></TextField>
          </Box>

          <Box py={1}>
            <TextField
              fullWidth
              onChange={e => setCourseDuration(e.target.value)}
              onBlur={validateCourseDuration}
              error={courseDurationError}
              label={"Duração do curso"}
              helperText={
                courseDurationError
                  ? "Digite o número de horas de duração do curso"
                  : ""
              }
            ></TextField>
          </Box>

          <Box py={1}>
            <FormControl fullWidth>
              <InputLabel id="courseAreaLabel">Área do curso</InputLabel>
              <Select
                onChange={e => setCourseAreaLevel(e.target.value)}
                fullWidth
                labelId="courseAreaLabel"
                id="courseArea"
                value={courseAreaLevel}
              >
                {additionalData.courseAreas.map((cs, index) => (
                  <MenuItem value={cs} key={index}>
                    {cs.courseAreaName + " - " + cs.courseAreaLevel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box py={2}>
            <CourseAddSyllabus
              add={setCourseSyllabus}
              syllabusList={courseSyllabus}
            />
          </Box>

          <Box pt={2} pb={2}>
            <Dropzone
              image={courseImage}
              setImage={setCourseImage}
              buttonText="Clique para adicionar uma foto ao curso"
            />
          </Box>
          <Box pt={2} pb={2}>
            <Dropzone
              image={courseEmec}
              setImage={setCourseEmec}
              buttonText="Clique para adicionar foto do certificado de E-MEC"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancelar
          </Button>

          <Button variant="contained" color="primary">
            Criar curso
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CourseAddMainCard
