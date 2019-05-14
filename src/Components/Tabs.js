import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core";


const style = {
    tabSelected: {
        background: "#f16d32",
        color: "white"
    }
};

class MyTabs extends Component {
    state = {
        value: 0
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue }, () => this.props.switchContent(newValue));
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    centered
                    fullWidth
                >
                    <Tab classes={{ selected: classes.tabSelected }} label="NBA Teams" />
                    <Tab classes={{ selected: classes.tabSelected }} label="NBA Games" />
                </Tabs>
            </Paper>
        )
    }
}

export default withStyles(style)(MyTabs);