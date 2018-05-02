import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionDetailsPage from '../components/QuestionDetailsPage/QuestionDetailsPage';
import { getAnswersByQuestionId, getQuestionById, resetE } from '../actions/common.actions';


const mapStateToProps = state => ({
    question: state.questionE.question,
    answers: state.questionE.answers,
    questionLoadingError: state.questionE.questionLoadingError,
    questionLoading: state.questionE.questionLoading,
    answersLoading: state.questionE.answersLoading,
    answersLoadingError: state.questionE.answersLoadingError,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAnswersByQuestionId, getQuestionById, resetE }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailsPage);
