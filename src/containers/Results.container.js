import { connect } from 'react-redux';
import ResultPage from '../components/ResultPage';

const mapStateToProps = state => ({ ...state.results });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
