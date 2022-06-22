// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Compras {
  enum Estado { ACTIVO, LECTURA, BOOTSTRAP };
  Estado estado;
  uint public compraCount = 0;
  mapping(uint => Compra) public compras;
  
  constructor Compras() {
    estado;
  }

  modifier activo(Estado estado) {
    require(estado == Estado.ACTIVO, "El contrato debe estar activo para realizar la transacción.");
    _; 
  }

  modifier bootstrap(Estado estado) {
    require(estado == Estado.BOOTSTRAP, "Solo puede agregar compras."); 
    _;  
  }

  modifier lectura() {
    require(estado == Estado.LECTURA, "Solo puede consultar compras."); 
    _;
  }

  struct Compra {
      uint _id;
      address usuarioComprador;
      uint precio;
      string[] articulos;
  }

  function obtenerCompra(uint _id) public activo view returns(Compra memory) {   
    return compras[_id];
  }

  function agregarCompra(address _comprador, uint _precio, string[] memory _articulos) public activo bootstrap {
    compraCount++;
    compras[compraCount] = Compra(compraCount, _comprador, _precio, _articulos);
  }
}
