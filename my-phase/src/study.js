import React from 'react';
import {
  Layout, 
  Header, 
  HeaderRow, 
  Navigation, 
  Drawer, 
  Content, 
  Icon
} from 'react-mdl';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Grid, Cell, Table,TableHeader, Textfield} from 'react-mdl';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Link,hashHistory} from 'react-router';
import IconButton from 'material-ui/IconButton';
import Dislike from 'react-material-icons/icons/action/thumb-down';
import Like from 'react-material-icons/icons/action/thumb-up';
import Sort from 'react-material-icons/icons/action/swap-vert';
import Poll from 'react-material-icons/icons/action/view-headline';
import HTTP from 'react-material-icons/icons/action/http';
import Visibility from 'react-material-icons/icons/action/visibility';
import Loyalty from 'react-material-icons/icons/action/loyalty';
import Style from '../constants/style';
import Api from '../constants/api';
import SaveButton from '../constants/saveButton';
import * as  StudyAction from '../actions/studyAction';
import StudyStores from '../stores/studyStores';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AutoComplete from 'material-ui/AutoComplete';
export default class Study extends React.Component{

  constructor(){
    super();
    
    this.state={
      tableData: StudyStores._getPaths() ||[],
      open:false,
      openGroupDialog:false,
      totalCourses:StudyStores._getPaths().length || 0,
      visibleCourses:StudyStores._getPaths().length || 0,
      card_tags:{},
      likes:{},
      unlikes:{},
      tags:[],
      sort_type:'',
      deleteUGOpen:false,
      
    }
    this.getStudyStores = this.getStudyStores.bind(this);
  }
  componentWillMount(){
    StudyStores.on('change', this.getStudyStores);
    this._getAllPaths();
  }
  componentWillUnmount(){
    StudyStores.removeListener('change', this.getStudyStores);
  }
  getStudyStores(){
      var paths = StudyStores._getPaths();
      var card_tags = {};
      var tags = [];
      
      var unlikes = this.state.unlikes;
      var likes = this.state.likes;
      if(paths.length){
        for(var i =0; i<paths.length; i++){
          paths[i].unlikes = Api._getKey('unlikes'+paths[i].id);
          paths[i].likes =  Api._getKey('likes'+paths[i].id);
          unlikes[paths[i].id]=0;
          likes[paths[i].id]=0;
          card_tags[paths[i].id]=paths[i].tags.split(',');
          let particularTag = paths[i].tags.split(',');
          for(var j=0 ;j<particularTag.length ;j++){
            tags.push(particularTag[j]);
          }
        }
      }
      
      Api._setKey('unlikes',unlikes);
      Api._setKey('likes',likes);
      this.setState({
        tableData: paths ||[],
        card_tags:card_tags,
        tags:tags,
        unlikes:unlikes,
        likes:likes,
        totalCourses:paths.length,
        visibleCourses:paths.length
      })
  }
  _getAllPaths(){
    StudyAction.getAllPaths();
  }


  _displayTags(id,object){
    return(<span>{id}</span>)
  }

  sign_up(id,object){
    return(
          <Grid>
            <Cell col={12}><span><a href={id} target="_blank">Sign_Up</a></span></Cell>
            <Cell col={12} style={{display:'flex',marginLeft:'25%'}}>
                  <span> <IconButton
                            onTouchTap={()=>{let likes = this.state.likes; likes[object.id] = likes[object.id] ? likes[object.id] : 0;  likes[object.id] = likes[object.id]+1; Api._setKey('likes',likes); this.setState({likes:likes});}}
                          > 
                          <Dislike/>
                        </IconButton>
                  </span>
                  <span style={{marginLeft:'-7%',marginTop:'7%'}}>{this.state.likes[object.id]} {Api._getKey(this.state.likes[object.id])}</span>
                  <span> <IconButton
                            onTouchTap={()=>{let unlikes = this.state.unlikes; unlikes[object.id] = unlikes[object.id] ? unlikes[object.id] : 0;  unlikes[object.id] = unlikes[object.id]+1; Api._setKey('unlikes',unlikes); this.setState({unlikes:unlikes});}}
                          >  
                           <Like/> 
                        </IconButton>
                  </span>
                  <span style={{marginLeft:'-7%',marginTop:'7%'}}>{this.state.unlikes[object.id]} {Api._getKey(this.state.unlikes[object.id])}</span>
            </Cell>
          </Grid>
         
      )
  }
  dislike(value){
    var paths = StudyStores._getPaths();
    var unlikes = this.state.unlikes;
    var count = unlikes[value];
    if(paths.length){
      for(var i=0; i<paths.length; i++){
        if(paths[i].id==value){
          paths[i].unlikes = parseInt(paths[i].unlikes)+1;
          count = count+1;
          unlikes[value]= unlikes[value]+1;
        }
      }
    }
    this.setState({
      unlikes:unlikes
    })
    Api._setKey('unlikes'+value,count);
  }
  like(value){
    var paths = StudyStores._getPaths();
    var likes = this.state.likes;
    var count = likes[value];
    if(paths.length){
      for(var i=0; i<paths.length; i++){
        if(paths[i].id==value){
          paths[i].likes = parseInt(paths[i].likes)+1;
          count = count+1;
          likes[value]= likes[value]+1;
        }
      }
    }
    this.setState({
      likes:likes
    })
    Api._setKey('likes'+value,count);
  }
 _showFeed(){
    var feed = this.state.tableData;
    return feed.map((values)=> {

      return( 
          <Grid style={{padding: '0px',marginBottom:'5px'}}  key={values.id}>
            <Card style={Style.CardStyle}>
            
                <div style={{padding:16,display:'inline-block'}}>
                  <div style={{fontSize:16, color:"#237bfb", fontWeight:"bold"}}>
                    {values.name != "" ? values.name.toUpperCase() : 'ANONYMOUS'}
                  </div>
                  <div style={{fontSize:12,display:'flex'}}>
                    <div><Loyalty/></div><div>{values.tags}</div>
                  </div>
                </div>
                <Divider/>
               
                  <CardMedia 
                      overlay={<CardTitle title={`Learners: ${values.learner} Hours: ${values.hours} `}/>}
                  >
                      <img height="350px" src={values.image}/>
                    </CardMedia>
                  <CardText hidden={this.state.showShortNews}>
                    {values.description}
                  </CardText>
                  <Divider/>
                  
                  <CardActions>
                    <Grid style={{display:'flex'}}>
                      <span style={{textAlign:'left',flex:1}}> 
                        <IconButton
                            onTouchTap={this.dislike.bind(this,values.id)}
                        > 
                          <Dislike/>
                        </IconButton>
                        <span>{Api._getKey('unlikes'+values.id)}</span>
                        <IconButton
                            onTouchTap={this.like.bind(this,values.id)}
                        > 
                          <Like/>
                        </IconButton>
                        <span>{Api._getKey('likes'+values.id)}</span>
                      </span>
                      <span style={{textAlign:'right'}}><SaveButton label="View Curriculum" href={values.sign_up} target="_blank"/></span>
                    </Grid>
                 </CardActions>
            </Card> 
            </Grid>     
          )
              
    });
 }
  showFilterFeed(searchText,dataSource){
    if(searchText==""){
      this.setState({
        tableData:StudyStores._getPaths() ||[],
        visibleCourses:StudyStores._getPaths().length || 0
      })
    }
   }
 _autoCompleteChange(value,index){
    var showFeedId = [];
    var feed = this.state.tableData;
    var newFeed = [];
    for(var i in this.state.card_tags){
      if(this.state.card_tags[i].includes(value)){
        showFeedId.push(i);
      }
    }
    for(var j=0 ;j<feed.length ;j++){
      for(var k=0; k<showFeedId.length; k++){
        if(feed[j].id==showFeedId[k]){
          newFeed.push(feed[j]);
        }
      }
    }
    this.setState({
      searchTags : value,
      tableData:newFeed,
      visibleCourses:newFeed.length,
    })
    
  }
 _handleSortTypeOption(event,value){
    var feed = [];
    if(value == 'Vote_up'){
      feed = this.state.tableData;
      feed.sort(function(a, b){ 
        var A= a.likes!==null ? parseInt(a.likes) : 0, B = b.likes!==null ? parseInt(b.likes) : 0;
        return B-A 
      });
    }
    else if(value == 'Vote_down'){
      feed = this.state.tableData;
      feed.sort(function(a, b){ 
        var A= a.unlikes!==null ? parseInt(a.unlikes) : 0, B = b.unlikes!==null ? parseInt(b.unlikes) : 0;
        return B-A 
      });
    }
    else if(value == 'Learners'){
      feed = this.state.tableData;
      feed.sort(function(a, b){ 
        var A= parseInt(a.learner), B=parseInt(b.learner);
        return B-A 
      });
    }
    else if(value == 'Duration'){
      feed = this.state.tableData;
      feed.sort(function(a, b){ 
        var A = parseInt(a.hours.substring(0,a.hours.length-1)), B=parseInt(b.hours.substring(0,b.hours.length-1));
        return B-A 
      });
    }
    this.setState({
      sort_type:value,
      tableData:feed
    })
  }
  render(){
    // console.log('render usergroup',this.state.tableData);
    let height = window.innerHeight - 25*window.innerHeight/100;
    return (
      <div className="demo-big-content">
        <Layout>
              <Header waterfall>
                <HeaderRow 
                  className="middleHeader" 
                  title={<a href="#/dashboard"><img style={{marginLeft:15}} src="../www/assets/images/logo.png"/></a>}
                  style={Style.middleHeaderRowStyle}>
                  <div style={Style.middleRightHeaderStyle}>
                    <Paper 
                      style={Style.smallLogoPaperStyle} 
                      circle={true}>
                        <HTTP/> 
                    </Paper>
                    <span style={Style.middleRighHeaderContent}>
                      <span style={Style.sideNavButtonStyle}>  
                        Api Hits
                      </span>
                      <br/>
                      <span>
                        {Api._getKey('X-RateLimit-Remaining')}
                      </span>
                    </span>
                  </div>
                </HeaderRow>
              </Header>
              <br/>
              <br/>
              <br/>
              <Content>
                <div style={Style.fontStyle}>
                <Grid className="demo-grid-ruler" style={{backgroundColor:"#E8EBEE",display:'flex',marginTop:10}}>
                  <Cell col={2} style={{width: '20%',height:height,margin:'5px'}}>
                    <Card style={{height:'inherit',position:'fixed',width:'inherit'}}>
                      <CardText className='hidden-scrollbar'  style={{height:'inherit'}}>
                        <div style={{padding:'5px',display:'flex'}}><div><Poll/></div><div><label style={{width:'200px'}}>Total Courses: {this.state.totalCourses}</label></div></div>
                        <div style={{padding:'5px',display:'flex'}}><div><Visibility/></div><div><label style={{width:'200px'}}>Visible Courses: {this.state.visibleCourses}</label></div></div>
                        <div style={{padding:'5px',display:'flex'}}><div><Sort/></div><div><label style={{width:'200px'}}>Sort By</label></div></div>
                        <RadioButtonGroup style={{padding:'5px'}} name="sort_type" valueSelected={this.state.sort_type} onChange={this._handleSortTypeOption.bind(this)}>
                          <RadioButton
                            value="Vote_up"
                            label="Vote (Up)"
                            style={Style.radioButton,{width:'200px'}}
                          />
                          <RadioButton
                            value="Vote_down"
                            label="Vote (Down)"
                            style={Style.radioButton,{width:'200px'}}
                          />
                          <RadioButton
                            value="Learners"
                            label="Learners"
                            style={Style.radioButton,{width:'200px'}}
                          />
                          <RadioButton
                            value="Duration"
                            label="Duration"
                            style={Style.radioButton,{width:'200px'}}
                          />
                        </RadioButtonGroup>
                        <AutoComplete
                          id='searchTags'
                          floatingLabelText="Search By Tags"
                          animated={true}
                          style={{padding:'10px'}}
                          menuStyle = {{maxHeight: '300px'}}
                          dataSource={this.state.tags}
                          filter={AutoComplete.fuzzyFilter}
                          onUpdateInput={this.showFilterFeed.bind(this)}
                          onNewRequest={this._autoCompleteChange.bind(this)}
                        />
                      </CardText>
                    </Card>
                  </Cell>
                  <Cell col={10} style={{width: '77%',margin:'5px'}}>
                    {this._showFeed()}
                  </Cell>
                </Grid>
                </div>
              </Content>
        </Layout>
      </div>  
      
    )
  }
}