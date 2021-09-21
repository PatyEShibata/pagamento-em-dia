export default class CadastroSchema{
  static schema = {
    name: 'Cadastro',
    primaryKey: 'id',
    properties:{
      id: 'int',
      descricao: 'string',
      valor: 'double',
      data: 'date',
      pago: 'bool'
    }
  }
}