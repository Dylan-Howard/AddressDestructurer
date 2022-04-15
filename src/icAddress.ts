// eslint-disable-next-line import/prefer-default-export
export class ICAddress {
  private id: number;

  private streetNumber: number;

  private streetName: string;

  private address: string;

  private addressUnit: string;

  private city: string;

  private zipCode: number;

  private state: string;

  private high: string;

  private middle: string;

  private elementary: string;

  private notes: string;

  private transformGroup: number;

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
    notes: string,
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
    this.transformGroup = 0;
  }

  public setTransformGroup(groupId: number) : ICAddress {
    this.transformGroup = groupId;

    return this;
  }

  public getTransformGroup() : number {
    return this.transformGroup;
  }

  public getAddressUnit() : string {
    return this.addressUnit;
  }

  public getNotes() : string {
    return this.notes;
  }

  /** @todo Finish expansion process */
  public getExpanded() : ICAddress[] {
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
