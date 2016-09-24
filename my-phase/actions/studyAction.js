import dispatcher from "../dispatchers/dispatcher";
import StudyWebAPIUtils from "../utils/studyWebAPIUtils";

export function getAllPaths(inputValue){
	StudyWebAPIUtils._getAllPaths(inputValue);
}
// export function deleteRole(inputValue){
// 	RoleWebAPIUtils._deleteRole(inputValue);
// }
// export function toggleRoleStatus(inputValue){
// 	RoleWebAPIUtils._toggleRole(inputValue);
// }
// export function getPermissionCategories(inputValue){
// 	RoleWebAPIUtils._fetchCategories(inputValue);
// }
// export function getEditPermissionCategories(inputValue){
// 	RoleWebAPIUtils._editCategories(inputValue);
// }
// export function addRoles(inputValue){
// 	RoleWebAPIUtils._addNewRoles(inputValue);
// }
// export function editRoles(inputValue){
// 	RoleWebAPIUtils._editExistingRoles(inputValue);
// }