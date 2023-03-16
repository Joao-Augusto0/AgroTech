import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default function Home() {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['head'],
            tableData: ['1']
        }
    }

    render() {

        const state = this.state
        return (

            <View style={styles.container}>
                <Table>
                    <Row data={state.tableHead}></Row>
                    <Row data={state.tableData}></Row>
                </Table>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CAF0F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        margin: 5,
    }
});