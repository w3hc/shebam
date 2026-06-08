// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test} from "forge-std/Test.sol";
import {Euro} from "../src/Euro.sol";

contract EuroTest is Test {
    Euro public euro;
    address public alice = address(0x1);
    address public bob = address(0x2);

    function setUp() public {
        euro = new Euro();
    }

    function test_Name() public view {
        assertEq(euro.name(), "Euro");
    }

    function test_Symbol() public view {
        assertEq(euro.symbol(), "EUR");
    }

    function test_Decimals() public view {
        assertEq(euro.decimals(), 18);
    }

    function test_InitialSupply() public view {
        assertEq(euro.totalSupply(), 0);
    }

    function test_Mint() public {
        euro.mint(alice, 1000e18);
        assertEq(euro.balanceOf(alice), 1000e18);
        assertEq(euro.totalSupply(), 1000e18);
    }

    function test_MintMultiple() public {
        euro.mint(alice, 100e18);
        euro.mint(bob, 200e18);

        assertEq(euro.balanceOf(alice), 100e18);
        assertEq(euro.balanceOf(bob), 200e18);
        assertEq(euro.totalSupply(), 300e18);
    }

    function test_Transfer() public {
        euro.mint(alice, 1000e18);

        vm.prank(alice);
        bool success = euro.transfer(bob, 300e18);
        assertTrue(success);

        assertEq(euro.balanceOf(alice), 700e18);
        assertEq(euro.balanceOf(bob), 300e18);
    }

    function testFuzz_Mint(address to, uint256 amount) public {
        vm.assume(to != address(0));
        vm.assume(amount < type(uint256).max);

        euro.mint(to, amount);
        assertEq(euro.balanceOf(to), amount);
        assertEq(euro.totalSupply(), amount);
    }
}
