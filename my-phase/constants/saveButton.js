import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Style from './style';
const styles = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

export default class SaveButton extends React.Component{

	render(){
		return (
			
				<RaisedButton
						label="Save" 
						{...this.props}
						backgroundColor={Style.saveBackground}
						labelColor={Style.saveLabel}
				        style={Style.saveBtn}/>
			
		);
	}
}