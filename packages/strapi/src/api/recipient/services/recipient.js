'use strict';

/**
 * recipient service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recipient.recipient');
