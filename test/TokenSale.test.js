const TokenSale = artifacts.require("./TokenSale.sol");

contract("TokenSale", accounts => {
  describe("Constructor", () => {
    it("should have an address", async () => {
      const instance = await TokenSale.deployed();
      assert.notEqual(await instance.address, 0x0);
    });

    it("shoud have a token contract", async () => {
      const instance = await TokenSale.deployed();
      assert.notEqual(await instance.token(), 0x0);
    });

    it("should have a token price", async () => {
      const instance = await TokenSale.deployed();
      assert.equal(await instance.tokenPrice(), 1e15);
    });
  });
});
