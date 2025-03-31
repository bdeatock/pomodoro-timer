import { useRef } from "react";

interface UseAudioProps {
  audioSrc: string;
}

const useAudio = ({ audioSrc }: UseAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (audioRef.current === null) {
    audioRef.current = new Audio(audioSrc);
  }

  const play = async () => {
    try {
      await audioRef.current?.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  return { play };
};

export default useAudio;
