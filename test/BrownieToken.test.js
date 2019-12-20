const BrownieToken = artifacts.require("./BrownieToken.sol");

contract("BrownieToken", accounts => {
  describe("Constructor", () => {
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

  describe("trasfer function", () => {
    it("should throw error if tokens more than the balance are transfered", async () => {
      const instance = await BrownieToken.deployed();
      // const err = await instance.transfer(accounts[0], 10e5);
      try {
        await instance.transfer(accounts[0], 10e5);
        assert.fail();
      } catch (error) {
        assert.include(error.message, "Inadequate Balance");
      }
    });

    it("should transfer token", async () => {
      const instance = await BrownieToken.deployed();

      await instance.transfer(accounts[1], 100, { from: accounts[0] });
      const senderBalance = await instance.balanceOf(accounts[0]);
      const recieverBalance = await instance.balanceOf(accounts[1]);

      assert.equal(senderBalance.toNumber(), 900);
      assert.equal(recieverBalance.toNumber(), 100);
    });

    it("should emit 'Transfer' event", async () => {
      const instance = await BrownieToken.deployed();

      const reciept = await instance.transfer(accounts[1], 100, { from: accounts[0] });

      assert.equal(reciept.logs[0].event, "Transfer");
      assert.equal(reciept.logs[0].args._from, accounts[0]);
      assert.equal(reciept.logs[0].args._to, accounts[1]);
      assert.equal(reciept.logs[0].args._value, 100);
    });

    it("should return boolean value", async () => {
      const instance = await BrownieToken.deployed();
      const result = await instance.transfer.call(accounts[0], 100, { from: accounts[1] });
      assert.equal(result, true);
    });
  });

  describe("approve function", () => {
    it("should emit 'Approval' event", async () => {
      const instance = await BrownieToken.deployed();

      const reciept = await instance.approve(accounts[1], 100, { from: accounts[0] });

      assert.equal(reciept.logs[0].event, "Approval");
      assert.equal(reciept.logs[0].args._owner, accounts[0]);
      assert.equal(reciept.logs[0].args._spender, accounts[1]);
      assert.equal(reciept.logs[0].args._value, 100);
    });
    it("should return boolean", async () => {
      const instance = await BrownieToken.deployed();
      const result = await instance.approve.call(accounts[1], 100, { from: accounts[0] });

      assert.equal(result, true);
    });
    it("should set allowance", async () => {
      const instance = await BrownieToken.deployed();
      const allowance = await instance.allowance(accounts[0], accounts[1]);

      assert.equal(allowance.toNumber(), 100);
    });
  });
});
