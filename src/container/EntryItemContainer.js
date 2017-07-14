import React from 'react'
import ReactDOM from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import EntryItem from '../components/master/EntryItem'
import GridListItem from '../components/master/GridListItem'

import DialogSuccessSave from '../components/pop/DialogSuccessSave'

import {Row, Col} from 'react-flexbox-grid'

injectTapEventPlugin();

const baseUrl = 'https://api-items.herokuapp.com/api/v1/items'

class EntryItemContainer extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      update: false,
      openNotif: false,
      modalDelete: false,
      id: '0',
      idToDelete: '',
      name: '',
      description: '',
      unit: '',
      items: [],
      errorTextId: '',
      errorTextName: '',
      errorTextDescription: '',
      errorTextUnit: '',
      messageDialog: ''
    }

    this._validate = this._validate.bind(this)
    this.handleSaveButton = this.handleSaveButton.bind(this)
    this.handleDelete = this.handleDeleteButton.bind(this)
    this.handleSetItemToDelete = this.handleSetItemToDelete.bind(this)
  }

  componentWillMount() {
    this._getItemList()
  }

  _getItemList() {
    $.ajax({
      url: baseUrl,
      success: function(data) {
        this.setState({items: data.data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(baseUrl, status, err.toString());
      }.bind(this)
    });
  }

  // Handle Form Data Change
  idChange (e) {
    this.setState({id: e.target.value})
  }

  nmChange (e) {
    this.setState({name: e.target.value})
  }

  descChange (e) {
    this.setState({description: e.target.value})
  }

  unitChange (e) {
    this.setState({unit: e.target.value})
  }
  // End of Handle Form Data Change

  _save() {
    $.ajax({
      url: baseUrl,
      dataType: 'json',
      method: 'POST',
      data: {
        item: {
                name: this.state.name,
                description: this.state.description,
                unit: this.state.unit
              }
            },
      success: function(data) {
        this.handleClearButton()
        this.setMessageDialog('Save successful')
        this.setState({openNotif: true})
      }.bind(this),
      error: function(xhr, status, err) {
        this.setMessageDialog('Save failed')
        this.setState({openNotif: true})
      }.bind(this)
    });
  }

  _update() {
    $.ajax({
      url: baseUrl + '/' + this.state.id,
      dataType: 'json',
      method: 'PUT',
      data: {
        item: {
          name: this.state.name,
          description: this.state.description,
          unit: this.state.unit
        }
      },
      success: function(data) {
        this.handleClearButton()
        this.setMessageDialog('Update successful')
        this.setState({openNotif: true})
      }.bind(this),
      error: function(xhr, status, err) {
        this.setMessageDialog('Update failed')
        this.setState({openNotif: true})
      }.bind(this)
    });
  }

  _destroy(id) {
    $.ajax({
      url: baseUrl + '/delete/' + id,
      type: 'GET',
      success: function(data) {
        this.setMessageDialog('Delete successful')
        this.handleClearButton()
        this.setState({openNotif: true})
      }.bind(this),
      error: function(xhr, status, err) {
        this.setMessageDialog('Delete failed')
        this.setState({openNotif: true})
      }.bind(this)
    });
  }

  _validate() {
    var error = 0,
        errorMessage = 'Mandatory'

    // Check form state
    if (this.state.id == '') {
      ++error
      this.setState({errorTextId: errorMessage})
    } else {
      this.setState({errorTextId: ''})
    }

    if (this.state.name == '') {
      ++error
      this.setState({errorTextName: errorMessage})
    } else {
      this.setState({errorTextName: ''})
    }

    if (this.state.description == '') {
      ++error
      this.setState({errorTextDescription: errorMessage})
    } else {
      this.setState({errorTextDescription: ''})
    }

    if (this.state.unit == '') {
      ++error
      this.setState({errorTextUnit: errorMessage})
    } else {
      this.setState({errorTextUnit: ''})
    }

    // Return Error Text
    if (error > 0){
      return false
    }

    return true
  }

  setMessageDialog(message) {
    this.setState({messageDialog: message})
  }

  handleSetItemToDelete(id) {
      this.setState({idToDelete: id})
  }

  handleSaveButton() {
    switch(this.state.update){
      case true:
        this._update()
        this.handleClearButton()
        break;
      case false:
        this._save()
        this.handleClearButton()
        break;
      default:
        this.setMessageDialog('Failed to save, problem occured')
        this.setState({openNotif: true})
    }
  }

  handleEditButton(e) {
    this.setState({
      update: true,
      id: e.id,
      name: e.name,
      description: e.description,
      unit: e.unit
    })
  }

  handleDeleteButton() {
    this._destroy(this.state.idToDelete)
    this.setState({idToDelete: ''})
  }

  handleCloseDialog() {
    this.setState({openNotif: false})
  }

  handleClearButton() {
    this.setState({
      update: false,
      id: '0',
      name: '',
      description: '',
      unit: ''
    })

    this._getItemList()
  }

  render() {
      return (
        <div>
          <EntryItem
            errorTextId={this.state.errorTextId}
            errorTextName={this.state.errorTextName}
            errorTextDescription={this.state.errorTextDescription}
            errorTextUnit={this.state.errorTextUnit}
            getId={this.state.id}
            nmItemVal={this.state.name}
            descVal={this.state.description}
            unitVal={this.state.unit}
            idChange={this.idChange.bind(this)}
            nmChange={this.nmChange.bind(this)}
            descChange={this.descChange.bind(this)}
            unitChange={this.unitChange.bind(this)}
            clearForm={this.handleClearButton.bind(this)}
            saveData={this.handleSaveButton.bind(this)}
            validate={this._validate.bind(this)}
          >
          </EntryItem>

          <GridListItem
            editData={this.handleEditButton.bind(this)}
            deleteData={this.handleDeleteButton.bind(this)}
            idToDelete={this.handleSetItemToDelete.bind(this)}
            itemList={this.state.items}
          >
          </GridListItem>
          <DialogSuccessSave
            openNotif={this.state.openNotif}
            message={this.state.messageDialog}
            handleClose={this.handleCloseDialog.bind(this)}
          >
          </DialogSuccessSave>
        </div>
      )
  }
}

export default EntryItemContainer
