const BrownieToken = artifacts.require("./BrownieToken.sol");

contract("BrownieToken", accounts => {
  it("should set total supply of tokens to 1000", async () => {
    const instance = await BrownieToken.deployed();

    const tokensSupply = await instance.totalSupply();
    assert.equal(tokensSupply, 1000);
  });
});
