import Realm from 'realm';
import CadastroSchema from '../Schemas/CadastroSchema';

export default function getRealm() {
  return Realm.open({
    path: "cadastroRealm",
    schema: [CadastroSchema],
  })
}