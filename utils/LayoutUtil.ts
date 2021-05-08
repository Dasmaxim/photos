import { LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';

const headerHeight:number = 20;
export class LayoutUtil {
  static getWindowWidth() {
    // To deal with precision issues on android
    return Math.round(Dimensions.get('window').width * 1000) / 1000; //Adjustment for margin given to RLV;
  }
  static getLayoutProvider(colNum:number, groupBy:string, header:{[key:string]: {header:string, index:number}}) {
        return new LayoutProvider(
          () => {
            return colNum; //Since we have just one view type
          },
          (type, dim, index) => {
            let isHeader = false;
              for(const key in header) {
                if(header[key] && header[key].index) {
                  for(let i=0; i<colNum;i++){
                    if(header[key].index===index - i){
                      isHeader = true;
                    }
                  }
                }
              }
            const windowWidth = LayoutUtil.getWindowWidth();
            if(isHeader){
              dim.width = windowWidth / colNum;
              dim.height = headerHeight + windowWidth / colNum;
            }else{
              dim.width = windowWidth / colNum;
              dim.height = windowWidth / colNum;
            }
          }
        );
  }
}
