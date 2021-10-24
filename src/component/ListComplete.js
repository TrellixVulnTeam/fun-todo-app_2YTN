import { Paper, Typography, makeStyles, IconButton} from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const useStyle = makeStyles({
    root:{
        width:'100%',
        margin:'5px 0',
        display:'flex',
        flexDirection:'column',
        cursor:'pointer',
        backgroundColor: '#747d8c',
        opacity:0.4
    },
    content:{
        width:'100%',
        margin:'5px 0',
        display:'flex',
        justifyContent:'start',
        alignItems:'center',
        overflow:'hidden'
    }
})


export default function ListComplete({asset, active, delCompleted}){
    const classes = useStyle();

    //-------function-----------//
    
    return(
        <Paper spacing={2} className={classes.root} >
            <Typography style={{width:'100%'}} align='center'   children={<div>{asset.date}</div>} />
            <div className={classes.content}>
            <CheckBox
                checked={asset.isCompleted}
                onClick={()=> active(asset.id, asset.todo, asset.isCompleted, asset.date)}
            />
            <Typography style={{width:'80%'}} align='left'  children={<span>{asset.todo}</span>} />
            <IconButton onClick={()=>{
                delCompleted(asset.id);
            }}
            >
                <DeleteOutlineIcon />
            </IconButton>
            </div>
        </Paper>
    )
}