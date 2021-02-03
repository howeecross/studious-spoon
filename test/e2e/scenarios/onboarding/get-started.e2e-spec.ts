import { $, browser, by, element, ExpectedConditions as EC } from 'protractor';
import {
  clearStorage,
  clickIonAlertButton,
  disableCSSAnimations,
  expectPage,
  holdMyProtractorIAmGoingIn,
  ionicPageIs,
  sendKeys,
  takeScreenshot,
  waitForIonAlert,
  waitForIonicPage
} from '../../utils';

describe('Onboarding: Get Started', () => {
  afterEach(clearStorage);
  beforeEach(async () => {
    await browser.get('');
    await disableCSSAnimations();
  });

  // TODO fix: Failed: No element found using locator: by.cssContainingText("ion-alert .alert-button", "****")
  // The onboarding mega-test. Try everything:
  /* it('Should allow the user to navigate intro screens', async () => {
    await element(by.css('.e2e-get-started')).click();
    await expectPage('tour');
    await element(by.css('.e2e-got-it')).click();
    await takeScreenshot('tour-2');
    await element(by.css('.e2e-makes-sense')).click();
    await takeScreenshot('tour-3');

    // TODO,FIXME: breaks in e2e tests, but not in manual testing
    // await (await element(by.css('ion-navbar .back-button'))).click();
    // expect(await element(by.css('.swiper-slide-active h3')).getText()).toEqual(
    //   'Bitcoin is a currency.'
    // );
    // await (element(by.buttonText('Makes sense'))).click();

    await element(by.css('.e2e-create-wallet')).click();
    await waitForIonAlert();
    await takeScreenshot('tour-3-encryption-request');
    await clickIonAlertButton('No');
    await takeScreenshot('tour-3-encryption-request-decline');
    await clickIonAlertButton('Go Back');
    await takeScreenshot('tour-3-encryption-request-input');
    const p = 'hunter2';
    await sendKeys(element(by.css('ion-alert input.alert-input')), p);
    await clickIonAlertButton('Ok');
    await takeScreenshot('tour-3-encryption-request-input-confirm');
    // Cancel the first time to make sure we get another chance
    await clickIonAlertButton('Cancel');
    // try again, confirm our password this time
    await sendKeys(element(by.css('ion-alert input.alert-input')), p);
    await clickIonAlertButton('Ok');
    await sendKeys(element(by.css('ion-alert input.alert-input')), p);
    // TODO: language: 'Ok' -> 'Confirm'
    await element(
      by.cssContainingText('ion-alert .alert-button', 'Ok')
    ).click();
    await holdMyProtractorIAmGoingIn(async () => {
      await browser.wait(EC.presenceOf($('page-collect-email')), 5000);
      await expectPage('collect-email');
      // TODO: complete onboarding process, testing as much as possible
    });
  }); */

  // Our goal for this test is to click all the "Skip" buttons, and get through
  // onboarding as quickly as possible.
  /*   it('Should allow the user to skip through much of the onboarding process', async () => {
      await element(by.css('.e2e-get-started')).click();
      await waitForIonicPage('tour');
      await element(by.buttonText('Skip')).click();
      await waitForIonAlert();
      await clickIonAlertButton('No');
      await element(
        by.cssContainingText('ion-alert .alert-button', "I'm sure")
      ).click();
      await holdMyProtractorIAmGoingIn(async () => {
        await browser.wait(EC.presenceOf($('page-collect-email')), 5000);
        // TODO: complete onboarding process (skipping as much as possible)
      });
    });
    */
});pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// Sample token contract
//
// Symbol        : HCX
// Name          : HCoinx Token
// Total supply  : 100000000
// Decimals      : 2
// Owner Account : 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
//
// Enjoy.
//
// (c) by Howard L. Mosely Jr. 2020. MIT Licence.
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Lib: Safe Math
// ----------------------------------------------------------------------------
contract SafeMath {

    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }

    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


/**
ERC Token Standard #20 Interface
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
*/
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


/**
Contract function to receive approval and execute function in one call
Borrowed from MiniMeToken
*/
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

/**
ERC20 Token, with the addition of symbol, name and decimals and assisted token transfers
*/
contract HCoinxToken is ERC20Interface, SafeMath {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;


    //
    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account. The spender contract function
    // receiveApproval(...) is then executed
    // ------------------------------------------------------------------------
    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }


    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function () public payable {
        revert();
    }
} ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {
        symbol = "HCX";
        name = "HCoinx Token";
        decimals = 2;
        _totalSupply = 100000;
        balances[0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe] = _totalSupply;
        emit Transfer(address(0), 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe, _totalSupply);
    }


    // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }


    // ------------------------------------------------------------------------
    // Get the token balance for account tokenOwner
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }


    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to to account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces 
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }


