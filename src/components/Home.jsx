import React from 'react'
import '../styles/Home.css'

import gkLogo from '../assets/gk.svg'
import sportLogo from '../assets/sport.svg'
import geograpthyLogo from '../assets/geography.svg'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = () => {

    let topics = [

        { name: 'Sports', logo: sportLogo, altText: 'Sport Logo' },
        { name: 'Geograpthy', logo: geograpthyLogo, altText: 'Geograpthy Logo' },
        { name: 'Random', logo: gkLogo, altText: 'Random Logo' },
    ]
    return (
        <main className='Home'>
            <header>
                <h1>Welcome to Quizly!</h1>
                <p>Pick a topic to get started</p>
            </header>
            <section className='topics'>

                {topics.map((topic, i) => (
                    <Link to={`${topic.name.toLowerCase()}`} key={i} className="topic" category={topic.name.toLowerCase()}>
                        <img src={topic.logo} alt={topic.altText} style={{ width: '40px', height: '40px' }} />{topic.name}
                    </Link >
                ))}
            </section>
        </main>

    )
}

export default Home