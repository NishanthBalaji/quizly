import React from 'react'
import { useNavigate } from "react-router-dom";

const Result = ({ score, topic }) => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }
    return (
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
    )
}

export default Result

