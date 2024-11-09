import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

export default function Game() {

    const [dropDown, setDropDown] = useState(false);
    const [username, setUsername] = useState('');
    const [gameCompleted, setGameCompleted] = useState(false);
    const [overScreen, setOverScreen] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [timer, setTimer] = useState(0);
    const [characters, setCharacters] = useState([
        {
            name: "Pizza Steve",
            x: 26,
            y: 35,
            found: false,
            img: '/pizza-steve.png'
        },
        {
            name: "Sumo",
            x: 77,
            y: 26,
            found: false,
            img: '/sumo.png'
        },
        {
            name: "Rigby",
            x: 34,
            y: 61,
            found: false,
            img: '/rigby.png'
        },
        {
            name: "Apple",
            x: 87,
            y: 66,
            found: false,
            img: '/apple.png'
        }
    ]);

    //increases timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameCompleted) {
                setTimer((prevTimer) => prevTimer + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameCompleted]);

    //gets coordinates and creates a dropdown onclick
    const dropDownChange = (e) => {
        if (!gameCompleted) {
            setDropDown(() => !dropDown);
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            console.log(xPercent, yPercent)

            setSelectedCoordinates({ xPercent, yPercent });
        }
    }

    //checks if character is there
    const verify = (charactername) => {
        let character = null;
        let charId = 0;
        let newMarkers = [...markers];

        for (let i = 0; i < characters.length; i++) {
            if (characters[i].name == charactername) {
                character = characters[i];
                charId = i;
            }
        }

        if (selectedCoordinates.xPercent >= character.x - 4 && selectedCoordinates.xPercent <= character.x + 4 && selectedCoordinates.yPercent >= character.y - 4 && selectedCoordinates.yPercent <= character.y + 4) {
            character.found = true;
            newMarkers.push({
                symbol: "✅",
                x: selectedCoordinates.xPercent,
                y: selectedCoordinates.yPercent
            })
        } else {
            newMarkers.push({
                symbol: "❌",
                x: selectedCoordinates.xPercent,
                y: selectedCoordinates.yPercent
            })
        }
        setMarkers(newMarkers);
    }

    //checks if all characters are found
    const gameOver = () => {
        let over = true;
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].found == false) {
                over = false;
            }
        }
        if (over) {
            setGameCompleted(true);
            setOverScreen(true);
        }
    }

    //formats the timer
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    //add your score and username to the database
    const submitScore = (e) => {
        e.preventDefault();
        if (username != '') {
            Axios.post("http://localhost:4000/api/leaderboard/1", { username, timer })
                .then((res) => {
                    setOverScreen(() => false);
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }

    return (
        <div>
            <div onClick={dropDownChange} className='relative'>
                {markers[0] != undefined ? <div>
                    {markers.map((marker) => {
                        return (
                            <div className='absolute text-5xl' style={{
                                top: `calc(${marker.y}% - 1%)`,
                                left: `calc(${marker.x}% - 1.5%)`
                            }}>
                                {marker.symbol}
                            </div>
                        )
                    })}
                </div> : null}
                {dropDown ? <div className='absolute p-2 h-fit w-40 bg-zinc-900 border-black border-2 rounded-lg' style={{
                    top: `calc(${selectedCoordinates.yPercent}% + 3%)`,
                    left: `calc(${selectedCoordinates.xPercent}% + 2%)`
                }}>
                    {characters.map((character) => {
                        if (!character.found) {
                            return (
                                <div className='text-white'>
                                    <button className='flex hover:bg-zinc-700 w-full rounded-sm px-2 py-1' onClick={() => { verify(character.name); gameOver(); }}>{character.name}</button>
                                </div>
                            )
                        }
                    })}
                </div> : null}
                {dropDown ? <div className='absolute h-28 w-28 border-red-500 border-4 rounded' style={{
                    top: `calc(${selectedCoordinates.yPercent}% - 2.5%)`,
                    left: `calc(${selectedCoordinates.xPercent}% - 2.7%)`
                }}></div> : null}
                <div className='fixed flex h-20 items-center justify-between text-4xl text-white py-2 px-20 w-full bg-zinc-900'>
                    <a href="/" className='text-3xl'>Photo Tag.</a>
                    <div className='flex gap-10 items-center'>
                        <div>{formatTime(timer)}</div>
                        <div className='flex gap-10'>
                            {characters.map((character) => {
                                if (!character.found) {
                                    return (
                                        <div className='flex-col items-center'>
                                            <img src={character.img} className='h-14 w-14' />
                                            <p className='text-xs'>{character.name}</p>
                                        </div>)
                                } else if (character.found) {
                                    return (
                                        <div className='flex-col items-center'>
                                            <img src={character.img} className='h-14 w-14 opacity-25' />
                                            <p className='text-xs opacity-25'>{character.name}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <img src="/cartoon-network-characters.jpg" alt="cartoon network characters" />
            </div>
            {gameCompleted && overScreen ?
                <div className='fixed flex justify-center items-center h-full w-full top-0 left-0 bg-black/50'>
                    <div className='flex-col h-64 w-96 text-white bg-gray-900 rounded-3xl'>
                        <div className='p-1 flex text-xl w-full justify-end '>
                            <button className='px-3' onClick={() => { setOverScreen(false) }}>x</button>
                        </div>
                        <form className='flex-col h-full w-full px-10'>
                            <h1 className='text-xl'>Great job!</h1>
                            <p className='mt-5'>You completed the search in {formatTime(timer)}</p>
                            <input type="text" id='username' onChange={(e) => { setUsername(e.target.value) }} placeholder='Your username' className='flex h-10 mt-5 w-full text-black' />
                            <button onClick={(e) => { submitScore(e) }} className='mt-5 p-2 bg-zinc-700 rounded-lg hover:bg-zinc-600'>Submit Score</button>
                        </form>
                    </div>
                </div> : null}
        </div>
    )
}