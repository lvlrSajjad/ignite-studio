// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {
  setFolderPath(folderPath: string): void
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div style={{ width: '100%', height: 24, textAlign: 'right', justifyContent: 'right' }}>
          <a className='no-drag' onClick={()=>{
            const { remote } = window.require('electron');
            remote.getCurrentWindow().minimize();
          }}>
            <i style={{ marginRight: 8 }} className="fa fa-minus"/>
          </a>
          <a className='no-drag' onClick={()=>{
            const { remote } = window.require('electron');
            remote.getCurrentWindow().close();
          }}>
            <i style={{ marginRight: 6 }} className="fa fa-times"/>
          </a>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='256' src={require('../../resources/ignite.png')}/>
        </div>
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-folder-open fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => this.listFiles('/Opened')}> Open Ignite Project </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => this.listFiles('/New')}> New Ignite Project </a>

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
      if (path === '/Opened') {
        const fs = require('fs');
        let packageJson;

        try {
          packageJson = fs.readFileSync(folderPath + '\\package.json');
        } catch (err) {
          remote.dialog.showMessageBox({ message: 'please open a valid react-native project' });
        }
        if (packageJson !== undefined) {
          if (packageJson.includes('ignite-ir-boilerplate-andross')) {
            this.props.setBoilerplate('andross');
            this.props.setFolderPath(folderPath);
            this.props.history.push(path);
          } else if (packageJson.includes('ignite-ir-boilerplate-bowser')) {
            this.props.setBoilerplate('bowser');
            this.props.setFolderPath(folderPath);
            this.props.history.push(path);
          } else if (packageJson.includes('ignite-boilerplate-andross-typescript')) {
            this.props.setBoilerplate('ts_andross');
            this.props.setFolderPath(folderPath);
            this.props.history.push(path);
          } else {
            remote.dialog.showMessageBox({ message: 'please open a valid ignite project' });
          }
        }
      } else {
        this.props.setFolderPath(folderPath);
        this.props.history.push(path);
      }
    });
  };
}
