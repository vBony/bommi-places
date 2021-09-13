import System from '@/entities/System';
import $ from 'jquery'
import axios from 'axios';

class DocumentMixin {
  public System = new System()
  
  string_to_slug(str:string):string {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();
    
      // remove accents, swap ñ for n, etc
      const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaaaeeeeiiiioooouuuunc------";
    
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }
    
      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes
    
      return str;
  }

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
