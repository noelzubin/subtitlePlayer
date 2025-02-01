import "./App.css";
import Player from './player.tsx';
import { useCallback, useState } from 'react';
import Picker from './picker';
import srtParser2, { SRTItem } from "srt-parser-2";
import DragIcon from "./drag-icon.tsx";

const parser = new srtParser2();

function App() {

  const [subtitles, setSubtitles] = useState<undefined | SRTItem[]>(undefined);

  const setFileContent = useCallback((content: string) => {
    const subtitles = parser.fromSrt(content);
    setSubtitles(subtitles);
  }, []);

  return (
    <>
      <DragIcon />
      <main className="bg-zinc-900 rounded-md min-h-30 flex flex-col">
        {subtitles ? <Player subtitles={subtitles} closeSubtitles={() => setSubtitles(undefined)} /> :
          <Picker onFileSelect={(_, content) => setFileContent(content)} />
        }
      </main>
    </>
  );
}

export default App;
