const BrownieToken = artifacts.require("BrownieToken");
const TokenSale = artifacts.require("TokenSale");

module.exports = function(deployer) {
  deployer.deploy(BrownieToken).then(() => {
    return deployer.deploy(TokenSale, BrownieToken.address, 1e15);
  });
};
