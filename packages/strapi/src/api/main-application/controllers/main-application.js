'use strict';

/**
 *  main-application controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::main-application.main-application');
