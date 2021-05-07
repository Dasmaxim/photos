import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  StatusBar,
  SectionList,
  SectionListData,
} from 'react-native';
import {photoChunk} from '../types/interfaces';
import PhotosChunk from './PhotosChunk';
import { Asset } from 'expo-media-library';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

interface Props {
  photos: Array<photoChunk>;
  margin: Animated.AnimatedInterpolation;
  maxWidth: number;
  minWidth: number;
  numColumns: 2 | 3 | 4;
  opacity: Animated.AnimatedInterpolation;
  date: Date;
  loading: boolean;
  separator: 'day' | 'month';
  zIndex: number;
  scale: Animated.Value;
  sizeTransformScale: Animated.AnimatedInterpolation;
}

const RenderPhotos: React.FC<Props> = (props) => {
  const [scrollRef, setScrollRef] = useState<SectionList<Asset, photoChunk> | null>(null);
  const getItemLayout:any = (data:(SectionListData<Asset[], photoChunk>[] | null), index:number) => {
    let result:{
      length: number;
      offset: number;
      index: number;
    } = {
      length: SCREEN_WIDTH/props.numColumns,
      offset: (Math.floor((index+1)/2)-1-((index+1) % 2))*SCREEN_WIDTH/props.numColumns,
      index,
    };
    return result;
  };
  useEffect(()=>{
    const scrollToLocation = (sectionIndex:number) => {
      if(scrollRef){
        scrollRef.scrollToLocation({
          animated: true,
          sectionIndex: sectionIndex,
          itemIndex: 0,
          viewPosition: 0
        });
      };
    }
    if(props.numColumns===2){
      scrollToLocation(10);
    }
  },[scrollRef]);

  return props.photos ? (
    <Animated.View
      key={"View" + props.separator + props.numColumns}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        opacity: props.opacity,
        zIndex: props.zIndex,
        transform: [
          {
            scale: props.sizeTransformScale
          },
          {
            translateX: Animated.divide(
              Animated.subtract(
                Animated.multiply(
                  props.sizeTransformScale,SCREEN_WIDTH), 
                SCREEN_WIDTH)
              , Animated.multiply(2,props.sizeTransformScale))
          },
          {
            translateY: Animated.divide(
              Animated.subtract(
                Animated.multiply(
                  props.sizeTransformScale,(SCREEN_HEIGHT-(StatusBar.currentHeight || 0))
                ), (SCREEN_HEIGHT-(StatusBar.currentHeight || 0))
              )
              , Animated.multiply(2,props.sizeTransformScale))
          }
        ],
      }}
    >
      <SectionList
        key={"SectionList"+ props.separator + props.numColumns}
        ref={ref=>(setScrollRef(ref))}
        initialNumToRender={Math.ceil(SCREEN_HEIGHT/(SCREEN_WIDTH/props.numColumns)) + props.numColumns*4}
        sections={props.photos}
        //keyExtractor={(item, index) => item.uri + index}
        renderItem={({item}) =>
          <PhotosChunk
            photo={item}
            numCol={props.numColumns}
            loading={props.loading}
            key={'PhotosChunk' + props.numColumns}
          />
        }
        onEndReached={() => console.log('getting photo')}
        // contentContainerStyle={{flexGrow: 1}}
        onEndReachedThreshold={0.7}
        //onRefresh={()=>{console.log('getting new photo')}}
        //refreshing={false}
        removeClippedSubviews={true}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          position: 'absolute',
          top: 0,
          bottom: 0,
          marginTop: 0,
          right: 0,
          left: 0,
        }}
        renderSectionHeader={({section: {date}}) => (
          <Text style={styles.header}>{date}</Text>
        )}
        //keyExtractor={(item, index) => index}
        scrollEnabled={true}
        contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}
        getItemLayout={getItemLayout}
      />
    </Animated.View>
  ) : (
    <Animated.View
    key={"ViewLoading" + props.separator + props.numColumns}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: 0,
        bottom: 0,
        marginTop: StatusBar.currentHeight || 0,
        right: 0,
        left: 0,
        opacity: props.opacity,
      }}>
      <Text>Loading...</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },
});
export default RenderPhotos;
