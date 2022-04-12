
class ICAddress {
    id: number;
    streetNumber: number;
    streetName: string;
    address: string;
    addressUnit: string;
    city: string;
    zipCode: number;
    state: string;
    high: string;
    middle: string;
    elementary: string;
    notes: string;

    constructor(
        id: number,
        streetNumber: number,
        streetName: string,
        address: string,
        addressUnit: string,
        city: string,
        zipCode: number,
        state: string, 
        high: string,
        middle: string,
        elementary: string,
        notes: string
    ) {
        this.id = id;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.address = address;
        this.addressUnit = addressUnit;
        this.city = city;
        this.zipCode = zipCode;
        this.state = state;
        this.high = high;
        this.middle = middle;
        this.elementary = elementary;
        this.notes = notes;
    }

    expand = () => {
        
    }
}