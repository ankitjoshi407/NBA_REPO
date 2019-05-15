import React, { Component } from 'react';
import { Paper, Grid, Typography,Button } from '@material-ui/core';
import DialogGames from './DialogGames';

class GamesCarry extends Component {
  constructor(props) {
    super(props);
    let temp = {};
    for (let i=0; i<100; i++)
      temp = {...temp, [i]: false};
    this.state = {tempR :temp,
      start : 0, 
      end : 20
    };
   
  }
   options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  modalShow = (e, idx) => {
    e.stopPropagation(); 
    this.setState((currentState) => ({tempR:{...currentState.tempR, [idx]: true}})); 
    // [idx] will treat the variable idx as a key - if you dont do
    // that idx will be added as a literal value in the object
    // for example,
    // var idx = 1;
    // var obj = {idx: 1}
    // console.log(obj) =====> {"idx": 1}
    // On the other hand :-
    // var idx = 1;
    // var obj = {[idx]: 1}
    // console.log(obj) =====> {"1": 1}
  }
  modalClose = (e, idx) => {
    if (e)
      e.stopPropagation(); // remember event bubbling ?
    console.log(`closing modal ${idx}`);
    this.setState((currentState) => ({tempR:{...currentState.tempR, [idx]: false}}), () => console.log(this.state.tempR));
  };
  dec = ()=>{
    if(this.state.start>=20)
    this.setState((curr)=>({start:curr.start-20,end:curr.end-20}))
  }
  inc = (len)=>{
    console.log(len);
    if(this.state.end < len)
    this.setState((curr)=>({start:curr.start+20,end:curr.end+20}))
  }
  render() {

    return (
      <Paper>
        <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
          {
            this.props.gamesdata.map((item, idx)=>{
              if(idx>this.state.start && idx<=this.state.end)
              return (
                <Grid item md={4} lg={3} xs={12} key={idx} variant="primary"
                  onClick={(e) => this.modalShow(e,idx)}>
                  <Typography variant="title">
                    {(new Date(item.date)).toLocaleDateString("latn", this.options)}
                    <Typography variant="subtitle1">
                      {item.status}
                    </Typography>
                  </Typography>
                  <DialogGames data={item} open={this.state.tempR[idx]} close={(e) => {return this.modalClose(e,idx)}}/>
                </Grid>
              );
            })
          }
        </Grid>
        <Grid container spacing={40} justify="center" style={{ textAlign: "center" }}>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={()=>{this.dec()}}>Previous</Button>
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={()=>{this.inc(this.props.gamesdata.length)}}>Next</Button>
                </Grid>
            </Grid>
      </Paper>
    )

  };
}


export default GamesCarry;