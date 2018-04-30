import { connect } from 'react-redux';
import ResultPage from '../components/ResultPage/ResultPage';

const mapStateToProps = state => ({
    questions: state.results.questions
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
