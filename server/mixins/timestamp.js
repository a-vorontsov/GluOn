"use strict";

module.exports = function(Model, options) {
  if (options.created) {
    Model.defineProperty("created", {type: Date, default: "$now"});
  }
  if (options.modified) {
    Model.defineProperty("modified", {type: Date, default: "$now"});
  }
};
