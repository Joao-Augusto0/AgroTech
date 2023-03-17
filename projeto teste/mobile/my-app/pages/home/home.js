import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';


export default function Home({ navigation }) {

    const [Disponibilidade, setDisponibilidade] = useState([])
    const [Manutencao, setManutencao] = useState([])
    var dispo = ''
    var manu = ''

    useEffect(() => {
        fetch("http://192.168.0.4:3000/readVeiculo")
            .then(res => { return res.json() })
            .then(data => {
                setDisponibilidade(data)
            })
    })

    useEffect(() => {
        fetch("http://192.168.0.4:3000/readManutencao")
            .then(res => { return res.json() })
            .then(data => {
                setManutencao(data)
            })
    })

    Disponibilidade.map((e) => {
        if (e.ocupado == false) {
            dispo = 'disponivel'
        } else if (e.ocupado == true) {
            dispo = 'indisponivel'
        }

        Manutencao.map((e) => {
            console.log(e)
            if (e.data_fim == null) {
                manu = 'em manutenção'
            }
        })
    })

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Relatórios</Text>
            <View>
                <Text style={styles.subtitulo}>Disponibilidade</Text>
                <ScrollView style={styles.scroll1}>
                    {
                        Disponibilidade.map((e, index) => {
                            return (
                                <View style={styles.infoDispo}>
                                    <Text style={styles.texto}>{e.placa}</Text>
                                    <Text style={styles.texto}>{e.tipo}</Text>
                                    <Text style={styles.texto}>{dispo}</Text>
                                </View>
                            )
                        })
                    }

                </ScrollView>
            </View>
            <View>
                <Text style={styles.subtitulo}>Manutenção</Text>
                <ScrollView style={styles.scroll1}>
                    {
                        Manutencao.map((e) => {
                            var dateInicio = new Date(e.data_inicio);
                            let dataInicioFormatada = dateInicio.toLocaleDateString("pt-BR", {
                                timeZone: "UTC",
                            });
                            var dateFim = new Date(e.data_fim);
                            let dataFImFormatada = dateFim.toLocaleDateString("pt-BR", {
                                timeZone: "UTC",
                            });
                            return (
                                <View style={styles.infoDispo}>
                                    <Text style={styles.texto}>{e.placa}</Text>
                                    <Text style={styles.texto}>{dataInicioFormatada}</Text>
                                    <Text style={styles.texto}>{manu}</Text>
                                    <Text style={styles.texto}>{e.valor}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("Operação") }}><Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4103/4103111.png' }}></Image></TouchableOpacity>
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
    scroll1: {
        backgroundColor: 'white',
        height: 250,
        width: 400,
        margin: 20,
    },
    infoDispo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titulo: {
        fontSize: 30,
        margin: 10,
    },
    subtitulo: {
        fontSize: 25,
        textAlign: 'center'
    },
    image: {
        height: 30,
        width: 30
    },
    texto: {
        fontSize: 15
    }
});