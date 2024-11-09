import React from "react"
import { useState } from "react"
import Axios from 'axios';

export default function Home(){
    const [leaderboard, setLeaderboard] = useState(false)
    const [leaderboardData, setLeaderboardData] = useState([]);
    const maps = useState([
        {
            name: 'Cartoon Network Search',
            img: '/cn-ss.jpg',
            gameId: 1
        }
    ])
    

    const viewLeaderboard = async(gameId) => {
        setLeaderboard(() => true);
        await Axios.get(`http://localhost:4000/api/leaderboard/${gameId}`)
        .then((res) => {
            console.log("data", res.data);
            setLeaderboardData(() => res.data);
        })
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return(
        <div className="flex-col">
            <div className='fixed top-0 left-0 flex items-center h-20 justify-between text-3xl text-white py-2 px-20 w-full bg-zinc-900'>
                <a href="/">Photo Tag.</a>
            </div>
            <div className="flex mt-20 p-20 justify-center bg-zinc-950 h-screen w-full">
                <div className="flex-col rounded-xl gap-20 items-center justify-center w-1/4 h-80 bg-zinc-900">
                    <img className="h-1/2 w-full" src='/cn-ss.png' alt="" />
                    <div className="flex-col w-full p-3 px-20">
                        <div className="flex w-full justify-center">
                            <h1 className="text-white text-2xl">Cartoon Network Search</h1>
                        </div>
                        <div className="flex w-full justify-center mt-10">
                            <a href="/cartoon-network" className="w-full h-10 items-center text-white rounded-xl flex justify-center bg-zinc-900 hover:bg-zinc-800">Play</a>
                            <button onClick={() => {viewLeaderboard(1)}}  className="w-full h-10 items-center text-white rounded-xl flex justify-center bg-zinc-900 hover:bg-zinc-800">Leaderboard</button>
                        </div>
                    </div>
                </div>
            </div>
            {leaderboard ?
                <div className='fixed flex justify-center items-center h-full w-full top-0 left-0 bg-black/50'>
                    <div className='flex-col items-center max-h-fit min-h-64 w-1/4 text-white bg-zinc-900 rounded-3xl'>
                        <div className='p-1 flex text-xl w-full justify-end '>
                            <button className='px-3 hover:text-gray-500' onClick={() => { setLeaderboard(false) }}>x</button>
                        </div>
                        <div className='flex-col w-full px-10'>
                            <h1 className="text-lg">Leaderboard</h1>
                        </div>
                        <div className="flex-col items-center justify-center text-sm mt-5">
                            {leaderboardData.map((data) => {
                                return(
                                    <div className="flex px-12">
                                        <div className="w-1/2">{data.username}</div>
                                        <div>{formatTime(data.time)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div> : null}
                <div className="flex items-center justify-center gap-3 h-20 w-full text-white bg-gray-800">
                    <p className="">Created by <a className="hover:text-gray-400" target='_blank' href="https://github.com/MCSponge21">MCSponge21</a></p>
                    <a target='_blank' href="https://github.com/MCSponge21">
                        <img className="h-5" src="pngegg.png" alt="github logo" />
                    </a>
                </div>
        </div>
    )
}