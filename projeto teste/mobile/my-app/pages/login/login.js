import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Login</Text>
                <TextInput style={styles.input} placeholder='Email'></TextInput>
                <TextInput style={styles.input} placeholder='Senha'></TextInput>
                <TouchableOpacity style={styles.btn}>Login</TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        backgroundColor:'white',
        borderRadius:50,
        padding:5,
        margin:5,
    },
    btn:{
        backgroundColor:'blue',
        padding:5,
        margin:5,
        borderRadius:50,
        textAlign:'center',
    }
});