const Compras = artifacts.require("Compras");

let compraContrato;

contract("Compras", async (accounts) => {
  before(async function () {
    compraContrato = await Compras.new();
  });

  describe("Dado un id de compra, obtiene la compra con ese id.", async () => {
    before("Obtiene la compra 0", async () => {
      // await compraContrato.agregarCompra(accounts[0], 10, ["Chalosse", "Chantelley"]);
      await compraContrato.agregarCompra(accounts[1], 10, ["Chalosse", "Chantelley"]);
    });

    it("puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._id, 1, "Debería ser la primera");
    });
  });
});
