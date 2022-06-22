pragma solidity ^0.8.10;

contract Usuarios {
    address public usuario;
    uint internal saldo = 0;

    function agregarSaldo(uint _saldo) public {
        require(_saldo > 0, "Entrega la tarasca.");
        saldo += _saldo;
    }
}