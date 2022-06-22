var Compras = artifacts.require("Compras");

module.exports = function(deployer) {
    deployer.deploy(Compras);
};