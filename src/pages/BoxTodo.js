import { Grid, Box, Typography, Paper, InputBase, IconButton,Checkbox, makeStyles, ButtonGroup,TextField, Fade, FormControlLabel, Button, Snackbar, FormLabel } from "@material-ui/core"
import CardTravelIcon from '@material-ui/icons/CardTravel';
import SaveIcon from '@material-ui/icons/Save';
import ListTodo from '../component/ListTodo';
import ListComplete from '../component/ListComplete';
import EventIcon from '@material-ui/icons/Event';
import React from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Alert } from "@material-ui/lab";
const useStyle= makeStyles({
    lighterBox:{
        '& > *':{
            margin:'5px 20px',
            
            color:'white'
        },
        padding:'10px',
        background:'black',
        minHeight:'500px'
    },
    darkBox:{
        padding:'10px',
        '& > *':{
            margin:'5px 20px',
        },
    },
    root:{
        width:'400px',
        padding: '5px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        boxShadow: 'rgba(252, 66, 123,0.5) 0px 0px 0px 3px'
    },
    container:{
        backgroundColor: '#f1f2f6'
    },
    success:{
        backgroundColor:'green',
        padding:10,
        border:'1px solid black'
    }
    
})
export default function BoxTodo(){
    const classes = useStyle();

    //--------useState--------//
    const [task, setTask] = React.useState([]);
    const [taskComplete, setTaskCompleted] = React.useState([]);
    const [taskInput, setTaskinput] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [changeTheme, setChangeTheme] = React.useState(false);
    const [date, setDate]= React.useState("");
    const [complete, setComplete] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [theme, setTheme] = React.useState(classes.darkBox);
    //--------Function-------//
    const toggleTheme = ()=>{
        setChangeTheme(pre => !pre);
        if(theme === classes.lighterBox ){
            return setTheme(pre => classes.darkBox)
        }else{
            return setTheme(pre => classes.lighterBox)
        }
    }
    const addList = React.useCallback(
        ()=>{
            setTask([ {id:task.length +1, todo:taskInput,date: date ,isCompleted:false},...task]);
            setTaskinput("");
            setDate('');
            setSuccess((pre)=>true);
        },
        [task, taskInput, date],
    )

    const delTodo = (id)=>{
        console.log('function',id);
        taskComplete.map(value=>{
            if(value.id == id){
                taskComplete.splice(taskComplete.indexOf(value),1);
                return setTaskCompleted([...taskComplete]);       
            }
        })
        
    }

    const checkComplete = (id,todo, isCompleted, date) => {
        if(isCompleted){
            taskComplete.forEach(value => {
                if(value.id == id){
                    taskComplete.splice(taskComplete.indexOf(value),1);
                    setTask([...task,{id: task.length+ 1, todo: todo, date:date  ,isCompleted:false }])
                }
            })
        }else{
            task.forEach(value=>{
                if(value.id == id){
                    task.splice(task.indexOf(value),1);
                    setTaskCompleted([...taskComplete,{id:taskComplete.length+1, todo: todo,date: date, isCompleted:true}])
                }
            })
        }
    }
    //----------Render--------//
    return(
        <Grid item>
            
            <Box position='relative' className={theme}>
                <Typography color='secondary' align='center'  compornent='h1' variant='h5' children={<span><CardTravelIcon/> Todo List</span>}/>
                <Paper className={classes.root}>
                    <InputBase
                        placeholder='Danh sách việc cần làm'                        
                        style={{width:'90%'}}
                        defaultValue="2017-05-24T10:30"
                        inputProps={{ 'aria-label': 'todo list' }}
                        value={taskInput}                 
                        onChange={(e) => setTaskinput(e.target.value)}      
                    />
                    <ButtonGroup type='time' className={classes.btn}>
                        <IconButton color='secondary'  onClick={()=> setChecked(pre => !pre)}>
                            <EventIcon />
                        </IconButton>
                        <IconButton color='secondary'   onClick={addList} disabled={!taskInput}>
                            <SaveIcon/>
                        </IconButton>                        
                    </ButtonGroup>
                    <Fade in={checked}>
                        <Box 
                            position='absolute'
                            top='100px'
                            right='70px'
                        >
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    value={date}                                    
                                    onMouseLeave={() => setChecked(false)}                               
                                    InputLabelProps={{
                                        shrink: true,                                       
                                    }}                                    
                                    onChange={e => setDate(e.target.value)}
                                />
                            </form>
                        </Box>
                    </Fade>
                </Paper>
                <Box display='flex' justifyContent='end' alignI>
                    <FormControlLabel
                        control={<Checkbox color='primary' checked={changeTheme} onChange={()=> toggleTheme()} name="checkedA" />}
                        label="Nền tối"
                    />
                   
                </Box>
                {/*-------success----------------*/}
                <Snackbar open={success} autoHideDuration={2000} onClose={()=> setSuccess(false)}  >
                    <Alert severity='success' anchorOrigin={{vertical:'center', horizontal:'left',}}>
                        Đã thêm
                    </Alert>
                </Snackbar>
                

                <Box>
                    {task.map(e =>( 
                        <Paper >
                            <ListTodo asset={e} key={e.id} active={checkComplete}/>
                        </Paper>
                    ))}
                </Box>

                <Button
                    startIcon={<DoneAllIcon/>}
                    variant='outlined'
                    size='small'
                    onClick={()=> setComplete(pre => !pre)}
                    color='primary'
                >
                    {`${taskComplete.length} hoàn thành`}
                </Button>
                <Fade in={complete}>
                    <Box>
                        {taskComplete.map(e => (
                            <Paper >
                                <ListComplete asset={e} key={e.id} active={checkComplete} delCompleted={delTodo}/>
                            </Paper>
                        ))}
                    </Box>
                </Fade>
            </Box>
        </Grid>
    )
}