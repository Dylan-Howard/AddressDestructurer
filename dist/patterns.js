"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patterns = void 0;
// eslint-disable-next-line import/prefer-default-export
exports.patterns = [
    /* Blank address unit */
    {
        expression: /^[^a-z0-9]/i,
        action: 'do nothing',
    },
    /* Single mixed id (e.g., 1A) */
    {
        expression: /^(\d|[a-z])+$/i,
        action: 'leave this mixed appartment id',
    },
    /* Single apprtment letter or number id (e.g., APT 1, APT A) */
    {
        expression: /^(APT|SUITE|LOT|UNIT|BUILDING|TRAILER|GARAGE BUILDING)\s*(\d|[a-z])+$/i,
        action: 'leave this appartment number',
    },
    /* Single hyphenated apprtment letter or number id (e.g., APT A-100) */
    {
        expression: /^(APT|SUITE|LOT|UNIT|BUILDING|TRAILER|GARAGE BUILDING)\s*(\d|[a-z])+-\d+$/i,
        action: 'leave this appartment number',
    },
    /* Single mixed appartment id (e.g., APT A1) */
    {
        expression: /^(APT|SUITE|LOT|UNIT|BUILDING)\s*([a-z]|\d)+$/i,
        action: 'leave this mixed appartment id',
    },
    /* Single mixed appartment id with parenthetical (e.g., "APT 1A (Upstairs)") */
    {
        expression: /^(APT|SUITE|LOT|UNIT)\s*([a-z]|\d)+\s*(.+)$/i,
        action: 'leave this mixed appartment id',
    },
    /* Multiple ids (e.g., 1-2, A-B) */
    {
        expression: /^(\d|[a-z])+-(\d|[a-z])+$/i,
        action: 'expand these ids',
    },
    /* Multiple simple apprtment letters (e.g., APT A-D, APT 1-4) */
    {
        expression: /^(APT|APTS|SUITE|LOT|UNIT)\s*([a-z]|\d+)\s*-\s*(APT|SUITE|LOT|UNIT)\s*([a-z]|\d+)$/i,
        action: 'expand these apartment letters',
    },
    /* Multiple mixed apprtment ids (e.g., APT A1-A6) */
    {
        expression: /^(APT|SUITE|LOT|UNIT)\s*[a-z]\d+\s*-\s*(APT|SUITE|LOT|UNIT)\s*[a-z]\d+$/i,
        action: 'expand these mixed appartment ids',
    },
    /* Multiple mixed apprtment ids (e.g., APT 1A-1D) */
    {
        expression: /^(APT|SUITE|LOT|UNIT)\s*\d+[a-z]\s*-\s*(APT|SUITE|LOT|UNIT)\s*\d+[a-z]$/i,
        action: 'expand these mixed appartment ids',
    },
    /* Groups of simple appartment numbers (e.g., "APT 1, APT A") */
    {
        expression: /^((APT|SUITE|LOT|UNIT)\s*(\d+|[a-z])+(;|,))+\s+(APT|SUITE|LOT|UNIT)\s*(\d+|[a-z])+$/i,
        action: 'split these groups, then leave these mixed appartment id',
    },
    /* Groups of multiple appartment numbers (e.g., "APT 1 - APT 4, APT 6 - APT 9") */
    {
        expression: /^(((APT|SUITE|LOT|UNIT)\s*\d+\s*-\s*(APT|SUITE|LOT|UNIT)\s*\d+(;|,| AND)\s+)+(APT|SUITE|LOT|UNIT) \d+ - (APT|SUITE|LOT|UNIT) \d+)$/i,
        action: 'split these groups, then expand these multiple appartment numbers',
    },
];
