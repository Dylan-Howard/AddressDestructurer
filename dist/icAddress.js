"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICAddress = void 0;
// eslint-disable-next-line import/prefer-default-export
class ICAddress {
    constructor(id, streetNumber, streetName, address, addressUnit, city, zipCode, state, high, middle, elementary, notes) {
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
        this.transformGroup = 0;
    }
    setTransformGroup(groupId) {
        this.transformGroup = groupId;
        return this;
    }
    getTransformGroup() {
        return this.transformGroup;
    }
    getAddressUnit() {
        return this.addressUnit;
    }
    getNotes() {
        return this.notes;
    }
    /** @todo Finish expansion process */
    getExpanded() {
        const testExp = /^(APT|APTS|SUITE|LOT|UNIT)\s*\d+\s*-\s*(APT|SUITE|LOT|UNIT)\s*\d+$/i;
        if (testExp.test(this.addressUnit)) {
            // do something
            const expandedAddresses = [];
            expandedAddresses.push(this);
            expandedAddresses.push(this);
            return expandedAddresses;
        }
        return [this];
    }
}
exports.ICAddress = ICAddress;
