const AdminJS = require('adminjs');
const express = require('express');
const { User, name, image, price, description, payment } = require('./models'); // мои модели

const adminJs = new AdminJS({
  resources: [User, name, image, price, description, payment], // моите модели
  rootPath: '/admin',
});

module.exports = adminJs;

const { default: AdminJS } = require('adminjs');
const { User } = require('./models');

const aadminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
        },
        actions: {
          new: {
            before: async (request) => {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
              };
              return request;
            },
          },
        },
      },
    },
  ],
  rootPath: '/admin',
});

module.exports = adminJs;