import React from 'react'
import ReactDOM from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SvgIcon from 'material-ui/SvgIcon';

import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'

import style from 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

let order = 'desc';

class GridListItem extends React.Component{
  constructor (props){
    super(props);
    this.options = {
      afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
    };

    this.state  = {
      open: false
    }

    this.grid = {
        open: false
    }

    this.selectRowProp = {
      bgColor: 'yellow'
    };

    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onAfterDeleteRow (rowKeys, row) {
    alert('The rowkey you drop: ' + rowKeys);
  }

  // It's a data format example.
  handleBtnClick () {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }

  handleOpen () {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  handleSubmit () {
    this.setState({open: false})
    this.props.deleteData()
  };

  handleBtnEditClick (ev, cell, row, rowIndex) {
    this.props.editData(row)
  }

  handleBtnDeleteClick (ev, cell, row, rowIndex) {
    this.props.idToDelete(row.id)
    this.setState({open: true})
  }

  buttonFormatter (cell, row, rowIndex) {
    return (<div>
            <button
              type="button"
              className="btn btn-info btn-xs"
              onClick={(ev) => this.handleBtnEditClick(ev, cell, row, rowIndex)}>
              <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-xs"
              onClick={(ev) => this.handleBtnDeleteClick(ev, cell, row, rowIndex)}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
            </div>
          )
  }

  render(){
    const actions = [
      <FlatButton
        label="No"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        disabled={false}
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div className="containerGrid">
        <BootstrapTable
          ref='table'
          data={this.props.itemList}
          deleteRow={false}
          selectRow={this.selectRowProp}
          insertRow={false}
          options={this.options}
          pagination={false}
          search={true}
          striped={true}
          height={150}
        >
            <TableHeaderColumn dataField='id' className='itemID' isKey={ true } dataSort={ true } columnClassName='itemID'>
                ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField='name' className='itemName' columnClassName='itemName'>
                Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='description' className='description' columnClassName='itemDesc'>
                Desc
            </TableHeaderColumn>
            <TableHeaderColumn dataField='unit' className='unit' columnClassName='itemUnit'>
                Unit
            </TableHeaderColumn>
            <TableHeaderColumn dataField='button' dataFormat={this.buttonFormatter.bind(this)} className='action' columnClassName='action'>
            </TableHeaderColumn>
        </BootstrapTable>

        <MuiThemeProvider>
          <Dialog
            title="Confirm"
            modal={this.state.open}
            autoScrollBodyContent={false}
            actions={actions}
            open={this.state.open}
          >
            <h4>Are you sure?</h4>
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default GridListItem
