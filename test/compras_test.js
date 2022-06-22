const Compras = artifacts.require("Compras");

contract("Compras", function (accounts) {
  let compraContrato;
  let compraEsperada;

  beforeEach('initialized', async () => {
    compraContrato = await Compras.new();
    compraContrato.agregarCompras(accounts[0], 100, ["Chalosse", "Chantelley"]);
  });

  describe("Dado un id de compra, ", async () => {
    it("obtiene la compra en ese id."), async () => {
      compraEsperada = await compraContrato.obtenerCompra(0);
      assert.equal(compraEsperada._id, 0);
    };
  });

});
