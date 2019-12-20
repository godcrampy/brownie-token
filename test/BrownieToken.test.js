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

  describe("transfer function", () => {
    it("should throw error if tokens more than the balance are transfered", async () => {
      const instance = await BrownieToken.deployed();
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

      const reciept = await instance.transfer(accounts[0], 100, { from: accounts[1] });

      assert.equal(reciept.logs[0].event, "Transfer");
      assert.equal(reciept.logs[0].args._from, accounts[1]);
      assert.equal(reciept.logs[0].args._to, accounts[0]);
      assert.equal(reciept.logs[0].args._value, 100);
    });

    it("should return boolean value", async () => {
      const instance = await BrownieToken.deployed();
      const result = await instance.transfer.call(accounts[1], 100, { from: accounts[0] });
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

  describe("transferFrom function", () => {
    it("should throw error if more than allowed tokens are transfered", async () => {
      const instance = await BrownieToken.deployed();
      try {
        await instance.transferFrom(accounts[0], accounts[1], 10);
        assert.fail();
      } catch (error) {
        assert.include(error.message, "Transfer not approved");
      }
    });
    it("should throw error if tokens more than balance are transfered", async () => {
      const instance = await BrownieToken.deployed();

      try {
        await instance.transferFrom(accounts[0], accounts[1], 2000);
        assert.fail();
      } catch (error) {
        assert.include(error.message, "Inadequate Balance");
      }
    });
    it("should transfer tokens", async () => {
      const instance = await BrownieToken.deployed();

      await instance.approve(accounts[1], 100, { from: accounts[0] });
      await instance.transferFrom(accounts[0], accounts[1], 100);
      const senderBalance = await instance.balanceOf(accounts[0]);
      const recieverBalance = await instance.balanceOf(accounts[1]);

      assert.equal(senderBalance.toNumber(), 900);
      assert.equal(recieverBalance.toNumber(), 100);
    });
    it("should update allowance", async () => {
      const instance = await BrownieToken.deployed();

      // transaction of the previous test
      const allowance = await instance.allowance(accounts[0], accounts[1]);
      assert.equal(allowance.toNumber(), 0);
    });
    it("should emit 'Transfer' event", async () => {
      const instance = await BrownieToken.deployed();
      await instance.approve(accounts[1], 100, { from: accounts[0] });
      const reciept = await instance.transferFrom(accounts[0], accounts[1], 100);

      assert.equal(reciept.logs[0].event, "Transfer");
      assert.equal(reciept.logs[0].args._from, accounts[0]);
      assert.equal(reciept.logs[0].args._to, accounts[1]);
      assert.equal(reciept.logs[0].args._value, 100);
    });
    it("should return boolean", async () => {
      const instance = await BrownieToken.deployed();
      await instance.approve(accounts[0], 100, { from: accounts[1] });
      const result = await instance.transferFrom.call(accounts[1], accounts[0], 100);

      assert.equal(result, true);
    });
  });
});
