import React from 'react';
import {Link,hashHistory} from 'react-router';
import {
	Layout, 
	Header, 
	HeaderRow, 
	Navigation, 
	Drawer, 
	Content, 
	Icon
} from 'react-mdl';

/*--------Material components import-------------*/
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/action/reorder';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

/*-------------Constant files import-----------------*/
import Api from '../constants/api';
import Styles from '../constants/style';

/*--------Store and actions files import-------------*/
import * as  UserInfoAction from '../actions/userInfoAction';
import UserInfoStores from '../stores/userInfoStores';

export default class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			notificationMsg: 'No notification',
			userInfoObj : UserInfoStores.getAllUserInfoStores(),
			open: false,
			balance: UserInfoStores._getTotalWalletBalance(Api._getKey('viewType')),
			snackbarStr:'',
			showLoader:false,
			amount: '',
			valueSingle: 3,
			currency: UserInfoStores.getDefaultCurrency(),
			viewType:Api._getKey('viewType') ? Api._getKey('viewType') : 'Employee',
			has_role:eval(Api._getKey('has_role'))
		};

		this.manageChangeInLocalstorage = this.manageChangeInLocalstorage.bind(this);
		this._getAllUserInfoStores = this._getAllUserInfoStores.bind(this);
		this._changeView = this._changeView.bind(this);
		this._handleRequestClose = this._handleRequestClose.bind(this);
	}
	componentWillMount(){
		document.body.style.background = Styles.DASHBOARDBACKGROUND;
		if(!Api._getKey('cid') || !Api._getKey('token')){
			if(this.props.location.action === 'POP' && this.props.location.pathname && !this.props.location.pathname.match(/undefined/g)){
				Api._setKey('redirectUrl',this.props.location.pathname||'');
			}
			Api._redirectToLogin();	
	        return false;
		}
		window.addEventListener('storage', this.manageChangeInLocalstorage, false);
		UserInfoStores.on('change', this._getAllUserInfoStores);
		UserInfoAction.getUserInfo({});
	}
	componentDidMount(){
		Api._removeKey('redirectUrl');
		if(this.state.viewType !== 'Employee'){
			UserInfoAction.getOrgBalance();	
		}
	}

	componentWillReceiveProps(){
		if(!Api._getKey('cid') || !Api._getKey('token')){
			console.log('inside componentWillReceiveProps with no cid n token');
			Api._clearStorage();	
			Api._redirectToLogin();	
	        return false;
		} else {
			if(Api._getKey('viewType') !== 'Employee'){
				UserInfoAction.getOrgBalance();			
			}
		}
	}
	componentWillUnmount(){
		UserInfoStores.removeListener('change', this._getAllUserInfoStores);
		window.removeEventListener('storage', this.manageChangeInLocalstorage);
	}

	manageChangeInLocalstorage(event){
		if(event.key === 'happay.cid'){
	    	if(!event.newValue){
	        	Api._removeKey('cid');
	        	Api._clearStorage();
	            Api._redirectToLogin();
	        }
	    } else if(event.key === 'happay.viewType'){
	    	if(Api._getKey('cid') && (event.newValue != event.oldValue)){
	    		hashHistory.replace('/dashboard');
	    	}
	    }
	}

	_handleRequestClose(){
		this.setState({
	      open: false,
	    });
	}
  	_getAllUserInfoStores(type)
	{	
		if(type === 'snackbar')
		{
			this.setState({
				snackbarStr : UserInfoStores.getSnackbarStr(),
				open: true
			})
			
		} else if(type === 'changeview'){
			this._changeView();
		}
		else if(type === 'loader'){
			this.setState({
				showLoader : UserInfoStores.getLoader(),
			});	
		} else if(type === 'orgBalance'){
			this.setState({amount: UserInfoStores.getOrgBalance()});
		} else if(type === 'componentmessage'){
			this.setState({
				snackbarStr : UserInfoStores.showMessage(),
				open: true
			})	
		}
		else{
			var tempUserInfoObj = UserInfoStores.getAllUserInfoStores();
			let obj = {
				userInfoObj : tempUserInfoObj,
				has_role : eval(Api._getKey('has_role')),
				viewType : Api._getKey('viewType')||'Employee',
				currency: UserInfoStores.getDefaultCurrency(),
			}
			if(this.state.viewType === 'Employee'){
				let sum = 0;
				if(tempUserInfoObj && tempUserInfoObj.wallets){
					tempUserInfoObj.wallets.filter((el)=>{
						sum += parseFloat(el.trans_limit);
					});
				}
				obj.amount = sum;
			}
			this.setState(obj);	
		}
	}

	_changeView(){
		if(this.state.viewType == 'Employee'){
			Api._setKey('viewType','Privileged');
			UserInfoAction.getOrgBalance();
			this.setState({
				viewType: 'Privileged'
			});
		}else{
			Api._setKey('viewType','Employee');
			this.setState({
				viewType: 'Employee'
			})
		}
		hashHistory.replace('/dashboard');
	}
	_setName(type){
		this.setState({
			active:type
		})
	}
	render() {
		let balance = UserInfoStores._getTotalWalletBalance(Api._getKey('viewType'));
		return (
				<div className="demo-big-content">
					<Snackbar
						open={this.state.open}
						message={this.state.snackbarStr ? this.state.snackbarStr : ''}
						autoHideDuration={4000}
						bodyStyle={{maxWidth:'1500px'}}
						onRequestClose={this._handleRequestClose}/>
			        {this.state.showLoader ? <CircularProgress size={2} style={Styles.mainLoader}/> : ''}
					<Layout>
						<Header waterfall hideTop>
							<HeaderRow 
								style={Styles.minheaderRowStyle} 
								title={<Link 
											to="/dashboard" 
											className="minheaderRowTextStyle" 
											style={{fontSize:12,color:'#4a4a4a',marginLeft:35}}>
											{this.state.userInfoObj.org_name||'Training Video'}
										</Link>
								}>
								<Navigation style={{marginRight:25}}>
									<Link className="minheaderRowTextStyle" to="/offers">Offers</Link>
									<Link className="minheaderRowTextStyle" to="/points">Loyality Points</Link>
									<Link className="minheaderRowTextStyle" to="/support">Support</Link>
								</Navigation>
							</HeaderRow>
							<HeaderRow 
								className="middleHeader" 
								title={<a href="#/dashboard"><img style={{marginLeft:25}}src="logo_black.png"/></a>} 
								style={Styles.middleHeaderRowStyle}>
								<div style={Styles.middleRightHeaderStyle}>
									<Paper 
										style={Styles.smallLogoPaperStyle} 
										circle={true}>
											<Link to="/wallet"><Icon 
												style={{margin:4,color:'#77AFDC',fontSize:'19px'}}
												name="account_balance_wallet"/></Link>
									</Paper>
									<span style={Styles.middleRighHeaderContent}>
										<span style={Styles.sideNavButtonStyle}>	
											{this.state.viewType!=='Employee'? 'Company Balance' : 'Wallet Balance'}
										</span>
										<br/>
										<span>
											{this.state.currency} {Api._formatAmount(balance)}
										</span>
									</span>
									<Paper 
										style={Styles.smallLogoPaperStyle} 
										circle={true}>
											<Link to={this.state.viewType!=='Employee'? '/profile' : '/profile/editEmployeeprofile'}><Icon 
									    		style={{margin:4,color:'#77AFDC',fontSize:'19px'}}
									    		name="person"/></Link>
									</Paper>
									<span style={Styles.middleRighHeaderContent}>
										<span style={Styles.sideNavButtonStyle}>	
											{this.state.viewType}
										</span>
										<br/>
										<span>
											{Api._formatName(this.state.userInfoObj.first_name)}
										</span>
									</span>
								</div>
								<SideMenu viewType={this.state.viewType}/>
							</HeaderRow>
							<HeaderRow style={Styles.mainHeaderStyle}>
								<Navigation>
									{this.state.viewType!=='Employee' ? 
										<Link
											style={{width:130,paddingLeft:38,textAlign:'center'}} 
											to="/cards" 
											activeClassName="activeTab">
											USERS
										</Link> : null
									}
									<Link 
										style={{width:130, textAlign:'center'}}
										to="/expense" 
										activeClassName="activeTab">
										EXPENSES
									</Link>
									<Link 
										style={{width:130,textAlign:'center'}}
										to={this.state.viewType!=='Employee' ? '/pending/report' : '/report' } 
										activeClassName="activeTab">
										REPORTS
									</Link>
									{this.state.viewType==='Employee' ? 
										<Link 
											style={{width:130,textAlign:'center'}}
											to="/travel/travelrequest" 
											activeClassName="activeTab">
											TRAVEL
										</Link> : 
										<Link 
											style={{width:130,textAlign:'center'}}
											to="/pending/travel"  
											activeClassName="activeTab">
											TRAVEL
										</Link>
									}
									<Link 
										to={this.state.viewType == 'Employee' ? '/moneyrequest' : "/pending/moneyrequest"}
										activeClassName="activeTab">
										MONEY REQUEST
									</Link>
								</Navigation>
							</HeaderRow>
						</Header>
						<Drawer title="Happay">
							<Navigation>
									{this.state.viewType!=='Employee' ? 
										<Link 
											to="/cards" 
											onClick={this._setName.bind(this,'cards')}  
											activeClassName="activeTab">
											Users
										</Link> : null
									}
									<Link 
										to="/expense" 
										activeClassName="activeTab" 
										onClick={this._setName.bind(this,'expense')}>
										Expenses
									</Link>
									<Link 
										to={this.state.viewType!=='Employee' ? '/pending/report' : '/report' } 
										activeClassName="activeTab" 
										onClick={this._setName.bind(this,'report')}>
										Report
									</Link>
									{this.state.viewType==='Employee' ? 
										<Link 
											to="/travel/travelrequest" 
											activeClassName="activeTab" 
											onClick={this._setName.bind(this,'travel')}>
											Travel
										</Link> : 
										<Link 
											to="/pending/travel"  
											activeClassName="activeTab" 
											onClick={this._setName.bind(this,'travel')}>
											Travel
										</Link>
									}
							</Navigation>
						</Drawer>
						<Content>
							{this.props.children}
						</Content>
					</Layout>
				</div>
		);
	}
}

class SideMenu extends React.Component{
	
	constructor(){
		super();
		this.state ={
			open: false,
			anchorEl: {},
			has_role: eval(Api._getKey('has_role'))
		}
		this._handleTouchTap = this._handleTouchTap.bind(this);
		this._handleRequestClose = this._handleRequestClose.bind(this);
		this._sideItemClick = this._sideItemClick.bind(this);
	}

	_handleTouchTap(event){
		event.preventDefault();

	    this.setState({
	      	open: true,
	      	anchorEl: event.currentTarget,
	    });
	}

	_handleRequestClose(){
	    this.setState({
	      open: false,
	    });
	};

  	_sideItemClick(event,value){
	  	// console.log(value)
	    if(value === '3'){
	    	UserInfoStores.initData();
			Api._clearStorage();
			hashHistory.replace('/');
	    }
	    else if(value === 'administration'){
	      hashHistory.push('/administration');
	    }
	    else if(value === 'wallet'){
	      hashHistory.push('/wallet');
	    }
	    else if(value === '1'){
	      hashHistory.push('/profile');
	    }
	    else if(value === 'employeeProfile'){
	      hashHistory.push('/profile/editEmployeeprofile');
	    }
	    else if(value === 'summaryMail'){
	      hashHistory.push('/etl');
	  	}
	    else if( value === 'switchAccount'){
	    	UserInfoAction.changeView();
	    } 
  	}
  	render(){
  		return (
			<div>
				<IconMenu
					iconButtonElement={<IconButton style={{fill:'#4a4a4a'}}><MoreVertIcon /></IconButton>}
					onChange={this._sideItemClick}
					style={{cursor:'pointer'}}
					value={this.state.valueSingle}>
						{this.state.has_role ? [<MenuItem key={1234} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="switchAccount">Switch Account</MenuItem>] : null}
				    	{this.props.viewType!=='Employee' ?
				    		[
				    			<MenuItem key={1} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="1">Company Profile </MenuItem>,
								<MenuItem key={2} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="administration">Administration</MenuItem>,
								<MenuItem key={3} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="wallet">Company Wallet</MenuItem>
							] :
							[
								<MenuItem key={4} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="employeeProfile">My Profile </MenuItem>,
								<MenuItem key={5} style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="wallet">My Wallet</MenuItem>
							] 
						}
						<MenuItem style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="summaryMail">Notification</MenuItem>
						<MenuItem style={{fontSize:14,cursor:'pointer',lineHeight:'30px' , whiteSpace: 'nowrap', textTransform: 'capitalize'}} value="3">Sign out</MenuItem>
				</IconMenu>
		    </div>
		);
	}
}