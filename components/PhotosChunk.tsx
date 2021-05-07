import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import {Image, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
/*
interface Props {
  photoUri: string;
  numCol: 2 | 3 | 4;
  loading: boolean;
}

class PhotosChunk extends React.PureComponent<Props> {
  render() {
    return (
      <View
        key={'PhotoChunkView_' + this.props.numCol}
        style={[styles.AnimatedView,{width: SCREEN_WIDTH/this.props.numCol,}]}
      >
                  <Image
                    key={"Image_"+this.props.numCol+"_"+this.props.photoUri}
                    source={{uri: this.props.photoUri}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      height: SCREEN_WIDTH / this.props.numCol,
                      width: SCREEN_WIDTH / this.props.numCol,
                      backgroundColor: this.props.loading ? 'grey' : 'white',
                      margin: 1,
                    }}
                  />
      </View>
    )
  }
}
*/
interface Props {
  photo: MediaLibrary.Asset;
  numCol: 2 | 3 | 4;
  loading: boolean;
}
const PhotosChunk: React.FC<Props> = (props) => {
  return (
    <View
      key={'PhotoChunkView_' + props.numCol}
      style={[styles.AnimatedView,{width: SCREEN_WIDTH/props.numCol,}]}
    >
      <Image
        key={"Image_"+props.numCol+"_"+props.photo.id}
        source={{uri: props.photo.uri}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: SCREEN_WIDTH / props.numCol,
          width: SCREEN_WIDTH / props.numCol,
          backgroundColor: props.loading ? 'grey' : 'white',
          margin: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  AnimatedView: {
    width: SCREEN_WIDTH,
  },
});

export default PhotosChunk;
