import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { SBItem } from "./SBItem";
import SButton from "./SButton";
import { ElementsText } from "./constants";
import { Dimensions, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const PAGE_WIDTH = Dimensions.get('window').width

function Index({ data, navigation }: { data: any, navigation: any }) {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const progress = useSharedValue<number>(0);
  const [isFast, setIsFast] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const colors = [
    "#26292E",
    "#899F9C",
    "#B3C680",
    "#5C6265",
    "#F5D399",
    "#F1F1F1",
  ];

  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = isVertical
    ? ({
      vertical: true,
      width: windowWidth,
      height: PAGE_WIDTH / 2,
    } as const)
    : ({
      vertical: false,
      width: windowWidth,
      height: PAGE_WIDTH / 2,
    } as const);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{
          width: PAGE_WIDTH,
        }}
        loop
        pagingEnabled={pagingEnabled}

        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={1500}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={data}
        renderItem={({ index, item }) => <SBItem index={index} data={item} />}
      />

      <Pagination.Basic<{ color: string }>
        progress={progress}
        data={data.map((d: any) => ({}))}
        dotStyle={{
          width: 25,
          height: 4,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        activeDotStyle={{
          overflow: "hidden",
        }}
        containerStyle={[
          isVertical
            ? {
              position: "absolute",
              width: 25,
              right: 5,
              top: 40,
            }
            : undefined,
          {
            gap: 10,
            marginBottom: 10,
          },
        ]}
        horizontal={!isVertical}
        onPress={onPressPagination}
      />

      <Pagination.Basic<{ color: string }>
        progress={progress}
        data={colors.map((color) => ({ color }))}
        size={15}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: "#FFF"
        }}
        containerStyle={[
          isVertical
            ? {
              position: "absolute",
              width: 20,
              right: -70,
              bottom: -10,
            }
            : {
              position: "absolute",
              width: 150,
              left: 130,
              bottom: -190,
            },
          {
            gap: 5,
            marginBottom: 10,
          },
        ]}
        horizontal={!isVertical}
        onPress={onPressPagination}
      />
      {/*<Pagination.Basic<{ color: string }>
        progress={progress}
        data={colors.map((color) => ({ color }))}
        size={20}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: "hidden",
        }}
        containerStyle={[
          isVertical
            ? {
              position: "absolute",
              width: 20,
              right: 5,
              top: 40,
            }
            : undefined,
        ]}
        horizontal={!isVertical}
        renderItem={(item) => (
          <View
            style={{
              backgroundColor: item.color,
              flex: 1,
            }}
          />
        )}
        onPress={onPressPagination}
      />
*/}

    </View>
  );
}

export default Index;