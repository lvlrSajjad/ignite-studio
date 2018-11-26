import React, { Component } from 'react';

class Toolbar extends Component {
  static close() {
    const { remote } = window.require('electron');
    remote.getCurrentWindow().close();
  }

  render() {
    return (
      <div className="toolbar">
        <div style={{flex:1}}/>
        <a style={{ marginRight: 16 }} className='no-drag'>
          <i className="fa fa-window-close no-drag" />
        </a>
      </div>
    );
  }
}

export default Toolbar;
