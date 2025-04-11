import PlaceAddress from "./PlaceAddress"

// @ts-nocheck
class Place {
    id = ""
    idEmployee = ""
    name = ""
    phoneNumber = ""
    idCategory = ""
    cnpj = ""
    hasCnpj = ""
    avatar = ""
    address = new PlaceAddress()
}

export default Place