// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styles from './OpenedProject.css';
import routes from '../constants/routes';

const childProcess = require('child_process');
const nonWindowsPlatforms = ['aix',
  'darwin',
  'freebsd',
  'linux',
  'openbsd',
  'sunos']
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
      login:'',
      main: '',
      drive:nonWindowsPlatforms.includes(process.platform) ? ' ':' /D '
    };
  }

  render() {
    const {
      folderPath
    } = this.props;
    return (
      <div style={{display:'flex',flexDirection:'column',overflow: 'scroll',height:710}}>
        <div className="toolbar" style={{display:'flex',flexDirection:'row', width: '100%', height: 24, textAlign: 'right', justifyContent: 'right' }}>
          <Link className="no-drag" to={routes.NEW}>
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
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <img alt='logo' height='150' src={require('../../resources/launch-icon@3x.png')}/>
        </div>
        }
        {this.props.boilerplate === 'bowser' &&
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>

        <img alt='logo' width='256' src={require('../../resources/bowser.png')}/>

        </div>
        }

        {this.props.boilerplate === 'andross' &&
        <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>

          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
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
                this.setState({ min: !this.state.min, max: !this.state.max });
              }} checked={this.state.min} type="checkbox"/>
              <span className="slider round"/>
            </label>
            <div style={{ flex: 1 }}/>
            <a style={{ fontSize: 16 }}> Min </a>

          </li>
          <li style={{ display: 'flex', alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <label className="switch">
              <input onChange={(e) => {
                this.setState({ max: !this.state.max, min: !this.state.min });
              }} checked={this.state.max} type="checkbox"/>
              <span className="slider round"/>

            </label>
            <div style={{ flex: 1 }}/>
            <a style={{ fontSize: 16 }}> Max </a>

          </li>

           <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
           <label className="switch">
           <input onChange={(e) => {
           this.setState({ devScreens: e.target.value });
           }} value={this.state.devScreens} type="checkbox"/>
           <span className="slider round"/>
           </label>
           <a style={{ fontSize: 16 }} > Ignite Dev Screens (WIP)</a>

           </li>
           <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
           <label className="switch">
           <input onChange={(e) => {
           this.setState({ i18n: e.target.value });
           }} value={this.state.i18n} type="checkbox"/>
           <span className="slider round"/>

           </label>
           <a style={{ fontSize: 16 }}> I18n (WIP)</a>

           </li>
           <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
           <label className="switch">
           <input onChange={(e) => {
           this.setState({ vectorIcons: e.target.vectorIcons });
           }} value={this.state.vectorIcons} type="checkbox"/>
           <span className="slider round"/>

           </label>
           <a style={{ fontSize: 16 }}> Vector
           Icons (WIP)</a>

           </li>
           <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
           <label className="switch">
           <input onChange={(e) => {
           this.setState({ animatable: e.target.animatable });
           }} value={this.state.animatable} type="checkbox"/>
           <span className="slider round"/>
           </label>
           <a style={{ fontSize: 16 }}> Animatable (WIP)</a>

           </li>
           <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
           <label className="switch">
           <input onChange={(e) => {
           this.setState({ reduxPersist: e.target.reduxPersist });
           }} value={this.state.reduxPersist} type="checkbox"/>
           <span className="slider round"/>

           </label>
           <a style={{ fontSize: 16 }}> Redux
           Persist (WIP)</a>

           </li>
          <li style={{ display: 'flex', paddingTop: 16 }}>
            <a
              onClick={() => {
                if (!this.state.isLoading && this.state.name.length > 0) {
                  this.setState({ isLoading: true }, () => {
                    childProcess.exec(`ignite new ${this.state.name} -b ignite-ir-boilerplate-andross${this.state.max ? ' --max' : ''}${this.state.min ? ' --min' : ''}  `, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
                      this.setState({ stdout:this.state.stdout+stdout, stderr, error, name: '', isLoading: false });
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
        </ul>
        }
        {this.props.boilerplate === 'bowser' &&
        <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
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
                if (!this.state.isLoading && this.state.name.length > 0) {
                  this.setState({ isLoading: true }, () => {
                    childProcess.exec(`ignite new ${this.state.name} -b ignite-ir-boilerplate-bowser`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
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
        </ul>
        }

        {this.props.boilerplate === 'ts_andross' &&
        <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
          {this.props.boilerplate === 'ts_andross' &&
          <li style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img alt='logo' width='150' src={require('../../resources/ignite-typescript-logo.png')}/>
          </li>
          }
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
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
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
          <b style={{marginBottom:8}}>Login Template</b>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <label className="radio-container">No Login
              <input type="radio" name="login" value="nologin" onChange={(e)=>this.setState({login:'--nologin'})}/>
                <span className="checkmark" />
            </label>
            <label className="radio-container">Simple Login
              <input type="radio" name="login" value="simplelogin" onChange={(e)=>this.setState({login:'--simplelogin'})}/>
                <span className="checkmark" />
            </label>
            <label className="radio-container">Sms Login
              <input type="radio" name="login" value="smslogin" onChange={(e)=>this.setState({login:'--smslogin'})}/>
                <span className="checkmark" />
            </label>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>

          <b style={{marginBottom:8}}>Main Template</b>
          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>

            <label className="radio-container">Simple
            <input type="radio" name="main" value="simple" onChange={(e)=>this.setState({main:'--simple'})}/>
            <span className="checkmark" />
          </label>
            <label className="radio-container">Collapsible Toolbar
              <input type="radio" name="main" value="collapsible" onChange={(e)=>this.setState({main:'--collapsible'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Material Backdrop
              <input type="radio" name="main" value="backdrop" onChange={(e)=>this.setState({main:'--backdrop'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Bottom Tabbed
              <input type="radio" name="main" value="bottomTabbed" onChange={(e)=>this.setState({main:'--bottom'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Top Tabbed
              <input type="radio" name="main" value="topTabbed" onChange={(e)=>this.setState({main:'--top'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Navigation Drawer
              <input type="radio" name="main" value="drawer" onChange={(e)=>this.setState({main:'--drawer'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Collapsible/Drawer
              <input type="radio" name="main" value="collapsibleDrawer" onChange={(e)=>this.setState({main:'--cdrawer'})}/>
              <span className="checkmark" />
            </label>
            <label className="radio-container">Social Media
              <input type="radio" name="main" value="socialMedia" onChange={(e)=>this.setState({main:'--smedia'})}/>
              <span className="checkmark" />
            </label>
          </li>
          <li style={{ display: 'flex', paddingTop: 16 }}>
            <a
              onClick={() => {
                if (!this.state.isLoading && this.state.name.length > 0) {
                  this.setState({ isLoading: true }, () => {
                    childProcess.exec(`ignite new ${this.state.name} -b ignite-boilerplate-andross-typescript ${this.state.login} ${this.state.main}`, {shell:true,cwd:folderPath}, (error, stdout, stderr) => {
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
                <b style={{ alignSelf: 'center' }}>New T-Andross</b>
                :
                <ReactLoading className="fa" type='bars' color='#212121' height={16} width={20}/>
              }
            </a>
          </li>
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
