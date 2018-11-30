// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './OpenedProject.css';
import routes from '../constants/routes';
import ReactLoading from 'react-loading';

const childProcess = require('child_process');
const nonWindowsPlatforms = ['aix',
  'darwin',
  'freebsd',
  'linux',
  'openbsd',
  'sunos'];
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
      isLoading: false,
      drive: nonWindowsPlatforms.includes(process.platform) ? ' ' : ' /D '
    };
  }

  render() {
    const {
      folderPath
    } = this.props;
    return (
      <div style={{ overflow: 'scroll', height: 710 }}>
        <div className="toolbar" style={{display:'flex',flexDirection:'row', width: '100%', height: 24, textAlign: 'right', justifyContent: 'right' }}>
          <Link className="no-drag" to={routes.HOME}>
            <i style={{  marginLeft: 6, height: 24 }} className="fa fa-arrow-left"/>
          </Link>
          <div style={{flex:1}}/>
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
            <i style={{ marginRight: 16 }} className="fa fa-times"/>
          </a>
        </div>

        {this.props.boilerplate === 'andross' &&
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='148' src={require('../../resources/launch-icon@3x.png')}/>
        </div>
        }
        {this.props.boilerplate === 'bowser' &&
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='256' src={require('../../resources/bowser.png')}/>
        </div>
        }
        {this.props.boilerplate === 'ts_andross' &&
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='148' src={require('../../resources/ignite-typescript-logo.png')}/>
        </div>
        }
        {(this.props.boilerplate === 'ts_andross' || this.props.boilerplate === 'andross') &&
        <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name}
                   onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
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
            <i className="fa fa-play fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`react-native run-android`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Run Android </a>

          </li>

          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-play fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`react-native run-ios`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Run IOS </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g component ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New Component </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g container ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New Container </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g redux ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New Redux </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g saga ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New Saga </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g screen ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New Screen </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite g list ${this.state.name}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> New List </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite add maps`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Add Maps </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-plus fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite add mapbox`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Add MapBox </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-plus fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite add i18n`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Add i18n </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-plus fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite add vector-icons`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Add Vector Icons </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-plus fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`ignite add material-ui`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Add Material Ui </a>
          </li>
          {/*<li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>*/}
          {/*<i className="fa fa-fire fa-1x no-drag"/>*/}
          {/*<Link style={{ fontSize: 16 }} to="/opened"> New List </Link>*/}

          {/*</li>*/}
          {/*<li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>*/}
          {/*<i className="fa fa-fire fa-1x no-drag"/>*/}
          {/*<Link style={{ fontSize: 16 }} to="/opened"> New Map </Link>*/}
          {/*</li>*/}
          {this.state.isLoading &&

          <li style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <ReactLoading className="fa" type='bars' color='#f44336' height={16} width={20}/>

          </li>}

        </ul>
        }
        {this.props.boilerplate === 'bowser' &&
        <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name}
                   onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
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
            <i className="fa fa-play fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`react-native run-android`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Run Android </a>

          </li>

          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-play fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading) {
                this.setState({ isLoading: true }, () => {
                  childProcess.exec(`react-native run-ios`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                    this.setState({ stdout, stderr, error, name: '', isLoading: false });
                  });
                });
              }
            }}> Run IOS </a>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                // this.setState({ isLoading: true }, () => {
                //   childProcess.exec(`cd${this.state.drive}${folderPath} & ignite g component ${this.state.name}`, [], (error, stdout, stderr) => {
                //     this.setState({ stdout, stderr, error, name: '',isLoading: false });
                //   });
                // });
              }
            }}> New Component (W.I.P) </a>

          </li>

          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                // this.setState({ isLoading: true }, () => {
                //   childProcess.exec(`cd${this.state.drive}${folderPath} & ignite g model ${this.state.name}`, [], (error, stdout, stderr) => {
                //     this.setState({ stdout, stderr, error, name: '',isLoading: false });
                //   });
                // });
              }
            }}> New Model (W.I.P) </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={() => {
              if (!this.state.isLoading && this.state.name.length > 0) {
                // this.setState({ isLoading: true }, () => {
                //   childProcess.exec(`cd${this.state.drive}${folderPath} & ignite g screen ${this.state.name}`, [], (error, stdout, stderr) => {
                //     this.setState({ stdout, stderr, error, name: '',isLoading: false });
                //   });
                // });
              }
            }}> New Screen (W.I.P) </a>
          </li>
          {this.state.isLoading &&
          <li style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <ReactLoading className="fa" type='bars' color='#f44336' height={16} width={20}/>
          </li>
          }
        </ul>
        }
        {(this.state.stdout !== null && this.state.stdout !== undefined && this.state.stdout.length > 0) &&
        <div style={{ flex: 1 }}>
          <textarea wrap='off' rows={18} disabled style={{
            resize: 'none',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white',
            fontSize: 14,
            width: '100%',
            maxWidth: '100%'
          }} value={`${this.state.stdout}\n${this.state.stderr}\n${this.state.error}`}/>
        </div>
        }
      </div>
    );
  }
}
