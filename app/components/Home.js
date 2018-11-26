// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {
  setFolderPath(folderPath: string):void
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div style={{width:'100%',height:24,textAlign:'right',justifyContent:'right'}}>
          <a className='no-drag'>
            <i style={{marginRight:6}} className="fa fa-times" />
          </a>
        </div>
        <img alt='logo' width='100%' src={require('../../resources/ignite.png')}/>
        <ul style={{width:'80%',padding:0,paddingLeft:16 }}>
          <li style={{alignItems:'left',textAlign:'left',marginBottom:16 }}>
            <i className="fa fa-folder-open fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={()=>this.listFiles('/Opened')}> Open Ignite Project </a>

          </li>
          <li style={{alignItems:'left',textAlign:'left', marginBottom:16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{  fontSize: 16 }} onClick={()=>this.listFiles('/New')}> New Ignite Project </a>

          </li>
        </ul>
      </div>
    );
  }

  listFiles = (path) => {
    const { remote } = require('electron');
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (folderPath) => {
      if (folderPath === undefined) {
        console.log('No file selected');
        return;
      }
      this.props.setFolderPath(folderPath);
      this.props.history.push(path)

    });
  };
}
