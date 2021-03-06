import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import ViewRequest from '../components/ViewRequest';

function mapStateToProps(state) {
  return {
    currentWormhole: state.currentWormhole,
  };
}

// bindActionCreaters
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ViewRequestActions, dispatch);
// }

export default connect(mapStateToProps)(ViewRequest);
