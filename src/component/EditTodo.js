import { Box, TextField, makeStyles, TextareaAutosize, Button } from "@material-ui/core"
import CheckIcon from '@material-ui/icons/Check';
import React from "react";
import SaveIcon from '@material-ui/icons/Save';
const useStyle = makeStyles({
    root:{
        width:'70%',
        height:'300px',
        border:'1px solid black',
        padding:10,
        
    },
    iconActive:{
        color:'#55efc4'
    },
    iconDisable:{
        color:'#b2bec3'
    }
})
export default function EditTodo(asset){
    const [newTodo, setNewTodo] = React.useState("");
    const classes = useStyle();
    return(
        <Box 
            position='absolute' 
            className={classes.root} 
            container display='flex' 
            alignContent='center' 
            justifyContent='space-between' 
            flexDirection='column'
        >
            <Box display='flex' alignItems='center' justifyContent='center'>
                <TextField
                    style={{width:'100%'}}
                    defaultValue='Todoo'
                    label='Nhiệm vụ mới'
                    onChange = {(e)=> setNewTodo(e.target.value)}
                />            
                <CheckIcon color='secondary' className={newTodo === '' ? `${classes.iconDisable}` : `${classes.iconActive}`} />
            </Box>
            {console.log("data_edit:", asset)}
            <form className={classes.container} noValidate>
                                <TextField
                                    id="datetime-local"
                                    label="Chọn giới hạn"
                                    type="datetime-local"
                                    value=''                                    
                                    // onMouseLeave={() => setChecked(false)}                               
                                    InputLabelProps={{
                                        shrink: true,                                       
                                    }}                                    
                                    // onChange={e => setDate(e.target.value)}
                                />
            </form> 
            <TextareaAutosize minRows='6'/>
            <Button startIcon={<SaveIcon/>} color='secondary' variant='contained'>
                Save
            </Button>
        </Box>
    )
}