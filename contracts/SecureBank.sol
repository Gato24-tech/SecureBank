// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract SecureBank {
    event Deposited(address indexed sender, uint256 amount);
    event Withdrawn(address indexed sender, uint256 amount);
    event Transfer(address indexed sender, address indexed recipient, uint256 amount);

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Debes enviar ETH para depositar");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Fondos insuficientes");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function transfer(address recipient, uint256 amount) public {
        require(amount > 0, "El monto debe ser mayor a 0");
        require(balances[msg.sender] >= amount, "Fondos insuficientes");
        require(recipient != address(0), "Direccion no valida");
        emit Transfer(msg.sender,recipient, amount);

        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function closeAccount() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No tienes saldo para cerrar la cuenta");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
