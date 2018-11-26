// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as FileFolderActions from '../actions/filefolder';

function mapStateToProps(state) {
  return {
    projectName:state.projectName,
    folderPath:state.folderPath,
    boilerplate:state.filefolder.boilerplate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileFolderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
