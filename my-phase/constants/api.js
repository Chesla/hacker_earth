import React from 'react';
import {Link,hashHistory} from 'react-router';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Select from 'react-select';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import dispatcher from "../dispatchers/dispatcher";
import Badge from 'material-ui/Badge';
import $ from 'jquery';
import moment from 'moment';
const dateRange = {fieldValue1 : new Date(), fieldValue2: new Date()};
let searchTextBit = true;
let controlledUsers = [];
module.exports ={
	_setKey: function(key,value){
		localStorage.setItem(key,value);
	},
	_getKey: function(key){
		return localStorage.getItem(key);
	},
	_removeKey: function(key,value){
		localStorage.removeItem(key);
	},
	_clearStorage: function(){
		let len = localStorage.length;
		for (let i = len - 1; i >= 0; i--) {
            let key = localStorage.key(i);
            if (key != null && key != undefined) {
                localStorage.removeItem(key);
            }
        }
	},
	_callAPI : function(url,method,data,target,cType){
		
		$.ajax({
			url: url,
			method: method,
			data: data,
			processData: (cType == 'multipart/form-data' ? false :true),
			dataType: (cType == 'multipart/form-data' ? '' :'json'),
			contentType: cType ? false : "application/x-www-form-urlencoded",	        
	        success: (data,textStatus, jqXHR) => {
	        	this._setKey('X-RateLimit-Remaining',jqXHR.getResponseHeader('X-RateLimit-Remaining'));
	        	target('success',data);        	
	        },
	        error: (jqXhr,textStatus,error) => {
	        	dispatcher.dispatch({ 
                    type: 'LOADER', 
                    loader: false 
                });
                if(jqXhr.status == 401){
                	this._clearStorage();
      				hashHistory.push('/');
                } else{
	        		target('error',jqXhr,textStatus,error);
	        	}
	        }
		});
	},
}