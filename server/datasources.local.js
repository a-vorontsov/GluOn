"use strict";
const dataSources = require("./datasources.json");

if (process.env["PSQL_USERNAME"]) {
  let postgresql = dataSources["postgresql"] || {};
  dataSources["postgresql"] = Object.assign(
    postgresql,
    {
      username: process.env["PSQL_USERNAME"],
    }
  );
}

if (process.env["PSQL_PASSWORD"]) {
  let postgresql = dataSources["postgresql"] || {};
  dataSources["postgresql"] = Object.assign(
    postgresql,
    {
      password: process.env["PSQL_PASSWORD"],
    }
  );
}

if (process.env["PSQL_HOSTNAME"]) {
  let postgresql = dataSources["postgresql"] || {};
  dataSources["postgresql"] = Object.assign(
    postgresql,
    {
      host: process.env["PSQL_HOSTNAME"],
    }
  );
}

if (process.env["PSQL_GLUON_DB"]) {
  let postgresql = dataSources["postgresql"] || {};
  dataSources["postgresql"] = Object.assign(
    postgresql,
    {
      database: process.env["PSQL_GLUON_DB"],
    }
  );
}

module.exports = dataSources;
