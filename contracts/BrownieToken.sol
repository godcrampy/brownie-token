pragma solidity ^0.5.0;

contract BrownieToken{
  uint public totalSupply = 1000;
  string public name = "Brownie Token";
  string public symbol = "BRWN";
  uint public decimals = 10;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  mapping (address => uint) public balanceOf;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value, "Inadequate Balance");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }
}