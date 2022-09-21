import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';


function ScrollWheel({ listYear, listDay, listMonth }) {
    const width = Dimensions.get('window').width;

    const headerHeight = 50;
    const scale = 0.9;

    const RIGHT_OFFSET = Dimensions.get('screen') * (1 - scale);

    const ITEM_WIDTH = Dimensions.get('screen').width * scale;
    const ITEM_HEIGHT = 120;

    const PAGE_HEIGHT = Dimensions.get('screen').height - headerHeight;
    const PAGE_WIDTH = Dimensions.get('screen').width;

    const [changeValue, setChangeValue] = React.useState(1);

    const animationStyle = React.useCallback(
        (value) => {
            'worklet';
            const translateY = interpolate(
                value,
                [-1, 0, 1],
                [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
            );
            const right = interpolate(
                value,
                [-1, -0.2, 1],
                [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3]
            );
            return {
                transform: [{ translateY }],
                right,
            };
        },
        [RIGHT_OFFSET]
    );


    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Carousel
                loop
                vertical
                width={width / 3}
                height={width / 2}
                data={listDay}
                pagingEnabled={false}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {item}
                        </Text>
                    </View>
                )}
            // customAnimation={animationStyle}
            />
            <Carousel
                loop
                vertical
                width={width / 3}
                height={width / 2}
                data={listMonth}
                pagingEnabled={false}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index + 1}
                        </Text>
                    </View>
                )}
            // customAnimation={animationStyle}
            />
            <Carousel
                loop
                vertical
                width={width / 3}
                height={width / 2}
                data={listYear}
                pagingEnabled={true}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {item}
                        </Text>
                    </View>
                )}
            // customAnimation={animationStyle}
            />
        </View>
    );
}

export default ScrollWheel;