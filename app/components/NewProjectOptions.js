// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styles from './OpenedProject.css';
import routes from '../constants/routes';

const childProcess = require('child_process');

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
      //  i18n: false,
      //   devScreens: false,
      //   vectorIcons: false,
      //   reduxPersist: false,
      //   animatable: false,
      min: true,
      max: false
    };
  }

  render() {
    const {
      folderPath
    } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.NEW}>
            <i style={{ marginTop: 6, marginLeft: 6, height: 24 }} className="fa fa-arrow-left"/>
          </Link>
        </div>
        {this.props.boilerplate === 'andross' &&
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <img alt='logo' height='150' src={require('../../resources/launch-icon@3x.png')}/>
        </div>
        }
        {this.props.boilerplate === 'bowser' &&
        <img alt='logo' width='100%' src={require('../../resources/bowser.png')}/>
        }
        {this.props.boilerplate === 'ts_andross' &&
        <img alt='logo' width='100%' src={require('../../resources/ignite-typescript-logo.png')}/>
        }
        {this.props.boilerplate === 'andross' &&
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}
                   placeholder="Project's name ..." style={{
              color: 'white',
              height: 32,
              width: '100%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: 'white'
            }}/>
          </li>
          <li style={{ display: 'flex', alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <label className="switch">
              <input onChange={(e) => {
                this.setState({ min: !this.state.min, max: false });
              }} checked={this.state.min} type="checkbox"/>
              <span className="slider round"/>
            </label>
            <div style={{ flex: 1 }}/>
            <a style={{ fontSize: 16 }}> Min </a>

          </li>
          <li style={{ display: 'flex', alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <label className="switch">
              <input onChange={(e) => {
                this.setState({ max: !this.state.max, min: false });
              }} checked={this.state.max} type="checkbox"/>
              <span className="slider round"/>

            </label>
            <div style={{ flex: 1 }}/>
            <a style={{ fontSize: 16 }}> Max </a>

          </li>

          {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
          {/* <label className="switch"> */}
          {/* <input onChange={(e) => { */}
          {/* this.setState({ devScreens: e.target.value }); */}
          {/* }} value={this.state.devScreens} type="checkbox"/> */}
          {/* <span className="slider round"/> */}
          {/* </label> */}
          {/* <a style={{ fontSize: 16 }} > Ignite Dev Screens </a> */}

          {/* </li> */}
          {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
          {/* <label className="switch"> */}
          {/* <input onChange={(e) => { */}
          {/* this.setState({ i18n: e.target.value }); */}
          {/* }} value={this.state.i18n} type="checkbox"/> */}
          {/* <span className="slider round"/> */}

          {/* </label> */}
          {/* <a style={{ fontSize: 16 }}> I18n </a> */}

          {/* </li> */}
          {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
          {/* <label className="switch"> */}
          {/* <input onChange={(e) => { */}
          {/* this.setState({ vectorIcons: e.target.vectorIcons }); */}
          {/* }} value={this.state.vectorIcons} type="checkbox"/> */}
          {/* <span className="slider round"/> */}

          {/* </label> */}
          {/* <a style={{ fontSize: 16 }}> Vector */}
          {/* Icons </a> */}

          {/* </li> */}
          {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
          {/* <label className="switch"> */}
          {/* <input onChange={(e) => { */}
          {/* this.setState({ animatable: e.target.animatable }); */}
          {/* }} value={this.state.animatable} type="checkbox"/> */}
          {/* <span className="slider round"/> */}
          {/* </label> */}
          {/* <a style={{ fontSize: 16 }}> Animatable </a> */}

          {/* </li> */}
          {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
          {/* <label className="switch"> */}
          {/* <input onChange={(e) => { */}
          {/* this.setState({ reduxPersist: e.target.reduxPersist }); */}
          {/* }} value={this.state.reduxPersist} type="checkbox"/> */}
          {/* <span className="slider round"/> */}

          {/* </label> */}
          {/* <a style={{ fontSize: 16 }}> Redux */}
          {/* Persist </a> */}

          {/* </li> */}
          <li style={{ display: 'flex', paddingTop: 16 }}>
            <a
              onClick={() => {
                if (!this.state.isLoading) {
                  this.setState({ isLoading: true }, () => {
                    childProcess.exec(`cd /D ${folderPath} & ignite new ${this.state.name} -b ignite-ir-boilerplate-andross${this.state.max ? ' --max' : ''}${this.state.min ? ' --min' : ''}  `, [], (error, stdout, stderr) => {
                      this.setState({ stdout, stderr, error, name: '', isLoading: false });
                    });
                  });
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
              {!this.state.isLoading ?
                <b style={{ alignSelf: 'center' }}>Create New Andross</b>
                :
                <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
              }
            </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stdout}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stderr}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.error}</i>
          </li>

        </ul>
        }
        {this.props.boilerplate === 'bowser' &&
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}
                   placeholder="Project's name ..." style={{
              color: 'white',
              height: 32,
              width: '100%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: 'white'
            }}/>
          </li>
          <li style={{ display: 'flex', paddingTop: 16 }}>
            <a
              onClick={() => {
                if (!this.state.isLoading) {
                  this.setState({ isLoading: true }, () => {
                    childProcess.exec(`cd /D ${folderPath} & ignite new ${this.state.name} -b ignite-ir-boilerplate-bowser`, [], (error, stdout, stderr) => {
                      this.setState({ stdout, stderr, error, name: '', isLoading: false });
                    });
                  });
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
              {!this.state.isLoading ?
                <b style={{ alignSelf: 'center' }}>Create New Bowser</b>
                :
                <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
              }
            </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stdout}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stderr}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.error}</i>
          </li>

        </ul>
        }

        {this.props.boilerplate === 'ts_andross' &&
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}
                   placeholder="Project's name ..." style={{
              color: 'white',
              height: 32,
              width: '100%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: 'white'
            }}/>
          </li>
          <li style={{ display: 'flex', paddingTop: 16 }}>
            <a style={{
                flex: 1,
                color: '#212121',
                backgroundColor: '#eeeeee',
                padding: 8,
                alignItems: 'stretch', justifyContent: 'center',
                borderRadius: 16,
                fontSize: 16,
                textAlign: 'center'
              }}>
              {!this.state.isLoading ?
                <b style={{ alignSelf: 'center' }}>W.I.P</b>
                :
                <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
              }
            </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stdout}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.stderr}</i>
            <i style={{ fontSize: 10, width: '100%' }}> {this.state.error}</i>
          </li>

        </ul>
        }
      </div>
    );
  }
}
