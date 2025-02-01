import { useState } from "react";

interface IPlayer {
    playing: boolean;
    maxTime: number;
    currentTime: number;
    onSeek: (time: number) => void;
    onPause: () => void;
    onPlay: () => void;
}

const formatTime = (t: number) => {
    let seconds = Math.floor(t % 60);
    let s = seconds < 10 ? "0" + seconds : seconds;
    return `${Math.floor(t / 60)}:${s}`
}

const Player: React.FC<IPlayer> = ({ playing, onSeek, currentTime, maxTime, onPause, onPlay }) => {

    // Whether to continue playing after seeking
    const [shouldContinue, setShouldContinue ] = useState(false);
    const seekStart = () => {
        setShouldContinue(playing);
        onPause();
    }

    const seekEnd = () => { 
        if(shouldContinue) onPlay()
    }

    return (
        <div id="container" className="@container block w-full shadow-xl shadow-black/5">
            <div id="control-bar" className="h-16  px-4 w-full flex items-center justify-between @md:rounded-md @md:ring-1 @md:ring-slate-700/10 bg-secondary bg-zinc-900">
                <div className="h-full flex items-center justify-between">
                    <button
                        id="seek-backward-btn"
                        className="w-8 h-8 p-0 group rounded-full focus:outline-none focus-visible:ring-slate-700 focus-visible:ring-2"
                        onClick={() => onSeek(currentTime - 10)}
                    >
                        <svg className="pointer w-7 h-7 fill-none stroke-slate-500 group-hover:stroke-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                    {playing ? (
                        <button id="play-btn" className="h-10 w-10 p-2 mx-3 rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 focus:ring-2 focus:ring-offset-2" onClick={onPause}>

                            <svg className="relative left-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24" fill="white">
                                <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    ) : (
                        <button id="pause-btn" className="h-10 w-10 p-2 mx-3 rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 focus:ring-2 focus:ring-offset-2" onClick={onPlay}>

                            <svg className="relative left-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    )}
                    <button id="seek-forward-btn" className="w-8 h-8 p-0 group relative rounded-full focus:outline-none focus-visible:ring-slate-700 focus-visible:ring-2"

                        onClick={() => onSeek(currentTime + 10)}
                    >
                        <svg className="w-7 h-7 fill-none stroke-slate-500 group-hover:stroke-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                        </svg>
                    </button>
                    <div id="divider" className="block h-full border-l border-slate-700/10 mx-4" />
                </div>
                <div id="time-display" className="hidden @md:block text-slate-500 text-sm rounded-md focus:outline-none focus:ring-slate-700 focus:ring-2 text-zinc-400"> {formatTime(currentTime)} </div>
                <input
                    step="0.001"
                    value={currentTime}
                    onMouseDownCapture={() => seekStart()}
                    onMouseUpCapture={() => seekEnd()}
                    type="range"
                    className="block grow mx-4"
                    max={maxTime}
                    onChange={(e) => onSeek(parseFloat(e.target.value))}
                />
                <div id="time-display" className="hidden @md:block text-slate-500 text-sm rounded-md focus:outline-none focus:ring-slate-700 focus:ring-2 text-zinc-400"> {formatTime(maxTime)} </div>
            </div>
        </div>
    )
}

export default Player;