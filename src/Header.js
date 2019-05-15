import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';


function getLoadingScreen(clickHandler) {
    return (
        <div>
            <h2 id="logo">NBA REPO</h2>
            <button className="dataButton" value="one" onClick={clickHandler}>NBA Teams</button>
            <button className="dataButton" value="two" onClick={clickHandler}>NBA Games</button>
            <Grid item lg={3} md={4} xs={12} style={{ margin: "60px auto", textAlign: "center" }}>
                <Typography variant="h2" >
                    Loading....
                  </Typography>
            </Grid>
        </div>
    );
}
 
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            teams: [],
            games: []
        }
    }
    // https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating
    promiseState = async state => new Promise(resolve => this.setState(state, resolve));
    componentDidMount() {
        setTimeout(()=>{this.onclickhandler({target: {value: "one"}})},2000);
    }
    getteamdatahandler = () => {
        this.setState({ teams: [], games: [],loading: true });
        this.props.onstatehandler(this.state.teams, this.state.games, 'zero');
        return new Promise((Resolve, Reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://www.balldontlie.io/api/v1/teams");
            xhr.send();
            var tempdata = [];
            xhr.onreadystatechange = () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    var teamdata = JSON.parse(xhr.responseText);
                    tempdata = this.state.teams;
                    tempdata = teamdata.data;
                    this.setState({ teams: tempdata, games: [], loading: false });
                    Resolve();
                }
            }
        });
    }
    getgamedatahandler = () => {
        this.setState({ teams: [], games: [],loading: true });
        this.props.onstatehandler(this.state.teams, this.state.games, 'zero');
        return new Promise((Resolve, Reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://www.balldontlie.io/api/v1/games");
            xhr.send();
            var tempdata = [];
            xhr.onreadystatechange = () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    var gamedata = JSON.parse(xhr.responseText);
                    tempdata = this.state.games;
                    tempdata = gamedata.data;
                    this.setState({ teams: [], games: tempdata, loading: false });
                    Resolve();
                }
            }
        });
    }
    onclickhandler = async (e) => {
        var flag = e.target.value;
        this.promiseState({ loading: false }).then(
            () => {
                let aPromise = undefined;
                if (flag === "one") {
                    document.getElementsByClassName("dataButton")[0].style.backgroundColor = "orange";
                    document.getElementsByClassName("dataButton")[0].style.color = "white";
                    document.getElementsByClassName("dataButton")[1].style.backgroundColor = "white";
                    document.getElementsByClassName("dataButton")[1].style.color = "black";
                    aPromise = this.getteamdatahandler();
                }
                else {
                    document.getElementsByClassName("dataButton")[1].style.backgroundColor = "orange";
                    document.getElementsByClassName("dataButton")[1].style.color = "white";
                    document.getElementsByClassName("dataButton")[0].style.backgroundColor = "white";
                    document.getElementsByClassName("dataButton")[0].style.color = "black";
                    aPromise = this.getgamedatahandler();
                }
                aPromise.then(() => this.props.onstatehandler(this.state.teams, this.state.games, flag)); // PASS THE FLAG YOU !#$
            }
        );
        // setTimeout(async () => {

        // }, 1000);
    }
    render() {
        if (this.state.loading === true) {
            return (getLoadingScreen(this.onclickhandler));
        }
        else
            return (
                <div>
                    <h2 id="logo">NBA REPO</h2>
                    <button className="dataButton" value="one" onClick={this.onclickhandler}>NBA Teams</button>
                    <button className="dataButton" value="two" onClick={this.onclickhandler}>NBA Games</button>
                </div>
            )
    }
}

export default Header;