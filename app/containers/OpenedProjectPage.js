import { connect } from 'react-redux';
import OpenedProject from '../components/OpenedProject';

function mapStateToProps(state) {
  return {
    projectName:state.filefolder.projectName,
    folderPath:state.filefolder.folderPath,
    boilerplate:state.filefolder.boilerplate
  };
}

function mapDispatchToProps(dispatch) {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenedProject);
