'use strict';

/**
 * language-value service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::language-value.language-value');
