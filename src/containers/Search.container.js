import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchPage from '../components/SearchPage/SearchPage';
import { getQuestions } from '../actions/common.actions';

const mapStateToProps = state => ({
    questionsLoading: state.results.questionsLoading,
    questionsLoadingError: state.results.questionsLoadingError,
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        getQuestions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
