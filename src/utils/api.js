import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from "./_DATA";

export function getInitialData(){
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
            users,
            questions,
        }))
}

export function saveQuestion(question) {
    console.log("saveQuestion() input: ", question);
  return _saveQuestion(question);
}
