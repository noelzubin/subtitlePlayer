import { SRTItem } from 'srt-parser-2';
import AudioPlayer from './audio-player.tsx';
import Subtitle from './subtitle.tsx';
import { usePlayer } from './usePlayer.ts';

interface IPlayer {
    subtitles: SRTItem[]
    closeSubtitles: () => void
}

const Player: React.FC<IPlayer> = ({ subtitles, closeSubtitles }) => {
    const player = usePlayer(subtitles);

    console.log(player.state);

    return (
        <>
            <Subtitle subtitle={player.state.activeSubtitles[0]?.text ?? ""} closeSubtitle={closeSubtitles} />
            <AudioPlayer
                onPlay={() => { player.actions.play() }}
                onPause={() => { player.actions.pause() }}
                playing={player.state.isPlaying}
                onSeek={(time) => { player.actions.seekTo(time) }}
                currentTime={player.state.currentTime}
                maxTime={player.state.totalDuration}
            />
        </>
    );
}

export default Player;
