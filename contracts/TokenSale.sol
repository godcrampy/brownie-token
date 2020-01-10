pragma solidity ^0.5.0;
import "./BrownieToken.sol";

contract TokenSale {

  address admin;
  BrownieToken public token;
  uint public tokenPrice;

  constructor(BrownieToken _token, uint _tokenPrice) public {
    admin = msg.sender;
    token = _token;
    tokenPrice = _tokenPrice;
  }

  function buyTokens(uint _numberOfTokens) public payable {
    
  }
}