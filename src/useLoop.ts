import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from "./shared/models/stimTypes";
import { useState, useRef} from "react";
import usePayloads from "./shared/utilities/usePayloads";
import useFeedback from "./shared/utilities/useFeedback";
import { useDispatch, useSelector } from "react-redux";
import {useInterval} from 'usehooks-ts';
import { addFeedback } from "./state/redux/feedbackParameterSlice";
import { RootState } from "./state/redux/store";
import useSound from 'use-sound';
import { Root } from 'react-dom/client';

const currentSound = require('./assets/soundFX/effect_1.wav');


export enum PLAYBACK_STATE {
    Paused = 'paused',
    Playing = 'playing',
    Waiting = 'waiting'
}


 const useLoop = (
    setCursorIndex: React.Dispatch<React.SetStateAction<number>>
)=>{

    const dispatch = useDispatch();
    const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.Waiting);
    const timeElapsed = useRef(0)
    const currentIndex = useRef(-1);
    const notificationPause = useRef<NodeJS.Timeout | undefined>();


    const {
      sessionMinutes, tokenSets, currentlySelectedSet, 
      feedbackTime, hitUpgradeThreshold, isAdaptive, isVocal, isGeneratingFeedback, acknowledgementsAccepted,
      patternModel
    } = usePayloads();

    const tokens = tokenSets.find(set=> set.setName == currentlySelectedSet)?.tokens;

    const {
      answerQuestion, seekCommand, askQuestion, reset, 
      strikeCount, hitCount, feedbackAgo
    } = useFeedback({ 
      feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted, strikeThreshold:3,
      isVocal, isAdaptive,
      notifyUser, cancel, start
    });

    const {soundEffectsAt} = useSelector((state:RootState)=>state.persistedRootReducer.soundEffectsReducer);
    const [playSoundEffect] = useSound(currentSound); 

    const sessionTime = sessionMinutes*60*1000;

    const selectToken = ()=>{
      if(tokens){
        let max = tokens.length-1;
        return tokens[Math.floor(Math.random()*max)];
      }

      else return 'token not found'
    }



    const delay = playbackState == PLAYBACK_STATE.Playing ? 1000 : null;

  

  
    useInterval(()=>{
      if(timeElapsed.current >= sessionTime) {
        speak('Session Finished');
        clearTimeout(notificationPause.current);
        cancel();
        return;
      }

      //reset the timeline loop
      if(currentIndex.current >= patternModel.length-1)
      currentIndex.current = -1;
      
      const unit = patternModel[++currentIndex.current];
      setCursorIndex(currentIndex.current);
      switch(unit.type){
        case STIM_TYPES.Token: speak(selectToken()); break;
        case STIM_TYPES.Feedback: askQuestion();  break;
        case STIM_TYPES.SoundFX: playSoundEffect(); break;
      }

      timeElapsed.current += 1000;
      feedbackAgo.current++;
    }, delay)


  function start(){
      setCursorIndex(0)
      setPlaybackState(PLAYBACK_STATE.Playing)
    }

  function cancel(){


    setCursorIndex(-1)

    timeElapsed.current = 0;
    currentIndex.current = -1;
    setPlaybackState(PLAYBACK_STATE.Waiting);
    clearTimeout(notificationPause.current);
  }

  function resume(){
      setPlaybackState(PLAYBACK_STATE.Playing)
  }

  function pause(){
    clearTimeout(notificationPause.current);
      setPlaybackState(PLAYBACK_STATE.Paused);
  }

  function notifyUser(message: string, isContinuing: boolean){
    const afterNotify = isContinuing ? resume : cancel;
    
    pause();
    speak(message);
    notificationPause.current = setTimeout(afterNotify, 5000)
  }



  const rerender = ()=>{
    pause();
    resume(); 
  }


  return {answerQuestion, seekCommand, start, pause, resume, cancel, rerender, playbackState, currentIndex}
}

export default useLoop;