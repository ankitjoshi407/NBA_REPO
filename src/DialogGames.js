import React from 'react';
import { Dialog, DialogContent, Grid, Typography, DialogTitle, Button } from '@material-ui/core';


function DialogGames(props) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const { data } = props;
    function handleClose(e) {
        e.stopPropagation();
        props.close(); 
    }
    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle style={{textAlign: "center"}}>
                <Typography variant="h4" style={{color: "#f16d32"}}>
                    Game Description
                    <Typography variant="subheading">
                        {(new Date(data.date)).toLocaleDateString("latn", options)}
                    </Typography>
                </Typography>
            </DialogTitle>
            <DialogContent style={{margin: "0 auto", padding: "4rem"}} contentStyle={{width: "100%", maxWidth: "none"}}>
                <Grid container justify="center" spacing="40">
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h5">
                            Home Team
                        </Typography>
                        <p>{data.home_team.full_name} ({data.home_team.abbreviation})</p>
                        <p><b>City</b>: {data.home_team.city}</p>
                        <p><b>Conference</b>: {data.home_team.conference}</p>
                        <p><b>Division</b>: {data.home_team.division}</p>
                        <p><b>Home Team Score</b>:{data.home_team_score}</p>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h5">
                            Visitor Team
                        </Typography>
                        <p>{data.visitor_team.full_name} ({data.visitor_team.abbreviation})</p>
                        <p><b>City</b>: {data.visitor_team.city}</p>
                        <p><b>Conference</b>: {data.visitor_team.conference}</p>
                        <p><b>Division</b>: {data.visitor_team.division}</p>
                        <p><b>Visitor Team Score</b>:{data.visitor_team_score}</p>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={handleClose}>Close</Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default DialogGames;