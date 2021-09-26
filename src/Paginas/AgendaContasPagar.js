import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, KeyboardAvoidingView, Alert} from 'react-native';
import {ListItem, Button, Icon} from 'react-native-elements';
import Botao from '../Componentes/Botao';
import BotaoRedondo from '../Componentes/BotaoRedondo';
import InformePagarPago from '../Componentes/InformePagarPago';
import getRealm from '../Services/Realm';

const mesSelecionadoTitulo = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
   "Outubro",
   "Novembro",
   "Dezembro",
];

const AgendaContasPagar = props => {
  const {navigation, route} = props;
  const [cadastros, setCadastros] = useState([]);
  const [totalConta, setTotalConta] = useState(0);
  const [totalPago, setTotalPago] = useState(0);
  const [mesSelecionado, setMesSelecionado] = useState(
    moment()
  );
  const mesAtual = moment()
  const contasPagas = cadastros.filter(item => item.pago);

  const loadCadastros = async() => {
    const realm = await getRealm();
    const data = realm.objects('Cadastro').sorted('data', true);
    console.log('data', data)

    const contasAdaptada = data.map(item => {
      const dataVencimento = new Date(item.data).toLocaleDateString();
      const valorConta = item.valor.toFixed(2).replace('.', ',');

      return {
        id: item.id,
        descricao: item.descricao,
        valor: valorConta,
        pago: item.pago,
        data: dataVencimento,
      };
    });

    const dadosMesSelecionado = contasAdaptada.filter(item => {
      const monthDataVencimento = item.data.substr(3, 2);

      return monthDataVencimento == mesSelecionado;
    });

    setCadastros(dadosMesSelecionado);
  }

  useEffect(() => {
    loadCadastros();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      loadCadastros();
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    loadCadastros();
    props.navigation.setParams({ title:mesSelecionadoTitulo[mesSelecionado.get("months")] });
    }, [mesSelecionado])
   

  const getContasItem = ({item}) => {
    const onPressRow = itemSelecionado => {
      navigation.navigate('Editar', {conta: itemSelecionado});
    };

    const onPressDesfazerPagamento = async item => {
      const realm = await getRealm();

      realm.write(() => {
        realm.create(
          'Cadastro',
          {
            ...item,
            valor: +item.valor.replace(',', '.'),
            pago: false,
          },
          'modified',
        );
      });
      loadCadastros();
    };

    const onPressRealizarPagamento = async item => {
      const realm = await getRealm();

      realm.write(() => {
        realm.create(
          'Cadastro',
          {
            ...item,
            valor: +item.valor.replace(',', '.'),
            pago: true,
          },
          'modified',
        );
      });
      loadCadastros();
    };

    return (
      // <ListItem
      //   key={item.id}
      //   bottomDivider
      //   onPress={() => onPressRow(item)}
      // >
      //   <ListItem.Content style={styles.descricaoData}>
      //     <ListItem.Title> { item.descricao } </ListItem.Title>
      //     <ListItem.Subtitle> { item.data } </ListItem.Subtitle>
      //   </ListItem.Content>
      //   <ListItem.Content style={styles.valorPagarPago}>
      //     <ListItem.Title> { `R$ ${item.valor}` } </ListItem.Title>
      //       {/* <InformePagarPago
      //         label={item.pago ? "pago" : "pagar"}
      //         color={item.pago ?  "#1F8F0D" : "#B92626"}
      //       /> */}
      //       <ListItem.Title
      //         style={item.pago ? styles.buttonPago : styles.buttonPagar}
      //       >
      //         {item.pago ? "Pago" : "Pagar"}
      //       </ListItem.Title>
      //   </ListItem.Content>
      // </ListItem>
      <ListItem.Swipeable
        onPress={() => onPressRow(item)}
        left={null}
        rightContent={
          <Button
            title={item.pago ? 'Desfazer pagamento' : 'Realizar pagamento'}
            buttonStyle={{
              minHeight: '100%',
              backgroundColor: item.pago ? '#B92626' : '#1F8F0D',
            }}
            onPress={() =>
              item.pago
                ? onPressDesfazerPagamento(item)
                : onPressRealizarPagamento(item)
            }
          />
        }>
        <ListItem.Content style={styles.descricaoData}>
          <ListItem.Title> {item.descricao} </ListItem.Title>
          <ListItem.Subtitle> {item.data} </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={styles.valorPagarPago}>
          <ListItem.Title> {`R$ ${item.valor}`} </ListItem.Title>
          <InformePagarPago
            label={item.pago ? 'pago' : 'pagar'}
            color={item.pago ? '#1F8F0D' : '#B92626'}
          />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>

      // onPress={() => props.navigation(pago ? 'Pagar' : 'Editar')}
    );
  };

  const onPressButtonAdicionar = () => {
    navigation.navigate('Cadastro');
  };

  const onPressButtonMesAtual = () => {
    setMesSelecionado(mesAtual);
  }

  const onPressButtonMesAnterior = () => {
    mesSelecionado.subtract(1, "months");

    setMesSelecionado(moment(mesSelecionado));
  };

  const onPressButtonMesPosterior = () => {
    mesSelecionado.add(1, "months");
    setMesSelecionado(moment(mesSelecionado));

  };

  return (
    <KeyboardAvoidingView
      style={styles.contentKeyBoard}
      // behavior="position"
      // enabled
    >
      <View style={styles.content}>
        <View style={styles.headerContas}>
          <Text style={styles.contentContas}>
            {`${contasPagas.length} contas pagas`}
          </Text>
          <Text style={styles.contentContas}>
            {`R$ ${contasPagas.reduce(
              (previous, current) =>
                previous + +current.valor.replace(',', '.'),
              0,
            )}/R$ ${cadastros.reduce(
              (previous, current) =>
                previous + +current.valor.replace(',', '.'),
              0,
            )} `}
          </Text>
        </View>
        <FlatList
          data={cadastros}
          keyExtractor={conta => conta.id.toString()}
          renderItem={getContasItem}
        />
        <View style={styles.viewButton}>
          <BotaoRedondo
            label="<"
            onPressButton={onPressButtonMesAnterior}
          />
          {mesSelecionado === mesAtual ? <Botao
            widthFixo
            isPreenchido
            label="Adicionar conta a pagar"
            onPressButton={onPressButtonAdicionar}
          />
            :
            <Botao
              widthFixo
              isPreenchido
              label="Voltar ao mês atual"
              onPressButton={onPressButtonMesAtual}
            />
        }
          <BotaoRedondo
            label=">"
            onPressButton={onPressButtonMesPosterior}
          />
        </View>
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
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  headerContas: {
    paddingHorizontal: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContas: {
    color: '#747474',
    fontSize: 16,
  },
  viewButton: {
    // paddingHorizontal: 20,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',    
  },
  descricaoData: {
    width: '70%',
  },
  valorPagarPago: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPago: {
    display: 'flex',
    backgroundColor: '#1F8F0D',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonPagar: {
    backgroundColor: '#B92626',
  },
};

export default AgendaContasPagar;
