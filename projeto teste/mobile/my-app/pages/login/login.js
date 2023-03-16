import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const [email, setEmail] = useState('breno@gmail.com')
    const [senha, setSenha] = useState('123')

    let dados = {
        email: email,
        senha: senha
    }

    const userLogin = () => {
        fetch("http://10.87.207.14:3000/loginUser"
            , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
        )
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.result.email !== undefined) {
                    AsyncStorage.setItem('id', data.id_user)
                    navigation.navigate("Home")
                } else {
                    alert('Erro')
                }
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={{ uri: 'https://agrotekplus.com/images/Pic%2026.png' }}></Image>
                <Text style={styles.text}>Login</Text>
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(value) => { setEmail(value) }}
                ></TextInput>
                <TextInput style={styles.input} placeholder='Senha' value={senha} onChangeText={(value) => { setSenha(value) }}></TextInput>
                <TouchableOpacity style={styles.btn} onPress={() => { userLogin() }}>Login</TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#023E8A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 30,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        margin: 5,
    },
    btn: {
        backgroundColor: '#25E3A3',
        padding: 5,
        margin: 5,
        borderRadius: 50,
        textAlign: 'center',
    },
    image: {
        height: 300,
        width: 300
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
    }
});