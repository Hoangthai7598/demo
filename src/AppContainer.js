import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Modal,
    Button,
    View,
    Text,
} from 'react-native';
import moment from 'moment';
import ScrollWheel from './ScrollWheel';

const listMonth = Array.apply(0, Array(12)).map(function (_, i) { return moment().month(i).format('MM') })


const AppContainer = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [newDate, setNewDate] = useState(new Date());

    const getDaysArray = function (year, month) {
        const monthIndex = month; // 0..11 instead of 1..12
        let date = new Date(year, monthIndex, 1);
        let result = [];
        while (date.getMonth() == monthIndex) {
            result.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }
        return result;
    }
    const YEARS = () => {
        const years = []
        const dateStart = moment().add(-100, 'y')
        const dateEnd = moment().add('y')
        while (dateEnd.diff(dateStart, 'years') >= 0) {
            years.push(dateStart.format('YYYY'))
            dateStart.add(1, 'year')
        }
        return years
    }
    console.log('years', YEARS())

    console.log('{getDaysArray(newDate.getMonth(),newDate.getFullYear())}', getDaysArray(newDate.getFullYear(), newDate.getMonth()))

    return (
        <SafeAreaView style={styles.container}>
            <Button title='test' onPress={() => { setModalVisible(true) }} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Button title='Close' onPress={() => { setModalVisible(false) }} />
                        <ScrollWheel
                            listYear={YEARS()}
                            listDay={getDaysArray(newDate.getFullYear(), newDate.getMonth())}
                            listMonth={listMonth}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default AppContainer;
