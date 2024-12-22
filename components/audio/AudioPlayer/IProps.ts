import { Audio } from "expo-av";
import { StyleProp, ViewStyle } from "react-native";

export default interface IProps {
  /**
   * track that should be played
   */
  audio: Audio.Sound;

  /**
   * describes the given track
   */
  title: string;

  /**
   * Description will be shown after clicking at the player. It provides the user with more information about the track or displays the subtitles.
   */
  description?: string;

  /**
   * defines if track should be played
   */
  play: boolean;

  /**
   * actions to be done when track starts playing
   */
  onPlay(): any;

  /**
   * actions to be done when track pauses
   */
  onPause(): any;

  /**
   * actions to be done when track finishes
   */
  onFinish(): any;

  /**
   * additional styles for the whole audio player
   */
  style?: StyleProp<ViewStyle>[];
}
