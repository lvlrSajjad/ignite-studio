// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './OpenedProject.css';
import routes from '../constants/routes';
import ReactLoading from 'react-loading';

const childProcess = require('child_process');

type Props = {
  folderPath: string
};

export default class NewProject extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      stdout: '',
      stderr: '',
      error: '',
      name: '',
      isLoading: false
    };
  }

  render() {
    const {
      folderPath
    } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i style={{ marginTop: 6, marginLeft: 6, height: 24 }} className="fa fa-arrow-left"/>
          </Link>
        </div>
        <img alt='logo' width='100%' src={require('../../resources/ignite.png')}/>
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}
                   placeholder="Component/Container name ..." style={{
              color: 'white',
              height: 32,
              width: '100%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: 'white'
            }}/>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              this.setState({ isLoading: true }, () => {
                childProcess.exec(`cd /D ${folderPath} & ignite g component ${this.state.name}`, [], (error, stdout, stderr) => {
                  this.setState({ stdout, stderr, error, name: '',isLoading: false });
                });
              });
            }}> New Component </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              this.setState({ isLoading: true }, () => {
                childProcess.exec(`cd /D ${folderPath} & ignite g container ${this.state.name}`, [], (error, stdout, stderr) => {
                  this.setState({ stdout, stderr, error, name: '',isLoading: false });
                });
              });
            }}> New Container </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <Link style={{ fontSize: 16 }} to="/opened"> New List </Link>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <Link style={{ fontSize: 16 }} to="/opened"> New Map </Link>
          </li>
          {this.state.isLoading &&

          <li style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}>
            <ReactLoading className="fa" type='bars' color='#f44336' height={16} width={20}/>

          </li>}

        </ul>
        <div style={{flex:1}}>
          <textarea wrap='off' disabled rows="18"  style={{resize:'none',backgroundColor:'transparent',borderColor:'transparent',color:'white', fontSize: 14, width: '100%' ,maxWidth:'100%'}} value={`${this.state.stdout}\n${this.state.stderr}\n${this.state.error}`}/>
        </div>
      </div>
    );
  }
}
