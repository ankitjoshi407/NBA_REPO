import React, { Component } from "react";
import axios from "axios";
import DialogGames from "./DialogGames";
import { Paper, Grid, Typography, Button } from "@material-ui/core";



class Games extends Component {
    state = {
        loading: true,
        init: true,
        page: 1,
        data: [],
        modals: new Array(20).fill(false)
    }
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    callAPI = () => axios.get("https://www.balldontlie.io/api/v1/games?per_page=20&&page=" + this.state.page);

    componentDidMount() {
        if (this.state.init) {
            this.callAPI().then(res => this.setState({ data: res.data.data, loading: false, init: false, page: 1 }));
        }
    }
    getLoadingScreen = () => (
        <Grid item lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h2">
                Loading
            </Typography>
        </Grid>
    )
    handlePrevious = () => {
        if (this.state.page - 1 <= 0)
            return;
        this.setState((oldState) => ({ ...oldState, loading: true, page: oldState.page - 1 }), () => {
            this.callAPI()
                .then(res =>
                    this.setState((oldState) => (
                        {
                            ...oldState,
                            data: res.data.data,
                            loading: false
                        }
                    )
                    )
                )
        })
    }
    handleNext = () => (
        this.setState((oldState) => ({ ...oldState, loading: true, page: oldState.page + 1 })
            , () => {
                this.callAPI()
                    .then(res =>
                        this.setState((oldState) => (
                            {
                                ...oldState,
                                data: res.data.data,
                                loading: false
                            }
                        )
                        )
                    )
            })
    )
    openModal = (e, idx) => {
        e.stopPropagation();
        const modals = this.state.modals;
        modals[idx] = true;
        this.setState((oldState) => ({...oldState, modals}));
    }
    closeModal = (idx) => {
        console.log(idx);
        const modals = this.state.modals;
        modals[idx] = false;
        this.setState((oldState) => ({...oldState, modals}));
    }
    getFetchedData = () => (
        <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
            {
                this.state.data.map((item, idx) =>
                    (<Grid item md={4} lg={3} xs={12} key={idx} onClick={(e) => this.openModal(e, idx) }>
                        <Typography variant="title">
                            {(new Date(item.date)).toLocaleDateString("latn", this.options)}
                            <Typography variant="subtitle1">
                                {item.status}
                            </Typography>
                        </Typography>
                        <DialogGames data={item} open={this.state.modals[idx]} close={() => this.closeModal(idx) } />
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
                <Grid container spacing={40} justify="center" style={{ textAlign: "center" }}>
                    <Grid item md={6} lg={6} xs={12}>
                        <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={this.handlePrevious}>Previous</Button>
                    </Grid>
                    <Grid item md={6} lg={6} xs={12}>
                        <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={this.handleNext}>Next</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default Games;