import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionsPage from '../components/QuestionsPage/QuestionsPage';
import { resetQuestions, getQuestions } from '../actions/common.actions';


const mapStateToProps = state => ({
    questions: state.results.questions,
    questionsLoading: state.results.questionsLoading,
    questionsLoadingError: state.results.questionsLoadingError,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ resetQuestions, getQuestions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
