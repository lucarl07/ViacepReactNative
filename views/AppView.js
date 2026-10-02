import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import buscarCep from "../api/buscarCep";

export default function AppView() {
	const [cep, setCep] = useState('');
	const [dados, setDados] = useState(null)
	const [erroNaBusca, setErroNaBusca] = useState(null)
	const inputRef = useRef(null)

	async function buscar() {
		try {
			const _dados = await buscarCep(cep)
			setDados(_dados)
		} catch (e) {
			setErroNaBusca(e.message)
		}
	}

	function limpar() {
		setCep('')
		setDados(null)
		inputRef.current.focus()
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar />
			<View style={{alignItems: 'center'}}>
				<Text style={styles.texto}>DIGITE O CEP DESEJADO: </Text>
				<TextInput
					ref={inputRef}
					style={styles.input}
					placeholder="Digite o CEP"
					value={cep}
					onChangeText={setCep}
					keyboardType='numeric'
					maxLength={8}
				/>

				<View style={styles.areaBtn}>
					<TouchableOpacity style={[styles.botao,{backgroundColor: '#1d75cd'}]} onPress={buscar}>
						<Text style={styles.textoBotao}>BUSCAR</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.botao,{backgroundColor: '#ff0000'}]} onPress={limpar}>
						<Text style={styles.textoBotao}>LIMPAR</Text>
					</TouchableOpacity>
				</View>

				{(dados !== null && erroNaBusca == null) && (
					<View style={styles.resultado}>
						<Text style={styles.textoResultado}>CEP: {dados.cep}</Text>
						<Text style={styles.textoResultado}>Logradouro: {dados.logradouro}</Text>
						<Text style={styles.textoResultado}>Bairro: {dados.bairro}</Text>
						<Text style={styles.textoResultado}>Cidade: {dados.cidade}</Text>
						<Text style={styles.textoResultado}>UF: {dados.uf}</Text>
					</View>
				)}
				{erroNaBusca !== null && (
					<View style={styles.resultado}>
						<Text style={styles.textoResultado}>{erroNaBusca}</Text>
					</View>
				)}
			</View>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000'
	},
	texto:{
		color: '#fff',
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	input: {
		color: '#111',
		fontSize: 18,
		width: '80%',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		padding: 10,
		marginVertical: 10,
		backgroundColor: '#fff',
	},
	areaBtn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginTop: 20,
	},
	botao:{
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: '48%',
	},
	textoBotao:{
		color: '#000',
		fontSize: 18,
	},
	resultado:{
		marginTop: 20,
		padding: 10,
		width: '80%',
		alignItems: 'center',
	},
	textoResultado:{
		color: '#fff',
		fontSize: 18,
		marginBottom: 10,
	}
});