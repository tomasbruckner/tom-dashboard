'use strict';

const Hash = use('Hash');

const UserHook = exports = module.exports = {};

UserHook.hashPassword = async (modelInstance) => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password);
  }
};
