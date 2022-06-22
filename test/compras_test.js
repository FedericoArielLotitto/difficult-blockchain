const Compras = artifacts.require("Compras");

let compraContrato;

contract("Compras", async (accounts) => {
  before(async function () {
    compraContrato = await Compras.new();
  });

  describe("Dado un id de compra, obtiene la compra con ese id.", async () => {
    before("Obtiene la compra 1", async () => {
      await compraContrato.activar();
      await compraContrato.agregarCompra(accounts[1], 10, ["Chalosse", "Chantelley"]);
    });

    it("puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._id, 1, "Debería ser la primera");
    });
  });

  describe("Dada un contrato en estado activo, permite agregar compras.", async () => {
    before("Setea el estado.", async () => {
      await compraContrato.activar();
    });
    it("Agrega la compra.", async () => {
      await compraContrato.agregarCompra(accounts[1], 10, ["Chalosse", "Chantelley"]);
      const compraPersistida = await compraContrato.obtenerCompra(1);
      assert.equal(compraPersistida._id, 1);
    });
  });

  describe("Dado un contrato en estado activo, permite obtener una compra por su id.", async () => {
    before("Activa el estado ", async () => {
      await compraContrato.activar();
    });
    it("y puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._id, 1, "Debería ser la primera");
    });
  });

  // describe("Dado un contrato en estado lectura, permite obtener una compra por su id.", async () => {
  //   before("Activa el estado ", async () => {
  //     await compraContrato.habilitarConsultaCompras();
  //   });
  //   it("y puede obtener la compra.", async () => {
  //     const compraEsperada = await compraContrato.obtenerCompra(1);
  //     assert.equal(compraEsperada._id, 1, "Debería ser la primera");
  //   });
  // });

});

async function testRejection(callback, errorMessage) {
  try {
      await callback()
      assert.fail('Should have failed')
  } catch (e) {
      assert.equal(e.reason, errorMessage)
  }
}
