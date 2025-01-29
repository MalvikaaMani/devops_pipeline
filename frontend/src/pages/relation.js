import React, { useState, useEffect } from "react";
import './relation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchRandomQuestion = async () => {
    const response = await fetch("http://127.0.0.1:8000/relation/question");
    return response.json();
};

export const validateAnswer = async (questionId, answers) => {
    const response = await fetch("http://127.0.0.1:8000/relation/validate/validate_relation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            question_id: questionId, 
            reflexive: answers.reflexive, 
            symmetric: answers.symmetric, 
            transitive: answers.transitive 
        }),
    });
    return response.json();
};

const Relation = () => {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState({ reflexive: false, symmetric: false, transitive: false });
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState(null);

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
        try {
            const response = await validateAnswer(question.id, answers);
            setResult(response);
            setMessage(response.correct ? "Correct answer!" : "Incorrect answer!");
        } catch (error) {
            console.error("Error submitting answer:", error);
            setMessage("Error submitting answer");
        }
    };

    if (!question) return <p>Loading...</p>;

    return (
        <div>
            <h1>Relation Properties Game</h1>
            <div className="question-box">
                <h3>Question {question.id}</h3>
                <p className="relation-text">
                    <strong>Relation:</strong><br/>
                    {Array.isArray(question.relation) 
                        ? question.relation.map((pair, index) => (
                            <span key={index}>({pair[0]}, {pair[1]}) </span>
                          ))
                        : JSON.stringify(question.relation)
                    }
                </p>
                
                <div className="answer-container">
                    <label>
                        <span>Reflexive</span>
                        <input
                            type="checkbox"
                            checked={answers.reflexive}
                            onChange={(e) => setAnswers({ ...answers, reflexive: e.target.checked })}
                        />
                    </label>
                    <label>
                        <span>Symmetric</span>
                        <input
                            type="checkbox"
                            checked={answers.symmetric}
                            onChange={(e) => setAnswers({ ...answers, symmetric: e.target.checked })}
                        />
                    </label>
                    <label>
                        <span>Transitive</span>
                        <input
                            type="checkbox"
                            checked={answers.transitive}
                            onChange={(e) => setAnswers({ ...answers, transitive: e.target.checked })}
                        />
                    </label>
                </div>
    
                {result && (
    <div className={`result-container ${result.correct ? 'result-success' : 'result-error'}`}>
        <h3>{result.correct ? '✓ Correct!' : '✗ Incorrect!'}</h3>
        <p>Correct Answers: {
            result.correct_answers.map((value, index) => {
                const property = ['Reflexive', 'Symmetric', 'Transitive'][index];
                return `${property}: ${value ? 'Yes' : 'No'}`
            }).join(', ')
        }</p>
    </div>
)}
    
                <div className="button-container">
                    <button className="submit-btn" onClick={handleSubmit}>Submit Answer</button>
                    <button className="next-btn" onClick={loadNewQuestion}>Next Question</button>
                </div>
            </div>
        </div>
    );
};

export default Relation;