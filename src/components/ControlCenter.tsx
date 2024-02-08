import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {playbackService} from '../../musPlayerService';

const ControlCenter = () => {
  const [ppbtn, setppbtn] = useState('play-arrow');
  const playBackState = usePlaybackState();
  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: any) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (ppbtn === 'pause') {
        setppbtn('play-arrow');
        TrackPlayer.pause();
      } else {
        setppbtn('pause');
        TrackPlayer.play();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon style={styles.icon} name={ppbtn} size={75} />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
