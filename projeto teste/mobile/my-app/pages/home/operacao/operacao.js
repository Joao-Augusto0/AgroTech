import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';


export default function Operacao({ navigation }) {

    return (

        <View style={styles.container}>
            <Text>Atualizar Disponibilidade</Text>
            <View>
                <Text>Operação</Text>
            </View>
            <View>
                <Text>Manutenção</Text>
            </View>
        </View>
    )
}

//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CAF0F8',
        alignItems: 'center',
    },

});