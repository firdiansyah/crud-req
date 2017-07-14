import React from 'react'
import ReactDOM from 'react-dom'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import GridListItem from './GridListItem'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import customStyle from '../../app/assets/css/layout.css'

const style = {
  marginLeft: 20
};

const styleButton = {
  marginBottom: 20,
  marginLeft: 20,
  marginTop: 20
}

const styleHeading = {
  marginTop: 20,
  marginLeft: 20
}

const styleContainer = {
}

export default class EntryItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    EntryItem.propTypes = {
      saveData: React.PropTypes.func
    }

    this.handleSave = this.handleSave.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  // Handle Form Data Change
  idChange (e) {
    this.props.idChange(e)
  }

  nmChange (e) {
    this.props.nmChange(e)
  }

  descChange (e) {
    this.props.descChange(e)
  }

  unitChange (e) {
    this.props.unitChange(e)
  }

  handleSave(){
    if(this.props.validate()){
      this.setState({open: true})
    }
  }

  handleClear(){
    this.props.clearForm()
  }

  handleDelete(){
    this.props.deleteData()
  }

  handleClose () {
    this.setState({open: false});
  };

  handleConfirm () {
    this.setState({open: false})
    this.props.saveData()
  };
  // End of Handle Form Data Change

  render() {
    return (
    <div className="containerEntryItem">
      <MuiThemeProvider>
      <Paper zDepth={1} style={styleContainer}>
        <h4 className="formHeader">Entry Item - ReactJS</h4>
        <form name="EntryItem" method="POST">
          <TextField
            id="id"
            type="text"
            hintText=""
            floatingLabelText=""
            style={style}
            readOnly={true}
            errorText={this.props.errorTextKode}
            onChange = {this.idChange.bind(this)}
            value = {this.props.getId}
            hidden= {true}
            underlineShow={false}
          />
          <Divider />
          <TextField
            id="nm_item"
            type="text"
            hintText="Item Name"
            onChange={this.nmChange.bind(this)}
            floatingLabelText="Item Name"
            style={style}
            errorText={this.props.errorTextName}
            underlineShow={false}
            value={this.props.nmItemVal}/>
          <TextField
            id="desc"
            type="text"
            hintText="Description"
            onChange={this.descChange.bind(this)}
            floatingLabelText="Description"
            style={style}
            errorText={this.props.errorTextDescription}
            underlineShow={false}
            value={this.props.descVal}/>
          <Divider />
          <TextField
            id="unit"
            type="text"
            hintText="Unit"
            onChange={this.unitChange.bind(this)}
            floatingLabelText="Unit"
            style={style}
            errorText={this.props.errorTextUnit}
            underlineShow={false}
            value={this.props.unitVal}/>
          <Divider />
          <RaisedButton
            label="Save"
            style={styleButton}
            primary={true}
            onClick={this.handleSave.bind(this)}/>
          <RaisedButton
            label="New"
            style={styleButton}
            onClick={this.handleClear.bind(this)}/>
        </form>
      </Paper>
      </MuiThemeProvider>
      <MuiThemeProvider>
      <Dialog
        title="Confirm"
        modal={this.state.open}
        autoScrollBodyContent={false}
        actions={
          <div>
          <FlatButton
            label="No"
            primary={false}
            onTouchTap={this.handleClose}
          />
          <FlatButton
            label="Yes"
            primary={true}
            disabled={false}
            onTouchTap={this.handleConfirm}
          />
          </div>
        }
        open={this.state.open}
      >
        Are you sure?
      </Dialog>
      </MuiThemeProvider>
    </div>
    )}
}
