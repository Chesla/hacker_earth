import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
import * as  StudyAction from '../actions/studyAction';

class StudyStores extends EventEmitter{
	constructor(){
		super()
		this.paths=[];
		this.categories = [];
		this.editCategories = [];
		this.roleName = '';
		this.roleDescription = '';
	}
	
	
	_setAllPaths(pathList){
		console.log('pathList',pathList);
		this.paths = pathList;
		this.emit('change');
	}

	_getPaths(){
		return this.paths;
	}

	
	
	_handleActions(action){
		switch(action.type){
			case 'GET_PATHS' : {
				this._setAllPaths(action.paths);
				break;
			}
			case 'GET_CATEGORIES' : {
				this._setCategories(action.response);
				break;
			}
			case 'EDIT_CATEGORIES' : {
				this._setEditCategories(action.response);
				break;
			}
			
		}
	}
}
const studyStores = new StudyStores;
dispatcher.register(studyStores._handleActions.bind(studyStores));
export default studyStores;

