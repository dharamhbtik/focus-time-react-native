import React,{useState} from "react";
import {View, StyleSheet, Text, Vibration, Platform} from "react-native";
import {ProgressBar} from "react-native-paper";
import {useKeepAwake} from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import {Countdown } from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import { Timing} from './Timing';

const DEFAULT_TIME =1;
export const Timer = ({focusSubject,onTimerEnd,clearSubject})=>{
  useKeepAwake();
  const[minutes,setMinutes] = useState(DEFAULT_TIME);
  const [isStarted,setIsStarted] =useState(false);
  const[progress,setProgress] = useState(0);
  const onProgress = (progress) =>{
    setProgress(progress);
  }
  const vibrate = ()=>{
    if(Platform.OS ==="ios"){
      const interval = setInterval(()=>Vibration.vibrate(),1000);
      setTimeout(()=>clearInterval(interval),10000);
    } else{
      Vibration.vibrate(10000);
    }
  }
  const onEnd= ()=>{
    vibrate();
  setMinutes(DEFAULT_TIME);
  setProgress(1);
  setIsStarted(false);
  onTimerEnd();

  }
const changeTime= (min)=>{
  setMinutes(min);
  setProgress(1);
  setIsStarted(false);
}
return(
  <View style={style.container}>
  <View style={style.countdown}>
  <Countdown 
    minutes={minutes} 
    isPaused={!isStarted} 
    onProgress={onProgress}
    onEnd={onEnd} />
  </View>
  <View style={{paddingTop:spacing.xxl}}>
  <Text style={style.title}>Focusing on:</Text>
    <Text style={style.task}>{focusSubject}</Text>
    </View>
    <View>
    <View style={{paddingTop:spacing.sm}}>
    <ProgressBar 
    color="#5E84E2"
    progress= {progress}
    style={{height:20,marginLeft:10,marginRight:10}}
    />
    </View>
    <View style={style.buttonWrapper}>
    <Timing onChangeTime={changeTime}/>
    <Text>
    </Text>
    </View>
    </View>
    <View style={style.buttonWrapper}>
    {isStarted ? 
    (
    <RoundedButton title="Pause"  onPress={()=>setIsStarted(false)} />
    ) : (
    <RoundedButton title="Start"  onPress={()=>setIsStarted(true)} />
    ) }
   
    </View>
     <View style={style.clearSubject}>
     <RoundedButton title="-" size={50}  onPress={()=>clearSubject()} />
    </View>
  </View>
)
}

const style = StyleSheet.create({
  container:{
    flex:1,
    
  },
  title:{
    color:colors.white,
    textAlign:"center"
  },
  task:{
    color:colors.white,
    fontWeight:'bold',
    textAlign:"center"
  },
  countdown:{
    flex:0.5,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonWrapper:{
    flex:0.3,
    padding:15,
    marginTop: (Platform.OS ==='ios' ||  Platform.OS ==='android')? 35 : 0,
    justifyContent:"center",
    alignItems:"center",
    flexDirection: 'row'
  },
  clearSubject:{
    paddingBottom:25,
    paddingLeft:25,

  }
})