// import React, { useState, useEffect } from 'react';
// import { View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
// import Input from '../Componentes/Input';
// import Botao from '../Componentes/Botao';
// import InputPago from '../Componentes/InputPago';
// import getRealm from '../Services/Realm';

// const PagarEditar = props =>{
//   const { navigation, route } = props;

//   const [ conta, setConta ] = useState(route.params.conta ? route.params.conta : {})

//   console.warn('conta', conta);

//   const onPressButtonExcluirEditar = async() => {
//     const realm = await getRealm();
//     if (route.params.tela === "Editar"){
//       //excluir
//       realm.write(() => {
//         realm.delete(realm.objectForPrimaryKey('Cadastro', conta.id));
//       });
//       navigation.navigate('AgendaContasPagar');
//     } 
//     if(!conta.pago && route.params.tela !== "Editar"){
//       //editar
//       console.log('conta', conta)
//       navigation.navigate('Editar',{conta: conta, tela: "Editar"});
//     }
//   }
  
//   const onPressButtonSalvarPagar = async() => {
//     const realm = await getRealm();

//     if (!conta.descricao || !conta.valor || !conta.data){
//       Alert.alert(
//         "Todos os dados são obrigatórios.",
//         "Verifique se preencheu todas.",
//         [
//           {
//             text: "Ok, entendi",
//             style: "cancel"
//           }
//         ]
//       );
//     } else {
//       if (conta.pago){
//         //update salvar
//         // const valorSemR$ = ;
//         // console.warn('valorSemR$', valorSemR$)
//         console.warn('conta.valor', conta.valor)
//         realm.write(() => {
//           const contaAtualiza = realm.objects("Cadastro")[conta.id - 1];
//           contaAtualiza.descricao = conta.descricao;
//           contaAtualiza.valor = parseFloat(conta.valor);
//           contaAtualiza.data = conta.data;
//           contaAtualiza.pago = conta.pago;
//         });
//       } else {
//         realm.write(() => {
//           //update pagar
//           realm.create('Cadastro', 
//           {
//             ...conta,
//             pago: !conta.pago
//           }, 
//           'modified')
//         });
//       }
//       navigation.goBack();
//     }
//   };

  
//   const onPressButtonSalvarPagar = async() => {
//     const realm = await getRealm();

//     if (!conta.descricao || !conta.valor || !conta.data){
//       Alert.alert(
//         "Todos os dados são obrigatórios.",
//         "Verifique se preencheu todas.",
//         [
//           {
//             text: "Ok, entendi",
//             style: "cancel"
//           }
//         ]
//       );
//     } else {
//       if (conta.pago){
//         //update salvar
//         // const valorSemR$ = ;
//         // console.warn('valorSemR$', valorSemR$)
//         console.warn('conta.valor', conta.valor.)
//         realm.write(() => {
//           const contaAtualiza = realm.objects("Cadastro")[conta.id - 1];
//           contaAtualiza.descricao = conta.descricao;
//           contaAtualiza.valor = parseFloat(conta.valor);
//           contaAtualiza.data = conta.data;
//           contaAtualiza.pago = conta.pago;
//         });
//       } else {
//         realm.write(() => {
//           //update pagar
//           realm.create('Cadastro', 
//           {
//             ...conta,
//             pago: !conta.pago
//           }, 
//           'modified')
//         });
//       }
//       navigation.goBack();
//     }
//   };

//   return(
//       <KeyboardAvoidingView 
//       // contentContainerStyle={styles.contentKeyBoard}
//       style={styles.contentKeyBoard}
//       // behavior={Platform.OS === "ios" ? "padding" : "height"}
//       behavior="padding"
//       >
//         {/* <ScrollView style={{backgroundColor: 'green', flex: 1}}> */}
//       <View style={styles.content}>
//        <View >
//         {conta.pago || route.params.tela === "Editar" ?
//           <>
//             <Input 
//               title="Título"
//               placeholder="Ex.: Aluguel"
//               autoCompleteType="name"
//               value={conta.descricao}
//               autoCapitalize="words"
//               onChangeText={ descricao => setConta({...conta, descricao}) }
//             />
//             <Input 
//               title="Valor"
//               placeholder="1000,00"
//               keyboardType="numeric"
//               value={conta.valor.toString()}
//               onChangeText={ valor => setConta({...conta, valor})}
//             />
//             <Input 
//               type={'datetime'}
//               options={{
//                 format: 'DD/MM/YYYY'
//               }}
//               title="Data de vencimento"
//               placeholder="dd/mm/aaaa"
//               keyboardType="numeric"
//               value={conta.data}
//               onChangeText={ data => setConta({...conta, data})}
//             />
//           </>
//           :
//           <>
//             <InputPago
//               title="Título"
//               value={conta.descricao}
//             />
//             <InputPago
//               title="Valor"
//               inputValor={true}
//               value={conta.valor}
//             />
//             <InputPago
//               title="Data de vencimento"
//               value={conta.data}
//             />
//           </>
//         }
//         </View>
//         <View style={styles.viewButton}>
//           <Botao
//             isPreenchido={false}
//             label={conta.pago || route.params.tela === "Editar" ? "Excluir" : "Editar"}
//             onPressButton={onPressButtonExcluirEditar}
//             style={{marginBottom: 20}}
//           />
//           <Botao
//             isPreenchido={true}
//             label={route.params.tela === "Editar" ? "Salvar" : "Pagar"}
//             onPressButton={onPressButtonSalvarPagar}
//           />
//         </View>
//       </View>
//       {/* </ScrollView> */}
//     </KeyboardAvoidingView>
//   )
// };

// const styles = {
//   contentKeyBoard:{
//     flex: 1,
//   },
//   content:{
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent:'space-between',
//   },
//   viewButton:{
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
// };

// export default PagarEditar;