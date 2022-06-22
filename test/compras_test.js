const Compras = artifacts.require("Compras");

contract("Compras", function (accounts) {
  let compraContrato;

  before(async function () {
    compraContrato = await Compras.new();
    await compraContrato.agregarCompra(accounts[0], 100, ["Chalosse", "Chantelley"]);
  });

  it("Dado un id de compra, obtiene la compra en ese id."), async () => {
    const compraEsperada = await compraContrato.obtenerCompra(0);
    assert.equal(compraEsperada._id, 0);
  };

});
