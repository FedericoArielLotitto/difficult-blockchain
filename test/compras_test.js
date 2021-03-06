const Compras = artifacts.require("Compras");

let compraContrato;

contract("Compras", async (accounts) => {
  before(async function () {
    compraContrato = await Compras.new();
  });

  describe("Dado un id de compra, obtiene la compra con ese id.", async () => {
    before("Obtiene la compra 1", async () => {
      await compraContrato.activar();
      await compraContrato.agregarCompra([accounts[1], 100], 10, ["Chalosse", "Chantelley"]);
    });

    it("puede obtener la compra.", async () => {
      await compraContrato.habilitarConsultaCompras();
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._idCompra, 1, "Debería ser la primera");
    });
  });

  describe("Dada un contrato en estado activo, permite agregar compras.", async () => {
    before("Setea el estado.", async () => {
      await compraContrato.activar();
    });
    it("Agrega la compra.", async () => {
      await compraContrato.agregarCompra([accounts[1], 100], 10, ["Chalosse", "Chantelley"]);
      const compraPersistida = await compraContrato.obtenerCompra(1);
      assert.equal(compraPersistida._idCompra, 1);
    });
  });

  describe("Dado un contrato en estado activo, permite obtener una compra por su id.", async () => {
    before("Activa el estado ", async () => {
      await compraContrato.activar();
    });
    it("y puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._idCompra, 1, "Debería ser la primera");
    });
  });

  describe("Dado un contrato en estado lectura, permite obtener una compra por su id.", async () => {
    before("Activa el estado ", async () => {
      await compraContrato.habilitarConsultaCompras();
    });
    it("y puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(1);
      assert.equal(compraEsperada._idCompra, 1, "Debería ser la primera");
    });
  });

  // describe("Dado un contrato en estado bootstrap, no permite consultar compras por su id.", async () => {
  //   before("Bootstrapea el estado.", async () => {
  //     await compraContrato.habilitarAgregarCompras();
  //   });
  //   it("y lanza error.", async () => {
  //     testRejection(async () => { await compraContrato.obtenerCompra(1) }, 'Solo puede consultar compras.');
  //   });
  // });

  // describe("Dado un contrato en estado lectura, no permite agregar compras.", async () => {
  //   before("Cambia el estado a lectura.", async () => {
  //     await compraContrato.habilitarConsultaCompras();
  //   });
  //   it("y lanza error.", async () => {
  //     testRejection(async () => { await compraContrato.agregarCompra(accounts[1], 10, ["Chalosse", "Chantelley"]) }, 'Solo puede agregar compras.');
  //   });
  // });

  describe("Dado un contrato con 3 compras de 12, 25 y 33 de importe.", async () => {
    before("el promedio es 23.33.", async () => {
      compraContrato = await Compras.new();
      await compraContrato.activar();
      await compraContrato.agregarCompra([accounts[1], 100], 12, ["Chalosse", "Chantelley"]);
      await compraContrato.agregarCompra([accounts[1], 100], 25, ["Chalosse", "Chantelley"]);
      await compraContrato.agregarCompra([accounts[1], 100], 33, ["Chalosse", "Chantelley"]);
    });
    it("retorna el promedio.", async () => {
      const promedioEsperado = await compraContrato.calcularPromedio(accounts[1]);
      assert.equal(promedioEsperado.toString(), String(23));
    });
  });

  describe("Dado un usuario sin saldo, puede agregar el propio usuario.", async () => {
    it("Agrega saldo.", async () => {
      await compraContrato.agregarUsuario(accounts[2], 0);
      await compraContrato.agregarSaldo(100, accounts[2]);
      const usuario = await compraContrato.obtenerUsuario(accounts[2])
      assert.equal(usuario.saldo, 100);
    });
  });

});

async function testRejection(callback, errorMessage) {
  try {
      await callback()
      assert.fail('Should have failed')
  } catch (e) {
      console.log(e);
      assert.equal(e.reason, errorMessage)
  }
}
