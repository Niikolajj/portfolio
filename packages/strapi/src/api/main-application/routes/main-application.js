'use strict';

/**
 * main-application router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::main-application.main-application');
