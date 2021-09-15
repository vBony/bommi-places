import $ from 'jquery'
import axios from 'axios';

class DocumentMixin {
  getUrlServer(){
    const url = window.location.hostname;
    
    if(url != 'localhost'){
      return 'https://api.ubarber.com.br/'
    }else {
      return 'http://localhost:8012/'
    }
  }
}

export default DocumentMixin
