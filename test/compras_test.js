const Compras = artifacts.require("Compras");

let compraContrato;

// contract("Compras", async (accounts) => {
//   console.log("acá llega 1");
//   beforeEach('initialized', async () => {
//       console.log("acá llega 2");
//       compraContrato = await Compras.new();
//       await compraContrato.agregarCompra(accounts[0], 100, ["Chalosse", "Chantelley"]);
//     });

//   it("Dado un id de compra, obtiene la compra en ese id."), async () => {
//     const compraEsperada = await compraContrato.obtenerCompra(0);
//     console.log(compraEsperada);
//     assert.equal(compraEsperada._id, 0);
//   };

// });
contract("Compras", async (accounts) => {
  before(async function () {
    compraContrato = await Compras.new();
  });

  describe("Dado un id de compra, obtiene la compra con ese id.", async () => {
    before("Obtiene la compra 0", async () => {
      await compraContrato.agregarCompra(accounts[0], 10, ["Chalosse", "Chantelley"]);
    });

    it("puede obtener la compra.", async () => {
      const compraEsperada = await compraContrato.obtenerCompra(0);
      assert.equal(compraEsperada._id, 0, "Debería ser la primera");
    });
  });
});
