import Api from '../constants/api';
import {hashHistory} from 'react-router';
import dispatcher from "../dispatchers/dispatcher";

module.exports = {
    _getAllPaths: function(query) {
         Api._callAPI('https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths','get',query,(type,dt)=> {
            if(type=="success"){
                console.log("success _getAllRoles",dt.paths);
                let data = dt.paths;
               
                for(var i=0 ;i<data;i++){
                    Api._setKey('likes'+data.id,0);
                    Api._setKey('unlikes'+data.id,0);
                }
                dispatcher.dispatch({
                        type:'GET_PATHS',
                        paths: dt.paths
                })
            }else{
                // console.log("error _getAllRoles");
                // dispatcher.dispatch({
                //     type:'SNACKBAR',
                //     str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
                // });
                
            }
            // dispatcher.dispatch({
            //     type: 'LOADER',
            //     loader: false
            // });
        });
        
    },

    // _fetchCategories: function(query) {
    //     Api._callAPI(Url.ADD_ROLETYPE,'get',query,(status,dt) => {
    //         if(status == 'success'){
    //             let data = dt.res_data;
    //             dispatcher.dispatch({
    //                 type: 'GET_CATEGORIES',
    //                 response: data.category_details
    //             });
    //         } else {
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //             });
    //         }
    //         dispatcher.dispatch({
    //             type: 'LOADER',
    //             loader: false
    //         });
    //     });        
    // },

    // _editCategories: function(query) {
    //     Api._callAPI(Url.EDIT_ROLETYPE,'get',query,(status,dt) => {
    //         if(status == 'success'){
    //             let data = dt.res_data;
    //             dispatcher.dispatch({
    //                 type: 'EDIT_CATEGORIES',
    //                 response: data
    //             });
    //         } else {
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //             });
    //         }
    //         dispatcher.dispatch({
    //             type: 'LOADER',
    //             loader: false
    //         });
    //     });     
    // },

    // _addNewRoles: function(query) {
    //     Api._callAPI(Url.ADD_ROLETYPE,'post', query,(status,dt) => {
    //         if(status == 'success'){
    //             hashHistory.goBack();
    //         } else {
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //             });
    //         }
    //         dispatcher.dispatch({
    //             type: 'LOADER',
    //             loader: false
    //         });
    //     });
    // },

    // _editExistingRoles: function(query) {
    //     Api._callAPI(Url.EDIT_ROLETYPE,'post', query,(status,dt) => {
    //             if(status == 'success'){
    //                 hashHistory.goBack();
    //             } else {
    //                 dispatcher.dispatch({
    //                     type:'SNACKBAR',
    //                     str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //                 });
    //             }
    //             dispatcher.dispatch({
    //                 type: 'LOADER',
    //                 loader: false
    //             });
    //         });
    // }, 

    // _deleteRole: function(query) {
    //     Api._callAPI(Url.DELETE_ROLETYPES,'post',query,(status,dt) => {
    //         if(status == "success"){  
    //             let data = '';
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: dt.res_str
    //             });
    //             this._getAllRoles(data);
    //         }else{
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //             });
    //         }
    //         dispatcher.dispatch({
    //             type: 'LOADER',
    //             loader: false
    //         });       
    //     });
    // },

    // _toggleRole: function(query) {
    //     Api._callAPI(Url.DEACTIVATE_ROLETYPES,'post',query,(status,dt) => {
    //         if(status == "success"){  
    //             let data = '';
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: dt.res_str
    //             });
    //             this._getAllRoles(data);
    //         }else{
    //             dispatcher.dispatch({
    //                 type:'SNACKBAR',
    //                 str: Api._showErrorMsg(dt.status,dt.responseJSON||'')
    //             });
    //         }
    //         dispatcher.dispatch({
    //             type: 'LOADER',
    //             loader: false
    //         });    
    //     });     
    // }
};
