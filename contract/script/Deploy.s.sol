// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script} from "forge-std/Script.sol";
import {Euro} from "../src/Euro.sol";
import {console} from "forge-std/console.sol";

contract DeployEUR is Script {
    function run() external returns (Euro) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Euro euro = new Euro();

        console.log("EUR Token deployed at:", address(euro));
        console.log("Name:", euro.name());
        console.log("Symbol:", euro.symbol());
        console.log("Decimals:", euro.decimals());

        vm.stopBroadcast();

        return euro;
    }
}
