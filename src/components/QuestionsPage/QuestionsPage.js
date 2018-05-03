import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import Transition from 'react-transition-group/Transition';
import cx from 'classnames';
import { noop } from '../../utils';
import Preloader from '../Preloader/Preloader';
import QuestionsTable from '../QuestionsTable/QuestionsTable';
import s from './QuestionsPage.css';


class ResultPage extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        popUpQuestions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        location: PropTypes.shape({ search: PropTypes.string }),
        questionsLoadingError: PropTypes.string,
        author: PropTypes.string,
        tag: PropTypes.string,
        questionsLoading: PropTypes.bool,
        resetL: PropTypes.func,
        getQuestionsByUserId: PropTypes.func,
        getQuestions: PropTypes.func,
        resetPL: PropTypes.func,
        getQuestionsByTag: PropTypes.func,

    };

    static defaultProps = {
        questions: [],
        popUpQuestions: [],
        resetL: noop,
        getQuestionsByTag: noop,
        getQuestionsByUserId: noop,
    };

    constructor (props) {
        super(props);
        this.state = { questions: [], asc: false };
    }

    componentDidMount () {
        const { location, getQuestions } = this.props;
        if (location) {
            const { query } = qs.parse(location.search);
            if (query) {
                getQuestions(query);
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.questions !== nextProps.questions) {
            this.setState({ questions: [...nextProps.questions] });
        }
    }

    componentWillUnmount () {
        this.props.resetL();
        this.props.resetPL();
    }

    onTagClick = (e) => {
        const { target: { dataset: { tag } = {} } = {} } = e;
        if (tag && this.lastTag !== tag) {
            this.lastTag = tag;
            this.lastAuthor = '';
            this.props.getQuestionsByTag(tag);
        }
    };

    onAuthorClick = (e) => {
        const { currentTarget: { dataset: { id, name } = {} } = {} } = e;
        if (id && this.lastAuthor !== id) {
            this.lastAuthor = id;
            this.lastTag = '';
            this.props.getQuestionsByUserId(id, name);
        }
    };

    onSort = (e) => {
        const { dataset: { header } = {} } = e.target;
        const copy = this.state.questions.slice();
        const { asc } = this.state;
        const sorted = copy.sort((a, b) => {
            let aProp;
            let bProp;
            switch (header) {
                case 'author':
                    aProp = a.owner.display_name;
                    bProp = b.owner.display_name;
                    break;
                case 'title':
                    aProp = a.title;
                    bProp = b.title;
                    break;
                case 'answers':
                    aProp = a.answer_count;
                    bProp = b.answer_count;
                    break;
                default:
                    return 0;
            }

            if (header === 'answers') {
                return asc ? bProp - aProp : aProp - bProp;
            }

            return asc ?
                bProp.localeCompare(aProp) :
                aProp.localeCompare(bProp);
        });

        this.setState({ questions: sorted, asc: !asc });
    };

    resetPopUp = () => {
        this.props.resetPL();
        this.lastAuthor = '';
        this.lastTag = '';
    };

    renderContent = () => {
        const {
            location, questionsLoadingError, author, tag,
            questionsLoading, popUpQuestions
        } = this.props;

        const transitionStyles = {
            entering: { bottom: -500 },
            entered: { bottom: 100 },
            exiting: { bottom: 100 },
            exited: { bottom: -500 }
        };

        const { query } = qs.parse(location.search);
        let popUpHeader;
        if (author) {
            popUpHeader = `Список популярных вопросов пользователя: ${author}`;
        } else if (tag) {
            popUpHeader = `Список вопросов по тегу: '${tag}'`;
        }

        const blockHeight = window.innerHeight * 0.4;
        let view;
        if (questionsLoading) {
            view = <Preloader />;
        } else if (questionsLoadingError) {
            view = <div className={cx('alert alert-danger')}>{questionsLoadingError}</div>;
        } else {
            view = (
                <Fragment>
                    <h6>{`Результаты поиска${query ? ` по запросу: '${query}'` : ''}`}</h6>
                    <div
                        className={cx(s.questionsContainer)}
                    >
                        <QuestionsTable
                            onSort={this.onSort}
                            onTagClick={this.onTagClick}
                            onAuthorClick={this.onAuthorClick}
                            questions={this.state.questions}
                        />
                    </div>

                    <Transition in={!!(popUpQuestions && popUpQuestions.length)} timeout={0}>
                        {(state) => {
                            return (
                                <div
                                    style={{ ...transitionStyles[state] }}
                                    className={cx(s.popUpContainer, 'container')}
                                >
                                    <div className={cx(s.card, 'card')}>
                                        <div className={cx(s.header, 'card-header')}>
                                            {popUpHeader}
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                onClick={this.resetPopUp}
                                            >
                                                <path
                                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                            </svg>
                                        </div>
                                        <div
                                            style={{ height: blockHeight }}
                                            className={cx(s.cardBody, 'card-body')}
                                        >
                                            <QuestionsTable
                                                onTagClick={this.onTagClick}
                                                onAuthorClick={this.onAuthorClick}
                                                questions={popUpQuestions}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </Transition>
                </Fragment>
            );
        }

        return view;
    };

    render () {
        return (
            <div className={cx('container')}>
                <div className={cx(s.root, 'row')}>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

export default ResultPage;
