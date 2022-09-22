import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { COLORS } from './colors';


function ScrollWheel({ listYear, listDay, listMonth }) {
    const width = Dimensions.get('window').width;

    const headerHeight = 50;
    const scale = 0.9;

    const RIGHT_OFFSET = Dimensions.get('screen') * (1 - scale);

    const ITEM_WIDTH = Dimensions.get('screen').width * scale;
    const ITEM_HEIGHT = 20;

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
            return {
                // opacity: translateY
                transform: [{ translateY }],
            };
        },
        [RIGHT_OFFSET]
    );


    return (
        <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 10 }}>
            <Text style={{ color: COLORS.black, fontSize: 18, textAlign: 'center', marginBottom: 20 }}>Date of birth</Text>
            <View style={{ position: 'absolute', backgroundColor: '#f2f2f2', top: 100, right: 0, left: 0, alignSelf: 'center', justifyContent: 'center', height: ITEM_HEIGHT, marginHorizontal: 10, borderRadius: 5 }}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: 140
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
                    data={listDay}
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
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                                {item}
                            </Text>
                        </View>
                    )}
                // customAnimation={animationStyle}
                />
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: 140
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
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
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                                {index + 1}
                            </Text>
                        </View>
                    )}
                // customAnimation={animationStyle}
                />
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: 140
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
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
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                                {item}
                            </Text>
                        </View>
                    )}
                // customAnimation={animationStyle}
                />
            </View>
            <Text style={{ color: COLORS.purple, fontSize: 18, textAlign: 'center',marginVertical:20 }}>Xác nhận</Text>
        </View>
    );
}

export default ScrollWheel;