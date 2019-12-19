const BrownieToken = artifacts.require("./BrownieToken.sol");

contract("BrownieToken", accounts => {
  it("should set total supply of tokens to 1000", async () => {
    const instance = await BrownieToken.deployed();

    const tokensSupply = await instance.totalSupply();

    assert.equal(tokensSupply, 1000);
  });

  it("should allocate all the tokens to contract deployer", async () => {
    const instance = await BrownieToken.deployed();

    const deployerBalance = await instance.balanceOf(accounts[0]);
    const otherBalance = await instance.balanceOf(accounts[1]);

    assert.equal(deployerBalance, 1000);
    assert.equal(otherBalance, 0);
  });

  it("should set name, symbol and decimals options", async () => {
    const instance = await BrownieToken.deployed();

    const name = await instance.name();
    const symbol = await instance.symbol();
    const decimals = await instance.decimals();

    assert.equal(name, "Brownie Token");
    assert.equal(symbol, "BRWN");
    assert.equal(decimals, 10);
  });
});
