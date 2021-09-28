import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import InputMask from '../Componentes/InputMask';
import Input from '../Componentes/Input';
import Botao from '../Componentes/Botao';
import getRealm from '../Services/Realm';
import moment from 'moment';

const Cadastro = props => {
  const {navigation} = props;

  const [conta, setConta] = useState({});
  const [error, setError] = useState(false);
  const [listaConta, setListaConta] = useState([]);

  const salvarCadastro = async () => {
    const realm = await getRealm();
    const cadastros = realm.objects('Cadastro');


    const idUltimoCadastro = cadastros.length > 0 ? cadastros[cadastros.length - 1].id : 1;
    const valorSemR$ = conta.valor
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.');

      console.log('listaConta', listaConta)
    const listaContaAdaptada = listaConta.map((item, index) => {
      return {
        id: idUltimoCadastro + index + 1,
        descricao: item.descricao,
        valor: parseFloat(valorSemR$),
        data: moment(item.data, "DD/MM/YYYY").format("MM/DD/YYYY"),
        pago: false,
      };
    });

    listaContaAdaptada.forEach(item => {
      realm.write(() => {
        realm.create('Cadastro', item);
      });
    });

    navigation.goBack();
  };

  const onPressButton = () => {
    if (
      !conta.descricao ||
      conta.valor > 0 ||
      conta.data === 0 ||
      conta.quantidade === 0 ||
      conta.quantidade === ''
    ) {
      Alert.alert(
        'Todos os dados são obrigatórios.',
        'Verifique se preencheu todos.',
        [
          {
            text: 'Ok, entendi',
            style: 'cancel',
          },
        ],
      );
    } else {
      const dataVencimentoCompletoTipoDate = getDadosData();

      for (let index = 0; index < conta.quantidade; index++) {
        const novaData = dataVencimentoCompletoTipoDate.add(1, "months").format("DD/MM/YYYY");

        listaConta.push({...conta, data: novaData});
      }

      salvarCadastro();
      setConta({});
      setError(false);
      Keyboard.dismiss();
    }
  };

  const getDadosData = () => {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDay();
    const mesAtual = dataAtual.getMonth()+1;
    const anoAtual = dataAtual.getFullYear();

    const mesComDiaVerificado =
      diaAtual > conta.data ? mesAtual + 1 : mesAtual;
   
    const dataVencimento = moment(`${conta.data}/${mesComDiaVerificado}/${anoAtual}`, "DD/MM/YYYY");

    return dataVencimento;
  };

  return (
    <KeyboardAvoidingView style={styles.contentKeyBoard}>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Input
              value={conta.descricao}
              title="Título"
              placeholder="Ex.: Aluguel"
              autoCompleteType="name"
              error={error}
              onChangeText={descricao => setConta({...conta, descricao})}
            />
            <InputMask
              value={conta.valor}
              title="Valor"
              type={'money'}
              placeholder="1000,00"
              keyboardType="numeric"
              onChangeText={valor => setConta({...conta, valor})}
            />
            <Input
              value={conta.data?.toString() || ""}
              title="Dia do vencimento"
              placeholder="Dia"
              error={error}
              onChangeText={dia => setConta({...conta, data: dia})}
              keyboardType="numeric"
            />
            <Input
              value={conta.quantidade?.toString() || ""}
              title="Quantidade de meses"
              placeholder="Quantidade"
              error={error}
              onChangeText={quantidade => setConta({...conta, quantidade})}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewButton}>
        <Botao
          isPreenchido={true}
          label="Adicionar conta a pagar"
          onPressButton={onPressButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  contentKeyBoard: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  viewButton: {
    paddingHorizontal: 20,
  },
};

export default Cadastro;
