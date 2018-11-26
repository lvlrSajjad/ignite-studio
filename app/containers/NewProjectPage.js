import { connect } from 'react-redux';
import NewProject from '../components/NewProject';
import * as FileFolderActions from '../actions/filefolder';
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
  return {
    projectName:state.filefolder.projectName,
    folderPath:state.filefolder.folderPath,
    boilerplate:state.filefolder.boilerplate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileFolderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
