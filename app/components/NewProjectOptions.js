/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/prop-types,prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable global-require */

// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
// import styles from './OpenedProject.css';
import routes from '../constants/routes';

const childProcess = require('child_process');
const fs = require('fs');

// const nonWindowsPlatforms = ['aix',
//   'darwin',
//   'freebsd',
//   'linux',
//   'openbsd',
//   'sunos'];
type Props = {
  folderPath: string
};

export default class NewProjectOptions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      stdout: '',
      stderr: '',
      error: '',
      name: '',
      isLoading: false,
      i18n: false,
      devScreens: false,
      vectorIcons: false,
      reduxPersist: false,
      animatable: false,
      min: true,
      max: false,
      login: '',
      main: ''
      //     drive:nonWindowsPlatforms.includes(process.platform) ? ' ':' /D '
    };
  }

  executeCommand = (command) => {

    const {
      folderPath
    } = this.props;

    const {
      isLoading,
      name
    } = this.state;

    let path;

    const isWin = process.platform === 'win32';
    if (isWin) {
      path = folderPath + '\\' + name;
    } else {
      path = folderPath + '/' + name;
    }
    if (fs.existsSync(path)) {
      const { remote } = require('electron');
      const choice = remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'A Project With The Same Name Exists Do You Want Replace The Previous Project ?'
        });

      if (choice === 0) {
        if (!isLoading) {
          this.setState({ isLoading: true }, () => {
            const rimraf = require('rimraf');
            rimraf(path, () => {
              childProcess.exec(command, {
                shell: true,
                cwd: folderPath
              }, (error, stdout, stderr) => {
                this.setState({ stdout, stderr, error, name: '', isLoading: false });
              });
            });
          });
        }
      }
    } else if (!isLoading) {
      this.setState({ isLoading: true }, () => {
        childProcess.exec(command, {
          shell: true,
          cwd: folderPath
        }, (error, stdout, stderr) => {
          this.setState({ stdout, stderr, error, name: '', isLoading: false });
        });
      });
    }
  };

  render() {
    const {
      boilerplate
    } = this.props;
    const {
      stdout,
      stderr,
      error,
      name,
      isLoading,
      i18n,
      devScreens,
      vectorIcons,
      reduxPersist,
      animatable,
      min,
      max,
      login,
      main
    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 710 }}>
        <div className="toolbar" style={{
          display: 'flex',
          flexDirection: 'row',
          width: '98%',
          height: 24,
          textAlign: 'right',
          justifyContent: 'right'
        }}>
          <Link className="no-drag" to={routes.NEW}>
            <i style={{ marginLeft: 6, height: 24 }} className="fa fa-arrow-left"/>
          </Link>
          <div style={{ flex: 1 }}/>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().minimize();
          }}>
            <i style={{ marginRight: 8 }} className="fa fa-minus"/>
          </a>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().close();
          }}>
            <i style={{ marginRight: 16 }} className="fa fa-times"/>
          </a>

        </div>

        {boilerplate === 'andross' &&
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' height='150' src={require('../../resources/launch-icon@3x.png')}/>
        </div>
        }
        {boilerplate === 'bowser' &&
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <img alt='logo' width='256' src={require('../../resources/bowser.png')}/>

        </div>
        }
        {boilerplate === 'ts_andross' &&

        <img alt='logo' width='150' style={{ alignSelf: 'center' }}
             src={require('../../resources/ignite-typescript-logo.png')}/>

        }

        <input value={name}
               onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
               placeholder="Project's name ..." style={{
          color: 'white',
          height: 32,
          width: '100%',
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 2,
          borderBottomColor: 'white'
        }}/>

        <div style={{ overflow: 'scroll', height: 492 }}>

          {boilerplate === 'andross' &&
          <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
            <li style={{ display: 'flex', alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={() => {
                  this.setState({
                    min: !min,
                    max: !max,
                    i18n: false,
                    devScreens: false,
                    animatable: false,
                    reduxPersist: false,
                    vectorIcons: false
                  });
                }} checked={min} type="checkbox"/>
                <span className="slider round"/>
              </label>
              <div style={{ flex: 1 }}/>
              <a style={{ fontSize: 16 }}> Min </a>

            </li>
            <li style={{ display: 'flex', alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={() => {
                  this.setState({
                    max: !max,
                    min: !min,
                    i18n: true,
                    devScreens: true,
                    animatable: true,
                    reduxPersist: true,
                    vectorIcons: true
                  });
                }} checked={max} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <div style={{ flex: 1 }}/>
              <a style={{ fontSize: 16 }}> Max </a>

            </li>

            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ devScreens: e.target.value });
                }} checked={devScreens} type="checkbox"/>
                <span className="slider round"/>
              </label>
              <a style={{ fontSize: 16 }}> Ignite Dev Screens (WIP)</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ i18n: e.target.value });
                }} checked={i18n} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <a style={{ fontSize: 16 }}> I18n (WIP)</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ vectorIcons: e.target.vectorIcons });
                }} checked={vectorIcons} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <a style={{ fontSize: 16 }}> Vector
                Icons (WIP)</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ animatable: e.target.animatable });
                }} checked={animatable} type="checkbox"/>
                <span className="slider round"/>
              </label>
              <a style={{ fontSize: 16 }}> Animatable (WIP)</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ reduxPersist: e.target.reduxPersist });
                }} checked={reduxPersist} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <a style={{ fontSize: 16 }}> Redux
                Persist (WIP)</a>

            </li>
            <li style={{ display: 'flex', paddingTop: 16 }}>
              <a
                onClick={() => {
                  if (name.length > 0) {
                    this.executeCommand(`ignite new ${name} -b ignite-ir-boilerplate-andross${max ? ' --max' : ''}${min ? ' --min' : ''}`);
                  }
                }}
                style={{
                  flex: 1,
                  color: '#212121',
                  backgroundColor: '#eeeeee',
                  padding: 8,
                  alignItems: 'stretch', justifyContent: 'center',
                  borderRadius: 16,
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                {!isLoading ?
                  <b style={{ alignSelf: 'center' }}>Create New Andross</b>
                  :
                  <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
                }
              </a>
            </li>
          </ul>
          }
          {boilerplate === 'bowser' &&
          <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
            <li style={{ display: 'flex', paddingTop: 16 }}>
              <a
                onClick={() => {
                  if (name.length > 0) {
                    this.executeCommand(`ignite new ${name} -b ignite-ir-boilerplate-bowser`);
                  }
                }}
                style={{
                  flex: 1,
                  color: '#212121',
                  backgroundColor: '#eeeeee',
                  padding: 8,
                  alignItems: 'stretch', justifyContent: 'center',
                  borderRadius: 16,
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                {!isLoading ?
                  <b style={{ alignSelf: 'center' }}>Create New Bowser</b>
                  :
                  <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
                }
              </a>
            </li>
          </ul>
          }

          {boilerplate === 'ts_andross' &&
          <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <b style={{ marginBottom: 8 }}>Login Template</b>
            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="radio-container">No Login
                <input type="radio" name="login" value="nologin"
                       onChange={() => this.setState({ login: '--nologin' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Simple Login
                <input type="radio" name="login" value="simplelogin"
                       onChange={() => this.setState({ login: '--simplelogin' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Sms Login
                <input type="radio" name="login" value="smslogin"
                       onChange={() => this.setState({ login: '--smslogin' })}/>
                <span className="checkmark"/>
              </label>
            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>

              <b style={{ marginBottom: 8 }}>Main Template</b>
            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>

              <label className="radio-container">Simple
                <input type="radio" name="main" value="simple" onChange={() => this.setState({ main: '--simple' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Collapsible Toolbar
                <input type="radio" name="main" value="collapsible"
                       onChange={() => this.setState({ main: '--collapsible' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Material Backdrop
                <input type="radio" name="main" value="backdrop"
                       onChange={() => this.setState({ main: '--backdrop' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Bottom Tabbed
                <input type="radio" name="main" value="bottomTabbed"
                       onChange={() => this.setState({ main: '--bottom' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Top Tabbed
                <input type="radio" name="main" value="topTabbed" onChange={() => this.setState({ main: '--top' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Navigation Drawer
                <input type="radio" name="main" value="drawer" onChange={() => this.setState({ main: '--drawer' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Collapsible/Drawer
                <input type="radio" name="main" value="collapsibleDrawer"
                       onChange={() => this.setState({ main: '--cdrawer' })}/>
                <span className="checkmark"/>
              </label>
              <label className="radio-container">Social Media
                <input type="radio" name="main" value="socialMedia"
                       onChange={() => this.setState({ main: '--smedia' })}/>
                <span className="checkmark"/>
              </label>
            </li>
            <li style={{ display: 'flex', paddingTop: 16 }}>
              <a
                onClick={() => {
                  if (name.length > 0) {
                    this.executeCommand(`ignite new ${name} -b ignite-boilerplate-andross-typescript ${login} ${main}`);
                  }
                }}
                style={{
                  flex: 1,
                  color: '#212121',
                  backgroundColor: '#eeeeee',
                  padding: 8,
                  alignItems: 'stretch', justifyContent: 'center',
                  borderRadius: 16,
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                {!isLoading ?
                  <b style={{ alignSelf: 'center' }}>New T-Andross</b>
                  :
                  <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
                }
              </a>
            </li>
          </ul>
          }
          {(stdout !== null && stdout !== undefined && stdout.length > 0) &&
          <div style={{ flex: 1 }}>
          <textarea wrap='off' rows={18} disabled style={{
            resize: 'none',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white',
            fontSize: 14,
            width: '100%',
            maxWidth: '100%'
          }} value={`${stdout}\n${stderr}\n${error}`}/>
          </div>
          }
        </div>
      </div>
    );
  }
}
