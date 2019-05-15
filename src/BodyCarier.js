import React,{Component} from 'react';

import { Paper, Grid, Typography, Tooltip } from '@material-ui/core';

class BodyCarier extends Component {
   render(){
      return ( 
         <Paper>
             <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
                 {
                         this.props.teamdata.map((item, index) => {
                             return (
                                 <Grid item md={4} lg={3} xs={12} key={index}>
                                     <Tooltip title={
                                         <React.Fragment>
                                             <p>{item.full_name} {item.abbreviation}</p>
                                             <p>City: {item.city}</p>
                                             <p>Conference: {item.conference}</p>
                                             <p>Division: {item.division}</p>
                                         </React.Fragment>
                                     } placement="right">
                                         <Typography variant="title">
                                             {item.name}
                                             <Typography variant="subtitle1">
                                                 {item.division}
                                             </Typography>
                                         </Typography>
                                     </Tooltip>
                                 </Grid>
                             );
                         })
                 }
             </Grid>
         </Paper>
     )

   };
}


export default BodyCarier;