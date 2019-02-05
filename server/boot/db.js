"use strict";

module.exports = async function(server) {
  await server
    .dataSources
    .postgresql
    .autoupdate();
};
