import DocumentMixin from '@/mixins/DocumentMixin'
import {Vue} from 'vue-class-component'
class Login extends Vue {
    public dm = new DocumentMixin()
    public user = {
        usu_email: null,
        usu_senha: null,
    }

    login(){
        console.log('Logou');
        
    }

}
export default Login