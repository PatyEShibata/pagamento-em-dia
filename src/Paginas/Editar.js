import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Input from '../Componentes/Input';
import Botao from '../Componentes/Botao';
import getRealm from '../Services/Realm';

const PagarEditar = props => {
  const {navigation, route} = props;

  const [conta, setConta] = useState(
    route.params.conta ? route.params.conta : {},
  );

  console.warn('conta', conta);

  const onPressButtonSalvar = async () => {
    const realm = await getRealm();

    if (!conta.descricao || !conta.valor || !conta.data) {
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
      realm.write(() => {
        realm.create(
          'Cadastro',
          {
            ...conta,
            valor: +conta.valor.replace(',', '.'),
          },
          'modified',
        );
      });
      navigation.goBack();
    }
  };

  const onPressButtonExcluir = async () => {
    Alert.alert(
      'Ao excluir não poderá recuperá-lo.',
      `Deseja realmente excluir a conta ${conta.descricao}?`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Ok, excluir',
          onPress: () => excluirConta(),
        },
      ],
    );
  };

  const excluirConta = async () => {
    const realm = await getRealm();
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Cadastro', conta.id));
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.contentKeyBoard}>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Input
              title="Título"
              placeholder="Ex.: Aluguel"
              autoCompleteType="name"
              value={conta.descricao}
              autoCapitalize="words"
              onChangeText={descricao => setConta({...conta, descricao})}
            />
            <Input
              title="Valor"
              placeholder="1000,00"
              keyboardType="numeric"
              value={conta.valor.toString()}
              onChangeText={valor => setConta({...conta, valor})}
            />
            <Input
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              title="Data de vencimento"
              placeholder="dd/mm/aaaa"
              keyboardType="numeric"
              value={conta.data}
              onChangeText={data => setConta({...conta, data})}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewButton}>
        <Botao
          isPreenchido={false}
          label={'Excluir'}
          onPressButton={onPressButtonExcluir}
        />
        <Botao
          isPreenchido={true}
          label={'Salvar'}
          onPressButton={onPressButtonSalvar}
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  viewButton: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
};

export default PagarEditar;
