import { Paper, Typography, makeStyles, InputBase } from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import React from 'react';
const useStyle = makeStyles({
    root:{
        width:'100%',
        margin:'5px 0',
        display:'flex',
        flexDirection:'column',
        cursor:'pointer',
        transition:'.3s ease',
        '&:hover':{
            background:'rgba(253, 114, 114,0.2)',
            transform:'translateY(-4%)',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 0px, rgba(0, 0, 0, 0.22) 0px 5px 5px'
        }
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


export default function ListTodo({asset, active}){
    const classes = useStyle();

    //-------function-----------//
    
    return(
        <Paper spacing={2} className={classes.root}  >
            <Typography style={{width:'100%'}} align='center'   children={<div>{asset.date}</div>} />
            <div className={classes.content}>
            <CheckBox
                checked={asset.isCompleted}
                onClick={()=> active(asset.id, asset.todo, asset.isCompleted, asset.date)}
            />
            <InputBase defaultValue={asset.todo} style={{width:'80%'}} />            
            </div>            
        </Paper>
    )
}