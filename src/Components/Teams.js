import React, { Component } from "react";
import axios from "axios";
import { Paper, Grid, Typography, Tooltip } from "@material-ui/core";



class Teams extends Component {
    state = {
        loading: true,
        data: []
    }
    componentDidMount() {
        if (this.state.loading) {
            axios.get("https://www.balldontlie.io/api/v1/teams")
                .then(res => this.setState({ data: res.data.data, loading: false }));
        }
    }
    getLoadingScreen = () => (
        <Grid item lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h2">
                Loading
            </Typography>
        </Grid>
    )
    getFetchedData = () => (
        <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
            {
                this.state.data.map((item, idx) =>
                    (<Grid item md={4} lg={3} xs={12} key={idx}>
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
                    </Grid>))
            }
        </Grid>
    )
    render() {
        return (
            <Paper>
                {
                    this.state.loading ? this.getLoadingScreen() : this.getFetchedData()
                }
            </Paper>
        )
    }
}

export default Teams;