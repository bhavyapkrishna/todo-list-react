import React, { useState } from 'react';
import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input, FormControl, InputLabel } from '@mui/material';

export default function App() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);

  //set values
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  let [priority, setPriority] = useState('low');
  let [complete, setComplete] = useState(false);
  let [index, setIndex] = useState(0);

  //validator messages
  let [validateTitleMessage, setValidateTitleMessage] = useState('');
  let [validateDescriptionMessage, setValidateDescriptionMessage] =
    useState('');
  let [validateDeadlineMessage, setValidateDeadlineMessage] = useState('');
  let [validatePriorityMessage, setValidatePriorityMessage] = useState('');

  //validate title
  const validateTitle = (value) => {
    const ind = list.findIndex((elem) => elem.title === value);
    if (!value) {
      setValidateTitleMessage('Please input a title!');
    } else {
      if (ind < 0) {
        setValidateTitleMessage('');
      } else {
        setValidateTitleMessage('This title already exists!');
      }
    }
  };

  //validate description
  const validateDescription = (value) => {
    if (!value) {
      setValidateDescriptionMessage('Please input a description!');
    } else {
      setValidateDescriptionMessage('');
    }
  };

  //validate deadline
  const validateDeadline = (value) => {
    if (!value) {
      setValidateDeadlineMessage('Please input a deadline!');
    } else {
      setValidateDeadlineMessage('');
    }
  };

  //handle title change
  let handleTitle = (value) => {
    setTitle(value);
    if (!update) {
      validateTitle(value);
    }
  };

  //handle description change
  let handleDescription = (value) => {
    setDescription(value);
    validateDescription(value);
  };

  //handle deadline change
  let handleDeadline = (value) => {
    setDeadline(value);
    validateDeadline(value);
  };

  //add task into the table
  function handleAdd() {
    let submit = true;

    //make sure title, description, deadline are all valid
    if (title == '') {
      setValidateTitleMessage('Please input a title!');
      submit = false;
    }

    if (description == '') {
      setValidateDescriptionMessage('Please input a description!');
      submit = false;
    }

    if (deadline == '') {
      setValidateDeadlineMessage('Please input a deadline!');
      submit = false;
    }

    //submit if there are no errors
    if (submit && validateTitleMessage === '') {
      let data = {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        complete: false,
        index: index,
      };

      if (update) {
        //replace task at given index
        let ind = list.findIndex((elem) => elem.title === title);
        list[ind] = data;
        toast.success('Task updated successfully!');
      } else {
        //else, add new task to the list
        list.push(data);
        toast.success('Task added successfully!');
      }

      //reset values
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('low');
      setIndex(index + 1);
      setOpen(false);
      setUpdate(false);
    }
  }

  //handle clicks (open and close)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('low');
    setValidateTitleMessage('');
    setValidateDescriptionMessage('');
  };

  //add/remove update button depending on checkbox
  let handleChecked = (value) => {
    let ind = list.findIndex((elem) => elem.title === value);
    const temp = [...list];

    if (temp[ind].complete) {
      temp[ind].complete = false;
    } else {
      temp[ind].complete = true;
    }
    setList(temp);
  };

  //delete tasks from the table
  let handleDelete = (value) => {
    let temp = [...list];
    let ind = temp.findIndex((elem) => elem.title === value);
    temp.splice(ind, 1);
    setList(temp);
    toast.success('Task deleted successfully!');
  };

  //update tasks
  let updateTaskData = (value) => {
    let ind = list.findIndex((elem) => elem.title === value);
    let selectedTask = list[ind];

    // Set state without validation when updating
    setTitle(value);
    setDescription(selectedTask.description);
    setDeadline(selectedTask.deadline);
    setPriority(selectedTask.priority);

    setUpdate(true);
    setOpen(true);
  };

  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
            <MenuIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              FRAMEWORKS
            </Typography>{' '}
            <div className="add-button">
              <Button variant="contained" onClick={handleClickOpen}>
                <AddCircleIcon fontSize="string" /> Add
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Paper sx={{ flexGrow: 1 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Deadline</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Is Complete</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow key={row.title}>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    {row.deadline.format('MM/DD/YY')}
                  </TableCell>
                  <TableCell align="center">{row.priority}</TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={row.complete}
                      onChange={(e) => handleChecked(row.title)}
                    ></input>
                  </TableCell>
                  <TableCell align="center">
                    {!row.complete ? (
                      <div>
                        <Button
                          className="update-task"
                          variant="contained"
                          onClick={() => {
                            updateTaskData(row.title);
                          }}
                        >
                          <EditIcon fontSize="string" /> Update
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div>
                      <Button
                        className="update-task"
                        variant="contained"
                        onClick={() => handleDelete(row.title)}
                        color="error"
                      >
                        <CancelIcon fontSize="string" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose} className="popup">
        <DialogContent>
          <Box>
            <AppBar position="static">
              <Toolbar sx={{ position: 'relative' }}>
                {update ? (
                  <Typography variant="h6" component="div">
                    <EditIcon fontSize="string" /> Edit Task
                  </Typography>
                ) : (
                  <Typography variant="h6" component="div">
                    <AddCircleIcon fontSize="string" /> Add Task
                  </Typography>
                )}
              </Toolbar>
            </AppBar>
          </Box>
          <Box component="form" noValidate autoComplete="off">
            <Box className="titleBox">
              {!update ? (
                <TextField
                  error={validateTitleMessage}
                  helperText={validateTitleMessage}
                  margin="dense"
                  required
                  id="title"
                  label="Title"
                  variant="outlined"
                  defaultValue=""
                  value={title}
                  fullWidth
                  onChange={(e) => handleTitle(e.target.value)}
                ></TextField>
              ) : (
                <></>
              )}
              <br />
              <TextField
                error={validateDescriptionMessage}
                helperText={validateDescriptionMessage}
                margin="dense"
                required
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                fullWidth
                onChange={(e) => handleDescription(e.target.value)}
              ></TextField>
              <br />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    id="deadline"
                    label="Deadline"
                    inputFormat="MM/DD/YY"
                    value={deadline}
                    onChange={handleDeadline}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <br />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Priority
                </FormLabel>
                <RadioGroup
                  row
                  value={priority}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="med"
                    control={<Radio />}
                    label="Med"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Button
              className="cancel-task-dialog"
              variant="contained"
              backgroundColor="red"
              onClick={handleClose}
              color="error"
            >
              <DoDisturbIcon fontSize="string" /> Cancel
            </Button>{' '}
            {update ? (
              <Button
                className="add-task-dialog"
                variant="contained"
                onClick={handleAdd}
              >
                <EditIcon fontSize="string" /> Edit
              </Button>
            ) : (
              <Button
                className="add-task-dialog"
                variant="contained"
                onClick={handleAdd}
              >
                <AddCircleIcon fontSize="string" /> Add
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
