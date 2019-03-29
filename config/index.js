'use strict';
const config = require('./configuration');

/**
 * Gets the current application configuration from configuration.json
 * 
 * @return {Object} The current configuration.
 */
function get() {
    return JSON.parse(JSON.stringify(config));
}

module.exports = {
    get
};