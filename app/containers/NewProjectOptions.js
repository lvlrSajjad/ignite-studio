import { connect } from 'react-redux';
import NewProjectOptions from '../components/NewProjectOptions';

function mapStateToProps(state) {
  console.log(state)
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
)(NewProjectOptions);
