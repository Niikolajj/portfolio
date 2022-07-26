'use strict';

/**
 * cover-letter service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cover-letter.cover-letter');
