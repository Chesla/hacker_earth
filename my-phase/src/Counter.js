import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Cell} from 'react-mdl';
import Data from './json';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Like from 'react-material-icons/icons/action/thumb-up';
import IconButton from 'material-ui/IconButton';
import Moment from 'moment';
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
      news:Data.newsFeed.posts,
      tabValue :'NORMAL_POST',
      newNews:[],
      newTitle:'',
      likes : {},
      Comments :{}
    };
  }
  sortFunction(a,b){  
    var dateA = new Date(a.published).getTime();
    var dateB = new Date(b.published).getTime();
    return dateA > dateB ? 1 : -1;  
  } 
  _addNewPost(){

    let newValues = this.state.news;
    let newNews = this.state.newNews;
    let value = {};
    let news = [];
    value.author = 'Chesla';
    value.text = this.state.newTitle;
    value.published = new Date().toString();
    value.published = Moment(value.published).format('YYYY-MM-DD, h:mm:ss a');
    value.thread={};
    value.thread.main_image = '';
    value.title = '';
    var totalNews = newValues.length + newNews.length;
    value.uuid = 'News'+totalNews;
    
   
    newNews.push(value);
    this.setState({
      newNews :newNews,
      newTitle:''
    })
  }
  _showNewNewsFeed(){
    var news = this.state.newNews;
    news.sort(function(a, b){ 
      var dateA=new Date(a.published), dateB=new Date(b.published)
      return dateB-dateA 
    });
    return news.map((values)=> {
      console.log("value",values.text.length,values.text);
      return(
              <Grid key={values.uuid}>
              <Cell col={6}/>
                <Cell col={6}>
                  <Card
                  style={{width:'600px',marginLeft:'25%',clear:'both',float:'left',position:'relative',marginBottom:'2%'}}
                   onExpandChange={(event)=> {console.log(event);this.setState({showShortNews:event})}}>
                     <CardHeader
                        title={values.author != "" ? values.author.toUpperCase() : 'ANONYMOUS'}
                        subtitle={values.published}/>
                        
                      {values.text.length > 555 ?
                        <CardText hidden={this.state.showShortNews}>
                          {values.text.substring(0,555)}...
                        </CardText>
                        : values.text.length < 555 && values.text.length >0 ?
                        <CardText hidden={this.state.showShortNews}>
                          {values.text}
                        </CardText> : ''
                      }
                      {values.text.length > 555 ?
                          
                          <CardHeader
                            actAsExpander={true}
                            showExpandableButton={true}/>
                          
                          :
                          ''
                      }
                      <CardText expandable={true}>
                             {values.text}
                          </CardText>
                    <CardActions>
                      <Grid style={{padding:0,display:'flex'}}>
                          <Like/>
                          <span style={{color:'#337ab7', cursor:'pointer',marginRight:'3px',flex:1}}>{this.state.likes[values.uuid] ? this.state.likes[values.uuid] : ''} </span>
                          <span style={{color:'#337ab7',cursor:'pointer',marginLeft:'3px',float:'right'}} > Comment</span>
                      </Grid>
                      <FlatButton label="Like" onTouchTap={()=>{let likes = this.state.likes; likes[values.uuid] = likes[values.uuid] ? likes[values.uuid] : 0;  likes[values.uuid] = likes[values.uuid]+1; this.setState({likes:likes});}}/>

                      <FlatButton label="Comment"/>
                    </CardActions>
                  </Card>
                </Cell>
              </Grid>
          );
    });
  }
 _showNewsFeed(){
    var news = this.state.news;

    return news.map((values)=> {
      return(
              <Grid key={values.uuid}>
              <Cell col={6}/>
                <Cell col={6}>
                  <Card
                  style={{width:'600px',marginLeft:'25%',clear:'both',float:'left',position:'relative',marginBottom:'2%'}}
                   onExpandChange={(event)=> {console.log(event);this.setState({showShortNews:event})}}>
                     <CardHeader
                        title={values.author != "" ? values.author.toUpperCase() : 'ANONYMOUS'}
                        subtitle={Moment(values.published).format('YYYY-MM-DD, h:mm:ss a')}/>
                        {values.thread.main_image !=='' ?
                          <CardMedia 
                            overlay={<CardTitle title={values.title}/>}
                          >
                            <img height="350px" src={values.thread.main_image}/>
                          </CardMedia>
                          :
                          <CardTitle title={values.title}/>
                        }
                      {values.text.length > 555 ?
                        <CardText hidden={this.state.showShortNews}>
                          {values.text.substring(0,555)}...
                        </CardText>
                        : values.text.length < 555 && values.text.length >0 ?
                        <CardText hidden={this.state.showShortNews}>
                          {values.text}
                        </CardText> : ''
                      }
                      {values.text.length > 555 ?
                          
                          <CardHeader
                            actAsExpander={true}
                            showExpandableButton={true}/>
                          
                          :
                          ''
                      }
                      <CardText expandable={true}>
                             {values.text}
                          </CardText>
                    <CardActions>
                      <Grid style={{padding:0,display:'flex'}}>
                          <Like/>
                          <span style={{color:'#337ab7', cursor:'pointer',marginRight:'3px',flex:1}}>{this.state.likes[values.uuid] ? this.state.likes[values.uuid] : ''} </span>
                          <span style={{color:'#337ab7',cursor:'pointer',marginLeft:'3px',float:'right'}} > Comment</span>
                      </Grid>
                      <FlatButton label="Like" onTouchTap={()=>{let likes = this.state.likes; likes[values.uuid] = likes[values.uuid] ? likes[values.uuid] : 0;  likes[values.uuid] = likes[values.uuid]+1; this.setState({likes:likes});}}/>

                      <FlatButton label="Comment"/>
                    </CardActions>
                  </Card>
                </Cell>
              </Grid>
          );
    });
 }
  render() {
    return (
      
       <div>
       <Card style={{width:'600px',marginLeft:'25%',clear:'both',float:'left',position:'relative',marginBottom:'2%'}}>
        <CardText>
          <Grid>
            <Cell col={12}>
              <ul className="nav nav-tabs">
                <li className={this.state.tabValue == 'NORMAL_POST' ? 'active' : 'inactive'} onClick={()=>{this.setState({tabValue:'NORMAL_POST'})}}><a>Update Status</a></li>
                  <li className={this.state.tabValue == 'PHOTOS_POST' ? 'active' : 'inactive'} onClick={()=>{this.setState({tabValue:'PHOTOS_POST'})}}><a>Add Photos/Videos</a></li>
              </ul>
              { (this.state.tabValue == 'NORMAL_POST') ? 
                <TextField
                  fullWidth={true}
                  underlineShow={false}
                  value={this.state.newTitle}
                  onChange={(event,value)=>{this.setState({newTitle:value})}}
                  hintText="What's on your mind?"
                />
                :''
              }
            </Cell>
          </Grid>
           
        </CardText>
        <CardActions style={{textAlign: 'right'}}>

          <FlatButton 
            primary={true}
            onTouchTap={this._addNewPost.bind(this)}
            label="Post"/>
        </CardActions>
       </Card>
     
      {this.state.newNews.length ?
        this._showNewNewsFeed() : ''
      }
       {this._showNewsFeed()}
  </div>
      
    );
  }
}
export default Counter;