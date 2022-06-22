const Compras = artifacts.require("Compras");

contract("Compras", function (accounts) {
  let compraContrato;
  let compraEsperada;

  before(async () => {
    compraContrato = await Compras.deployed();
  });

  describe("Dado un id de compra, ", async () => {
    it("se debe obtener una compra en ese id.", async () => { 
        await compraContrato.obtenerCompra(0);
        compraEsperada = accounts[0];
        assert.equal(compraEsperada._id, 0);
    });

  });

});
