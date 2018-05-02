export const SEARCH_URL = 'http://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default';

export const answersByQuestionIdUrl = (questionId) => {
    return `http://api.stackexchange.com/2.2/questions/${questionId}/answers?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=!9Z(-wzfpy`;
};

export const questionByIdUrl = (questionId) => {
    return `http://api.stackexchange.com/2.2/questions/${questionId}?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=!9Z(-wwK0y`;
};

