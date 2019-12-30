pragma solidity ^0.5.0;

contract BrownieToken {
  uint public totalSupply = 1000;
  string public name = "Brownie Token";
  string public symbol = "BRWN";
  uint public decimals = 10;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  mapping (address => uint) public balanceOf;
  mapping (address => mapping (address => uint)) public allowance;

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

  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(allowance[_from][_to] <= _value, "Transfer not approved");
    require(balanceOf[_from] >= _value, "Inadequate Balance");
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][_to] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}