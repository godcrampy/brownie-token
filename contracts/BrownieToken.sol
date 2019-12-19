pragma solidity ^0.5.0;

contract BrownieToken{
  uint public totalSupply;

  mapping (address => uint) public balanceOf;

  constructor() public {
    totalSupply = 1000;
    balanceOf[msg.sender] = totalSupply;
  }
}