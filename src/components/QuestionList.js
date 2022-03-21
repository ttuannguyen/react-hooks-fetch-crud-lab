import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestions = questions.filter(q => q.id !== id); //new arr derived from deleted Q
      setQuestions(updatedQuestions)
    })
  }

  const questionItems = questions.map(question => (
    <QuestionItem 
      key = {question.id}  
      question = {question}
      onDeleteClick={handleDeleteClick}
    />
  ))
  
  // const updatedQuestions = questions.filter(q => q.id !== id);
  // setQuestions(updatedQuestions);


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
