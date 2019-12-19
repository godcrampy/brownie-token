const BrownieToken = artifacts.require("BrownieToken");

module.exports = function(deployer) {
  deployer.deploy(BrownieToken);
};
