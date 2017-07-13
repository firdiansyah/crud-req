import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

export default class DialogSuccessSave extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClose() {
    this.props.handleClose()
  }

  render() {
    return (
    <div>
      <MuiThemeProvider>
      <Dialog
        title="Notif"
        modal={false}
        autoScrollBodyContent={false}
        open={this.props.openNotif}
        width={300}
        actions={
          <div>
          <FlatButton
            label="Close"
            primary={false}
            onTouchTap={this.handleClose.bind(this)}
          />
          </div>
        }
      >
        {this.props.message}
      </Dialog>
      </MuiThemeProvider>
    </div>
    )}
}
