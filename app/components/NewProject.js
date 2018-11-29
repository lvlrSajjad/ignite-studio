// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewProject.css';
import routes from '../constants/routes';

type Props = {
  setBoilerplate(boilerplate: string):void

};

export default class NewProject extends Component<Props> {
  props: Props;

  render() {
    const {
      setBoilerplate
    } = this.props;
    return (
      <div>
        <div className="toolbar" style={{display:'flex',flexDirection:'row', width: '100%', height: 56, textAlign: 'right', justifyContent: 'right' }}>
          <Link className="no-drag" to={routes.HOME}>
            <i style={{marginLeft:6,height:24}} className="fa fa-arrow-left" />
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
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <img alt='logo' width='256' src={require('../../resources/ignite.png')}/>
        </div>
        <ul style={{width:'80%',padding:0,paddingLeft:16 }}>
          <li style={{alignItems:'left',textAlign:'left',marginBottom:16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16 }} onClick={()=>this.navigate("/new/options",'andross')} > Andross </a>

          </li>
          <li style={{alignItems:'left',textAlign:'left', marginBottom:16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{  fontSize: 16 }} onClick={()=>this.navigate("/new/options",'bowser')} > Bowser </a>

          </li>
          <li style={{alignItems:'left',textAlign:'left', marginBottom:16 }}>
            <i className="fa fa-fire fa-1x no-drag"/>
            <a style={{  fontSize: 16 }} onClick={()=>this.navigate("/new/options",'ts_andross')}> TypeScript Andross </a>

          </li>
        </ul>
      </div>
    );
  }

  navigate=(path,boilerplate)=>{
    this.props.setBoilerplate(boilerplate);
    this.props.history.push(path)
  }
}
