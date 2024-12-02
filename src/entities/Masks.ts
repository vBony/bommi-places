import { tokens } from "maska"

// @ts-nocheck
class Masks {
    cpf = {mask: '###.###.###-##'}
    phone = {mask:'(##) #####-####'}
    hoursAndMinutes = {mask:'##:##'}
    money = {
        mask: "999#.##", 
        reversed: true, 
        tokens: {
            9:{
                repeated: true,
                pattern: /[0-9]/
            }
        }
    }
}

export default Masks