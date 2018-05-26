'use strict';

// external imports

// local imports
const i18nHelpers = require('./src/helpers/general/i18n_helpers');
const utilityHelpers = require('./src/helpers/general/utility_helpers');

// exports
module.exports.formatMessages = i18nHelpers.formatMessages;

module.exports.isCanBeEmpty = utilityHelpers.isCanBeEmpty;
module.exports.isNullOrUndefined = utilityHelpers.isNullOrUndefined;
module.exports.isNotNullOrUndefined = utilityHelpers.isNotNullOrUndefined;
module.exports.isNotNil = utilityHelpers.isNotNil;
module.exports.isNotEmpty = utilityHelpers.isNotEmpty;