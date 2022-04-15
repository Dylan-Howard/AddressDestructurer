"use strict";
/* eslint-disable import/extensions */
/* eslint-disable no-console */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const parse_1 = require("@fast-csv/parse");
const icAddress_1 = require("./icAddress");
const patterns_1 = require("./patterns");
function log(message) {
    console.log(message);
}
function getErrorMessage(error) {
    let message;
    if (error instanceof Error)
        message = error.message;
    else
        message = String(error);
    return message;
}
function addressGenerator(data) {
    const properties = Object.values(data);
    return new icAddress_1.ICAddress(properties[0], properties[2], properties[3], properties[4], properties[5], properties[6], properties[8], properties[12], properties[13], properties[14], properties[15], properties[16]);
}
function readCSV(dataDirectory, dataFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(path.resolve(dataDirectory, dataFile))
                .pipe((0, parse_1.parse)({ headers: true, maxRows: 12500 }))
                .on('error', reject)
                .on('data', (row) => data.push(addressGenerator(row)))
                .on('end', () => resolve(data));
        });
    });
}
function matchPattern(addr) {
    /* For transform group tagging */
    const match = patterns_1.patterns.find(({ expression }, _i) => {
        const test = expression.test(addr.getAddressUnit());
        if (test)
            addr.setTransformGroup(_i);
        return test;
    });
    log(match);
    if (!addr.getTransformGroup())
        addr.setTransformGroup(patterns_1.patterns.length + 1);
    /* For matching functionality */
    // const match = patterns.find(({ expression }) => expression.test(addr.getAddressUnit()));
    return match ? match.action.toString() : 'No known pattern was detected';
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = './data';
        const dataFile = 'address-import_22-02-10.csv';
        let addresses;
        const transformGroups = new Array(patterns_1.patterns.length + 1);
        for (let i = 0; i < transformGroups.length; i += 1) {
            transformGroups[i] = [];
        }
        const ignoreGroup = [];
        try {
            addresses = yield readCSV(dataDirectory, dataFile);
            log(`Read ${addresses.length} addresses`);
            addresses.forEach((addr) => {
                // log(addr.getNotes());
                /* If notes are included, this address is ignored */
                if (!addr.getNotes()) {
                    matchPattern(addr);
                    transformGroups[addr.getTransformGroup() - 1].push(addr);
                }
                else {
                    ignoreGroup.push(addr);
                }
            });
        }
        catch (err) {
            log(getErrorMessage(err));
        }
        finally {
            /* Logs totals */
            log('--- Group Totals ---');
            transformGroups.forEach((group, i) => {
                if (patterns_1.patterns[i])
                    log(`${patterns_1.patterns[i].action} : ${group.length}`);
                else
                    log(`Ungrouped : ${group.length}`);
            });
            log(`Abandonded addresses: ${ignoreGroup.length}\n`);
        }
    });
}
main();
