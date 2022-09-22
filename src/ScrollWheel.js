import * as React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { COLORS } from './colors';

function ScrollWheel({ listYear, listDay, listMonth }) {
    const width = Dimensions.get('window').width;

    const ITEM_HEIGHT = 20;

    const animationStyle = (value) => {
        'worklet';
        const scale = interpolate(
            value,
            [-1, 0, 1, 1],
            [1, 1, 1, 0]
        );
        // const scale = interpolate(
        //     value,
        //     [0.5, 1, 0.5],
        //     [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
        //     Extrapolate.CLAMP
        // );
        const opacity = interpolate(
            value,
            [-2, -1, 0, 1, 2],
            [1.7, 1.2, 1, 1.2, 1.7],
            Extrapolate.CLAMP
        );
        // const opacity = interpolate(
        //     value,
        //     [0.5, 1, 0.5],
        //     [-ITEM_HEIGHT/2, 0, ITEM_HEIGHT/2]
        // );
        return {
            transform: [{ scale }],
        };
    }

    const [indexDate, setIndexDate] = React.useState(0);


    return (
        <View style={{ backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 10 }}>
            <Text style={{ color: COLORS.black, fontSize: 18, textAlign: 'center', marginBottom: 20 }}>Date of birth</Text>
            <View style={{ position: 'absolute', backgroundColor: '#f2f2f2', top: ITEM_HEIGHT * 4.5, right: 0, left: 0, alignSelf: 'center', justifyContent: 'center', height: ITEM_HEIGHT, marginHorizontal: 10, borderRadius: 5 }}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: ITEM_HEIGHT * 6
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
                    data={listDay}
                    defaultIndex={indexDate}
                    pagingEnabled={true}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => {
                        setIndexDate(index)
                    }}
                    renderItem={({ item, animationValue }) => {
                        return (
                            <Item
                                animationValue={animationValue}
                                label={item}
                                onPress={() => { }}
                            />
                        )
                    }}
                />
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: ITEM_HEIGHT * 6
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
                    data={listMonth}
                    pagingEnabled={false}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, animationValue }) => {
                        return (
                            <Item
                                animationValue={animationValue}
                                label={item}
                                onPress={() => { }}
                            />
                        )
                    }}
                />
                <Carousel
                    style={{
                        justifyContent: 'center',
                        width: (width - 32) / 3,
                        height: ITEM_HEIGHT * 6
                    }}
                    loop
                    vertical
                    width={(width - 32) / 3}
                    height={ITEM_HEIGHT}
                    data={listYear}
                    pagingEnabled={true}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, animationValue }) => {
                        return (
                            <Item
                                animationValue={animationValue}
                                label={item}
                                onPress={() => { }}
                            />
                        )
                    }}
                />
            </View>
            <Text style={{ color: COLORS.purple, fontSize: 18, textAlign: 'center', marginVertical: 20 }}>Xác nhận</Text>
        </View>
    );
}
const Item = (props) => {
    const { animationValue, label, onPress } = props;
    const containerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );
        const scale = interpolate(
            animationValue.value,
            [-2, -1, 0, 1, 2],
            [0.5, 0.9, 1, 0.9, 0.5],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    }, [animationValue]);

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Animated.View
                style={[
                    {
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    containerStyle,
                ]}
            >
                <Animated.Text
                    style={[{ fontSize: 15, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }]}
                >
                    {label}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ScrollWheel;

