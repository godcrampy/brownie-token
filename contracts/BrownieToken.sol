pragma solidity ^0.5.0;

contract BrownieToken{
  uint public totalSupply = 1000;
  string public name = "Brownie Token";
  string public symbol = "BRWN";
  uint public decimals = 10;

  mapping (address => uint) public balanceOf;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }
}