// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//import "./Usuarios.sol";

contract Compras {
  enum Estado { ACTIVO, LECTURA, BOOTSTRAP }
  Estado public estado;
  uint public compraCount;
  mapping(uint => Compra) public compras;
  
  struct Compra {
      uint _idCompra;
      //Usuario usuarioComprador;
      address usuarioComprador;
      uint precio;
      string[] articulos;
  }

   //struct Usuario {
     // address _idUsuario;
     // uint saldo;
  //}

  //modifier duenio(){
    //require(msg.sender == compras[_id].usuarioComprador , "El usuario no es duenio de esa compra");
    //_;
  //}

  modifier bootstrap() {
    require(estado == Estado.BOOTSTRAP || estado == Estado.ACTIVO, "Solo puede agregar compras."); 
    _;  
  }

  modifier lectura() {
    require(estado == Estado.LECTURA || estado == Estado.ACTIVO, "Solo puede consultar compras."); 
    _;
  }

  function obtenerCompra(uint _id) public lectura view returns(Compra memory) {   
    return compras[_id];
  }

  //function obtenerUsuarioDeLaCompra(uint _id) public view returns (Usuario memory) { 
    //return compras[_id].usuarioComprador;
  //}

  function agregarCompra(address _comprador, uint _precio, string[] memory _articulos) public bootstrap {
    incrementarCompras();
    compras[compraCount] = Compra(compraCount, _comprador, _precio, _articulos);
    //restarSaldo(compraCount);
  }

  //function restarSaldo(uint _idCompra) private view {
    //Usuario memory usuario = obtenerUsuarioDeLaCompra(_idCompra);
    //Compra memory compra = obtenerCompra(_idCompra);
    //saldoInsuficiente(usuario.saldo, compra);
    //usuario.saldo = usuario.saldo - compra.precio;  
  //}

  function saldoInsuficiente(uint saldo, Compra memory compra) private pure{
    require(saldo >= compra.precio, "Saldo insuficiente");
  }

  function activar() public {
    estado = Estado.ACTIVO;
  }

  function habilitarAgregarCompras() public {
    estado = Estado.BOOTSTRAP;
  }

  function habilitarConsultaCompras() public {
    estado = Estado.LECTURA;
  }

  function incrementarCompras() internal {
     compraCount += 1;
  }
}
