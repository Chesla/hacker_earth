import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Cell} from 'react-mdl';
import Data from './json';
/**
 * A counter button: tap the button to increase the count.
 */
 const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      showShortNews:false,
      news:Data.newsFeed,
    };
  }
 _showNewsFeed(){
    return this.state.news.posts.map((values)=> {
      return(
              <Grid key={values.uuid}>
              <Cell col={6}/>
                <Cell col={6}>
                  <Card
                  style={{width:'600px',marginLeft:'25%',clear:'both',float:'left',position:'relative',marginBottom:'2%'}}
                   onExpandChange={(event)=> {console.log(event);this.setState({showShortNews:event})}}>
                     <CardHeader
                        title={values.author != "" ? values.author.toUpperCase() : 'ANONYMOUS'}
                        subtitle={values.published}
                        
                    />
                    <CardMedia 
                      overlay={<CardTitle title={values.title}/>}
                    >
                      <img height="350px" src={values.thread.main_image}/>
                    </CardMedia>
                    <CardText hidden={this.state.showShortNews}>
                      {values.text.substring(0,555)}...
                    </CardText>
                    <CardHeader
                      actAsExpander={true}
                      showExpandableButton={true}/>
                    <CardText expandable={true}>
                       {values.text}
                    </CardText>
                    <CardActions>
                      <FlatButton label="Like" />
                      <FlatButton label="Comment" />
                    </CardActions>
                  </Card>
                </Cell>
              </Grid>
          );
    });
 }
  render() {
    console.log('Data',Data.newsFeed);
    return (
      
       <div>
      {this._showNewsFeed()}
  </div>
      
    );
  }
}
export default Counter;