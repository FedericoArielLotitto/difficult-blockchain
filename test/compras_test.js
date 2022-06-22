const Compras = artifacts.require("Compras");

contract("Compras", function (accounts) {
  let compraContrato;
  let compraEsperada;

  before(async () => {
    compraContrato = await Compras.new();
    compraContrato.agregarCompras(accounts[0], 100, ["Chalosse", "Chantelley"]);
  });

  describe("Dado un id de compra, ", async () => {
    compraEsperada = await compraContrato.obtenerCompra(0);
    assert.equal(compraEsperada._id, 0);
  });

});
