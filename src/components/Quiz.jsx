import React, { useEffect, useState } from 'react'
import '../styles/Quiz.css'
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { useParams } from "react-router-dom";

import gkLogo from '../assets/gk.svg'
import sportLogo from '../assets/sport.svg'
import geograpthyLogo from '../assets/geography.svg'

import axios from 'axios';

const Quiz = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    let [count, setCount] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [topic, setTopic] = useState({ name: '', logo: '', altText: '', apiCategory: 0 });
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);

    const [reload, setReload] = useState(false)

    const retryCount = 1;

    let topics = [{ name: 'Sports', logo: sportLogo, altText: 'Sport Logo', apiCategory: 21 },
    { name: 'Geography', logo: geograpthyLogo, altText: 'Geograpthy Logo', apiCategory: 22 },
    { name: 'Random', logo: gkLogo, altText: 'Random Logo', apiCategory: 9 },]


    useEffect(() => {
        let selectedTopic = topics[2];

        if (category[0]?.toLowerCase() === 's') {
            selectedTopic = topics[0];
        } else if (category[0]?.toLowerCase() === 'g') {
            selectedTopic = topics[1];
        }

        setTopic(selectedTopic);

        if (selectedTopic.apiCategory) {
            const fetchData = async () => {
                await new Promise(resolve => setTimeout(resolve, 1500));

                try {
                    const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedTopic.apiCategory}&type=multiple&encode=url3986`);

                    const formattedQuestions = res.data.results.map(q => ({
                        question: decodeURIComponent(q.question),
                        correct_answer: decodeURIComponent(q.correct_answer),
                        incorrect_answers: q.incorrect_answers.map(ans => decodeURIComponent(ans))
                    }));

                    console.log(formattedQuestions);
                    setQuestions(formattedQuestions);

                } catch (e) {
                    console.log(e);
                    setReload(true);
                }
            };

            fetchData();
        }
    }, [category]);

    const handleNext = () => {
        if (count < 10) {
            if (selectedOption === questions[count - 1].correct_answer) {
                setScore(prevScore => prevScore + 1);
            }
            setSelectedOption(null);
            setCount(prevCount => prevCount + 1);

        }

        console.log('Question no:', count)
        console.log('Score:', score)
    }

    const handleChange = (option) => {
        setSelectedOption(option);
        console.log(option)
    }

    const handleSubmit = () => {
        if (selectedOption === questions[count - 1].correct_answer) {
            setScore(prevScore => prevScore + 1);
        }
        setSelectedOption(null);
        setCount(prevCount => prevCount + 1);

    }

    const handleReload = () => {
        window.location.reload();
    }

    const handleHome = () => {
        navigate('/');
    }

    let isLast = count === 10

    let showResult = count === 11;

    return (
        <main className='Quiz'>
            <header className='header'>
                <img src={topic.logo} alt={topic.altText} style={{ width: '40px', height: '40px' }} />
                <h1>{topic.name}</h1>
            </header >
            {showResult ?
                <section className='questions'>
                    <p className='completed'>Quiz Completed!</p>
                    <p>You Scored</p>
                    <div className='score-box'>
                        <header className='header'>
                            <img src={topic.logo} alt={topic.altText} style={{ width: '40px', height: '40px' }} />
                            <h1>{topic.name}</h1>
                        </header >


                        <p className='score'>{score}</p>
                        <p >Out of 10</p>
                    </div>


                    <button className='home-button' onClick={handleHome}>Home</button>


                </section>
                :
                <>
                    <section className='questions'>
                        {/* <p>Questions {count} of 10</p> */}
                        {questions.length > 0 && questions[count - 1] ? (
                            <div className='for-pc'>
                                <section className='pc-question'>
                                    <p>Questions {count} of 10</p>
                                    <h2>{questions[count - 1].question}</h2>
                                    <div style={{ width: "100%", padding: "10px 0" }}>
                                        <ProgressBar>
                                            <ProgressBar now={((count / 10) * 100) - 10} key={1} />
                                            <ProgressBar className='nextPro' now={10} key={2} />
                                        </ProgressBar>

                                    </div>
                                </section>

                                <div className='options'>
                                    {[...questions[count - 1].incorrect_answers, questions[count - 1].correct_answer].sort()
                                        .map((option, index) => (
                                            <label key={index} className="option-button">
                                                <input
                                                    className='option'
                                                    type="radio"
                                                    name="quiz-option"
                                                    checked={selectedOption === option}
                                                    onChange={() => handleChange(option)}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <div className='loading'>


                                {reload ?
                                    <>
                                        <h2>Unable to load questions!</h2>
                                        <button className="option-button next" onClick={handleReload}>Try Again</button>
                                    </>
                                    :
                                    <h2>Loading questions...</h2>
                                }
                            </div>

                        )}
                    </section>
                    {isLast ? <button className="option-button next" style={{ visibility: selectedOption ? 'visible' : 'hidden' }} onClick={handleSubmit}>Submit</button> : <button className="option-button next" style={{ visibility: selectedOption ? 'visible' : 'hidden' }} onClick={handleNext}>Next</button>}
                </>}
        </main>

    )
}

export default Quiz

