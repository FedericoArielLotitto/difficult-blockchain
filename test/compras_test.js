const ComprasTest = artifacts.require("ComprasTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ComprasTest", function (/* accounts */) {
  it("should assert true", async function () {
    await ComprasTest.deployed();
    return assert.isTrue(true);
  });
});
