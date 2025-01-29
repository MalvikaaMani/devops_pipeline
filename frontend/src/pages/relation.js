import React, { useState, useEffect } from "react";
import './relation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchRandomQuestion = async () => {
    const response = await fetch("http://127.0.0.1:8000/questions/random-question");
    return response.json();
};

export const validateAnswer = async (questionId, answers) => {
    const response = await fetch("http://127.0.0.1:8000/validate/validate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: questionId, answers }),
    });
    return response.json();
};

const Relation = () => {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState({ reflexive: false, symmetric: false, transitive: false });
    const [result, setResult] = useState(null);

    useEffect(() => {
        loadNewQuestion();
    }, []);

    const loadNewQuestion = async () => {
        const data = await fetchRandomQuestion();
        setQuestion(data);
        setResult(null);
        setAnswers({ reflexive: false, symmetric: false, transitive: false });
    };

    const handleSubmit = async () => {
        const response = await validateAnswer(question.id, answers);
        setResult(response);

        console.log(response); // Log the response to check its structure

        if (response.is_correct) {
            toast.success("Correct answer!", { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error("Incorrect answer!", { position: toast.POSITION.TOP_CENTER });
        }
    };

    
    if (!question) return <p>Loading...</p>;

    return (
        <div>
            <h1>Relation Properties Game</h1>
            <p className="relation-text">Relation: {JSON.stringify(question.relation)}</p>
            <div className="answer-container">
                <label>
                    Reflexive:
                    <input
                        type="checkbox"
                        checked={answers.reflexive}
                        onChange={(e) => setAnswers({ ...answers, reflexive: e.target.checked })}
                    />
                </label>
                <br />
                <label>
                    Symmetric:
                    <input
                        type="checkbox"
                        checked={answers.symmetric}
                        onChange={(e) => setAnswers({ ...answers, symmetric: e.target.checked })}
                    />
                </label>
                <br />
                <label>
                    Transitive:
                    <input
                        type="checkbox"
                        checked={answers.transitive}
                        onChange={(e) => setAnswers({ ...answers, transitive: e.target.checked })}
                    />
                </label>
            </div>
            <br />
             {result && (
                <div className="result-container">
                    <p>{result.is_correct ? "Correct!" : "Incorrect!"}</p>
                    <p>Correct Answers: {JSON.stringify(result.correct_answers)}</p>
                </div>
            )}
            <button onClick={handleSubmit}>Submit Answer</button>
            <button onClick={loadNewQuestion}>Load New Question</button>
            <ToastContainer />
        </div>
    );
};

export default Relation;