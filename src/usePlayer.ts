import { useCallback, useEffect, useState } from 'react';
import { SRTItem } from 'srt-parser-2';

export interface PlayerState {
    currentTime: number;
    isPlaying: boolean;
    activeSubtitles: SRTItem[];
    totalDuration: number;
}

export interface PlayerActions {
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    seekTo: (position: number) => void;
}

const getTotalDuration =(subtitles: SRTItem[])=> {
    if (subtitles.length === 0) {
        return 0;
    }
    return subtitles[subtitles.length - 1].endSeconds;
}

export function usePlayer(subtitles: SRTItem[]) {

    const [state, setState] = useState<PlayerState>({
        currentTime: 0,
        isPlaying: false,
        activeSubtitles: [],
        totalDuration: getTotalDuration(subtitles),
    });

    const [startTime, setStartTime] = useState<number | null>(null);
    const [pausedPosition, setPausedPosition] = useState(0);

    const getCurrentPosition = useCallback(() => {
        if (state.isPlaying && startTime !== null) {
            return (Date.now() - startTime) / 1000;
        }
        return pausedPosition;
    }, [state.isPlaying, startTime, pausedPosition]);

    const updateState = useCallback(() => {
        const currentTime = getCurrentPosition();
        const activeSubtitles = subtitles.filter(subtitle =>
            currentTime >= subtitle.startSeconds && currentTime <= subtitle.endSeconds
        );

        setState(prev => ({
            ...prev,
            currentTime,
            activeSubtitles
        }));

        if(currentTime >= state.totalDuration) {
            pause();
        }
    }, [getCurrentPosition, subtitles]);

    useEffect(() => {
        let interval: number | null = null;
        if (state.isPlaying) {
            interval = window.setInterval(updateState, 100);
        }
        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [state.isPlaying, updateState]);

    const play = useCallback(() => {
        if (!state.isPlaying) {
            setStartTime(Date.now() - pausedPosition * 1000);
            setState(prev => ({ ...prev, isPlaying: true }));
        }
    }, [state.isPlaying, pausedPosition]);

    const pause = useCallback(() => {
        if (state.isPlaying) {
            setPausedPosition(getCurrentPosition());
            setStartTime(null);
            setState(prev => ({ ...prev, isPlaying: false }));
        }
    }, [state.isPlaying, getCurrentPosition]);

    const togglePlayPause = useCallback(() => {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }, [state.isPlaying, play, pause]);

    const seekTo = useCallback((position: number) => {
        setPausedPosition(position);
        if (state.isPlaying) {
            setStartTime(Date.now() - position * 1000);
        }
        updateState();
    }, [state.isPlaying, updateState]);

    const actions: PlayerActions = {
        play,
        pause,
        togglePlayPause,
        seekTo
    };

    return {
        state,
        actions
    };
}