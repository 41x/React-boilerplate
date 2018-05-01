import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchPage from '../components/SearchPage/SearchPage';
import { getQuestions } from '../actions/common.actions';

const mapStateToProps = state => ({
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
