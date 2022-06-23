// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//import "./Usuarios.sol";

contract Compras {
    enum Estado {
        ACTIVO,
        LECTURA,
        BOOTSTRAP
    }
    Estado public estado = Estado.ACTIVO;
    uint256 public compraCount;
    mapping(uint256 => Compra) public compras;
    mapping(address => Usuario) public usuarios;

    address owner = msg.sender;

    struct Compra {
        uint256 _idCompra;
        Usuario usuarioComprador;
        uint256 precio;
        string[] articulos;
    }

    struct Usuario {
        address _idUsuario;
        uint256 saldo;
    }

    modifier duenio() {
        require(msg.sender == owner, "El usuario no es duenio de esa compra");
        _;
    }

    modifier bootstrap() {
        require(
            estado == Estado.BOOTSTRAP || estado == Estado.ACTIVO,
            "Solo puede agregar compras."
        );
        _;
    }

    modifier lectura() {
        require(
            estado == Estado.LECTURA || estado == Estado.ACTIVO,
            "Solo puede consultar compras."
        );
        _;
    }

    function obtenerCompra(uint256 _id)
        public
        view
        lectura
        returns (Compra memory)
    {
        return compras[_id];
    }

    function obtenerUsuarioDeLaCompra(uint256 _idCompra)
        public
        view
        returns (Usuario memory)
    {
        return compras[_idCompra].usuarioComprador;
    }

    function agregarUsuario(address _idUsuario, uint _saldoInicial) public {
      usuarios[_idUsuario] = Usuario(_idUsuario, _saldoInicial);
    }

    function obtenerUsuario(address _idUsuario) public view returns(Usuario memory) {
      return usuarios[_idUsuario];
    }

    function agregarCompra(
        Usuario memory _comprador,
        uint256 _precio,
        string[] memory _articulos
    ) public bootstrap {
        incrementarCompras();
        compras[compraCount] = Compra(
            compraCount,
            _comprador,
            _precio,
            _articulos
        );
        restarSaldo(compraCount);
    }

    function agregarSaldo(uint256 _saldo, address _idUsuario) public duenio {
        require(_saldo > 0, "Entrega la tarasca.");
        usuarios[_idUsuario].saldo += _saldo;
    }

    function restarSaldo(uint256 _idCompra) private view {
        Usuario memory usuario = obtenerUsuarioDeLaCompra(_idCompra);
        Compra memory compra = obtenerCompra(_idCompra);
        saldoInsuficiente(usuario.saldo, compra);
        usuario.saldo -= compra.precio;
    }

    function saldoInsuficiente(uint256 saldo, Compra memory compra)
        private
        pure
    {
        require(saldo >= compra.precio, "Saldo insuficiente");
    }

    function calcularPromedio(address _idUsuario) public view returns (uint) {
        uint256 importeTotalUsuario = 0;
        uint256 count = 0;
        for (uint256 i = 0; i <= compraCount; i++) {
            if (compras[i].usuarioComprador._idUsuario == _idUsuario) {
                importeTotalUsuario += compras[i].precio;
                count++;
            }
        }

        return importeTotalUsuario/count; 
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
