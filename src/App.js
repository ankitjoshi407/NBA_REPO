import React from 'react';
import Tabs from "./Components/Tabs";
import Teams from "./Components/Teams";
import Games from "./Components/Games";
import { Grid, withStyles, Typography } from '@material-ui/core';


const style = {
  fullWidth: {
    width: "100%"
  },
  center: {
    margin: "2rem 0 5rem auto",
    textAlign: "center",
  },
  heading: {
    color: "#f16d32"
  }
}

class App extends React.Component {
  state = {
    selectedTab: 0
  }

  switchContent = (selectedTab) => this.setState({selectedTab});

  getContent = () => this.state.selectedTab === 0 ? <Teams/>: <Games/>

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <Header/> */}
        <Grid container justify={"center"} alignItems={"center"} className={classes.center} spacing={40}>
          <Grid item lg={8} md={8} xs={12}>
            <Typography variant={"h3"} classes={{ h3: classes.heading }}>NBA Repo</Typography>
          </Grid>
        </Grid>
        <Grid container justify={"center"} alignItems={"center"}>
          <Grid item lg={8} md={8} xs={12}>
            <Tabs switchContent={this.switchContent}/>
          </Grid>
        </Grid>
        <Grid container justify={"center"} alignItems={"center"} className={classes.center}>
          <Grid item lg={8} md={8} xs={12}>
            {this.getContent()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(App);
