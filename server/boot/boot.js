"use strict";

module.exports = async function(server) {
  await server.models.organisation.findOrCreate({where: {name: "gluon"}}, {
    "name": "gluon",
    "website": "http://glu-on.me",
  });
  await server.models.user.findOrCreate({where: {username: "su0"}}, {
    "realm": "admin",
    "username": "su0",
    "firstName": "Aleksandr",
    "lastName": "Vorontsov",
    "email": "admin@vorontsov.co.uk",
    "emailVerified": true,
    "password": "password",
  });
};
