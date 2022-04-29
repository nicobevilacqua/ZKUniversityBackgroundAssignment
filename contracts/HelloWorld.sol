//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * @title HelloWorld contract
 * @dev HelloWorld contract implementation for ZK University
 */

contract HelloWorld {
    uint256 private storedNumber;

    /**
     * @notice Store a number in the contract
     * @dev Store a uint256 number in the contract
     * @param _number - uint256 number to be stored
     */
    function storeNumber(uint256 _number) external {
        storedNumber = _number;
    }

    /**
     * @notice Get the stored number
     * @dev Get the uint256 stored number
     * @return storedNumber - uint256 number to be stored
     */
    function retrieveNumber() external view returns (uint256) {
        return storedNumber;
    }
}
