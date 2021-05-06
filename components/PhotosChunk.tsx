import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import {Animated, FlatList, Text, StyleSheet, Dimensions, View} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
interface Props {
  photo: MediaLibrary.Asset;
  numCol: 2 | 3 | 4;
  loading: boolean;
}

const PhotosChunk: React.FC<Props> = (props) => {
  return (
    <Animated.View
      key={'PhotoChunkView_' + props.numCol}
      style={[styles.AnimatedView,{flex: 1/props.numCol,}]}
    >
      <Animated.Image
        key={"Image_"+props.numCol+"_"+props.photo.uri}
        source={{uri: props.photo.uri}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: SCREEN_WIDTH / props.numCol,
          width: SCREEN_WIDTH / props.numCol,
          backgroundColor: props.loading ? 'grey' : 'white',
          margin: 1,
        }}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  AnimatedView: {
    width: SCREEN_WIDTH,
  },
});
export default PhotosChunk;
