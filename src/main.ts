/* eslint-disable import/extensions */
/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@fast-csv/parse';
import { ICAddress } from './icAddress';
import { patterns } from './patterns';

function log(message: any): void {
  console.log(message);
}

function getErrorMessage(error: unknown) : string {
  let message: string;
  if (error instanceof Error) message = error.message;
  else message = String(error);

  return message;
}

function addressGenerator(data: object) : ICAddress {
  const properties = Object.values(data);

  return new ICAddress(
    properties[0],
    properties[2],
    properties[3],
    properties[4],
    properties[5],
    properties[6],
    properties[8],
    properties[12],
    properties[13],
    properties[14],
    properties[15],
    properties[16],
  );
}

async function readCSV(dataDirectory: string, dataFile: string) : Promise<ICAddress[]> {
  return new Promise((resolve, reject) => {
    const data: ICAddress[] = [];

    fs.createReadStream(path.resolve(dataDirectory, dataFile))
      .pipe(parse({ headers: true, maxRows: 12500 }))
      .on('error', reject)
      .on('data', (row) => data.push(addressGenerator(row)))
      .on('end', () => resolve(data));
  });
}

function matchPattern(addr: ICAddress): string {
  /* For transform group tagging */
  const match = patterns.find(({ expression }, _i) => {
    const test = expression.test(addr.getAddressUnit());
    if (test) addr.setTransformGroup(_i);
    return test;
  });
  log(match);

  if (!addr.getTransformGroup()) addr.setTransformGroup(patterns.length + 1);

  /* For matching functionality */
  // const match = patterns.find(({ expression }) => expression.test(addr.getAddressUnit()));
  return match ? match.action.toString() : 'No known pattern was detected';
}

async function main(): Promise<void> {
  const dataDirectory = './data';
  const dataFile = 'address-import_22-02-10.csv';

  let addresses: ICAddress[];

  const transformGroups = new Array<Array<ICAddress>>(patterns.length + 1);
  for (let i = 0; i < transformGroups.length; i += 1) {
    transformGroups[i] = [];
  }
  const ignoreGroup: ICAddress[] = [];

  try {
    addresses = await readCSV(dataDirectory, dataFile);

    log(`Read ${addresses.length} addresses`);

    addresses.forEach((addr) => {
      // log(addr.getNotes());
      /* If notes are included, this address is ignored */
      if (!addr.getNotes()) {
        matchPattern(addr);
        transformGroups[addr.getTransformGroup() - 1].push(addr);
      } else {
        ignoreGroup.push(addr);
      }
    });
  } catch (err) {
    log(getErrorMessage(err));
  } finally {
    /* Logs totals */
    log('--- Group Totals ---');
    transformGroups.forEach((group, i) => {
      if (patterns[i]) log(`${patterns[i].action} : ${group.length}`);
      else log(`Ungrouped : ${group.length}`);
    });
    log(`Abandonded addresses: ${ignoreGroup.length}\n`);
  }
}

main();
