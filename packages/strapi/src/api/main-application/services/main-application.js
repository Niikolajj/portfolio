'use strict';

/**
 * main-application service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::main-application.main-application');
