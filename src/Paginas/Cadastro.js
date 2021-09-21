import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import InputMask from '../Componentes/InputMask';
import Input from '../Componentes/Input';
import Botao from '../Componentes/Botao';
import getRealm from '../Services/Realm';

const Cadastro = props =>{
  const { navigation } = props;
  const ref_inputValor = React.createRef();
  const ref_inputData = React.createRef();
  // console.log('ref_inputValor', ref_inputValor)

  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]

  const [ conta, setConta ] = useState({});
  const [ error, setError ] = useState(false);
  const [ quantidade, setQuantidade ] = useState(1);

  async function salvarCadastro(){
    const cadasotrosRealm = await getRealm();
    const realm = await getRealm();
    const cadastros = cadasotrosRealm.objects('Cadastro');
    
    const idUltimoCadastro = cadastros[cadastros.length - 1].id;
    const valorSemR$ = conta.valor.replace('R$', '').replace('.', '').replace(',', '.');
    console.log('>>>>>>>>>>>',conta.data)
    const data = {
      id: idUltimoCadastro+1,
      descricao: conta.descricao,
      valor: parseFloat(valorSemR$),
      data: conta.data,
      pago: false
    };

    realm.write(() => {
      realm.create('Cadastro', 
      data
      )
    });

    navigation.goBack();
  };

  const addMonths = (date, months) =>  {
    console.log('date', date)
    console.log('months', months)
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    console.log('date', date)
    return date;
}
  
  const onPressButton = async () => {
    console.log('conta', conta)
    console.log('quantidade', quantidade)
    if (!conta.descricao || conta.valor > 0 || !conta.data || quantidade === 0 || quantidade === ""){
      Alert.alert(
        "Todos os dados são obrigatórios.",
        "Verifique se preencheu todos.",
        [
          {
            text: "Ok, entendi",
            style: "cancel"
          }
        ]
      );
    } else {
      const data = new Date(conta.data)

      for (let index = 0; index < quantidade; index++) {
        let novaData = addMonths(data, index);
        conta.data = novaData;
        salvarCadastro();
      }
      console.log('quantidade', quantidade)
      setConta({});
      setError(false);
      Keyboard.dismiss();
    }
  };

  const _goNextAfterEdit = (index) => {
    console.log('index', index);
    console.log('inputref[1]', inputRefs[1])
    if(index < inputRefs.length) {
      inputRefs[index+1].focus()
    }
  }

  return(
      <KeyboardAvoidingView 
      style={styles.contentKeyBoard}
      >
      <View style={styles.content}>
        <ScrollView>
        <View> 
          <Input 
            value={conta.descricao}
            title="Título"
            placeholder="Ex.: Aluguel"
            autoCompleteType="name"
            error={error}
            onChangeText={ descricao => setConta({...conta, descricao})}
            // returnKeyType="next"
            // onSubmitEditing={() => _goNextAfterEdit(0)}
            // onSubmitEditing={() => ref_inputValor.current.focus()}
            // autoFocus={true}
            // returnKeyType={"next"}
            // blurOnSubmit={false}
          />
          <InputMask 
            value={conta.valor}
            title="Valor"
            type = { 'money' } 
            placeholder="1000,00"
            keyboardType="numeric"
            onChangeText={ valor => setConta({...conta, valor })}
            // ref={r => inputRefs[0] =  r}  
            // onSubmitEditing={() => _goNextAfterEdit(1)}          
            // returnKeyType="next"
            // ref={ref_inputValor}
            // onSubmitEditing={() => ref_inputData.current.focus()}
          />
          <InputMask 
            value={conta.data}
            title="Data de vencimento"
            type={'datetime'}
            options={{
              format: 'DD/MM/YY'
            }}
            placeholder="dd/mm/aa"
            onChangeText={ data => setConta({...conta, data})}
            // ref={r => inputRefs[1] =  r}
            // ref={ref_inputData}
            // onSubmitEditing={() => salvarCadastro()}
          />
          <Input 
            value={quantidade}
            title="Quantidade de meses"
            placeholder="1"
            error={error}
            onChangeText={ quantidade => setQuantidade(quantidade) }
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
  )
};

const styles = {
  contentKeyBoard:{
    flex: 1,
  },
  content:{
    flex: 1,
    padding: 20,
    justifyContent:'space-between',
  },
  viewButton:{
    paddingHorizontal: 20,
  },
};

export default Cadastro;