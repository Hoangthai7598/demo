import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Modal,
    Button,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import ScrollWheel from './ScrollWheel';
import { COLORS } from './colors';

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
                        <ScrollWheel
                            listYear={YEARS()}
                            listDay={getDaysArray(newDate.getFullYear(), newDate.getMonth())}
                            listMonth={listMonth}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() => { setModalVisible(false) }} >
                            <Text style={styles.buttonText}>Huỷ</Text>
                        </TouchableOpacity>
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
        alignItems: "center",
        backgroundColor: '#75767b',
        justifyContent: 'flex-end'
    },
    modalView: {
        borderRadius: 20,
        marginHorizontal: 30,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: COLORS.purple,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 22,
        marginHorizontal: 16,
        marginTop: 40,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 15
    }
});

export default AppContainer;
