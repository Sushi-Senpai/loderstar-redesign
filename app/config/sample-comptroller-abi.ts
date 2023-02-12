export default [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "string", "name": "action", "type": "string" }, {
        "indexed": false,
        "internalType": "bool",
        "name": "pauseState",
        "type": "bool"
    }],
    "name": "ActionPaused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "string", "name": "action", "type": "string" }, {
        "indexed": false,
        "internalType": "bool",
        "name": "pauseState",
        "type": "bool"
    }],
    "name": "ActionPaused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCompAccrued",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "newCompAccrued", "type": "uint256" }],
    "name": "CompAccruedAdjusted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "newSpeed", "type": "uint256" }],
    "name": "CompBorrowSpeedUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "CompGranted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCompReceivable",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "newCompReceivable", "type": "uint256" }],
    "name": "CompReceivableUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "newSpeed", "type": "uint256" }],
    "name": "CompSupplySpeedUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "newSpeed", "type": "uint256" }],
    "name": "ContributorCompSpeedUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "compDelta",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "compBorrowIndex", "type": "uint256" }],
    "name": "DistributedBorrowerComp",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": true, "internalType": "address", "name": "supplier", "type": "address" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "compDelta",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "compSupplyIndex", "type": "uint256" }],
    "name": "DistributedSupplierComp",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "error", "type": "uint256" }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "info",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "detail", "type": "uint256" }],
    "name": "Failure",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
    "name": "MarketEntered",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "address", "name": "account", "type": "address" }],
    "name": "MarketExited",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }],
    "name": "MarketListed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "newBorrowCap", "type": "uint256" }],
    "name": "NewBorrowCap",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "oldBorrowCapGuardian",
        "type": "address"
    }, { "indexed": false, "internalType": "address", "name": "newBorrowCapGuardian", "type": "address" }],
    "name": "NewBorrowCapGuardian",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCloseFactorMantissa",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "newCloseFactorMantissa", "type": "uint256" }],
    "name": "NewCloseFactor",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCollateralFactorMantissa",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCollateralFactorMantissa",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCollateralFactorMantissaVip",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCollateralFactorMantissaVip",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldliquidationThresholdMantissa",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "newliquidationThresholdMantissa",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldliquidationThresholdMantissaVip",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "newliquidationThresholdMantissaVip", "type": "uint256" }],
    "name": "NewFactorsAndThresholds",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "oldLiquidationIncentiveMantissa",
        "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "newLiquidationIncentiveMantissa", "type": "uint256" }],
    "name": "NewLiquidationIncentive",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "oldPauseGuardian",
        "type": "address"
    }, { "indexed": false, "internalType": "address", "name": "newPauseGuardian", "type": "address" }],
    "name": "NewPauseGuardian",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "contract PriceOracle",
        "name": "oldPriceOracle",
        "type": "address"
    }, { "indexed": false, "internalType": "contract PriceOracle", "name": "newPriceOracle", "type": "address" }],
    "name": "NewPriceOracle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "newSupplyCap", "type": "uint256" }],
    "name": "NewSupplyCap",
    "type": "event"
}, {
    "inputs": [{ "internalType": "contract Unitroller", "name": "unitroller", "type": "address" }],
    "name": "_become",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "_borrowGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }], "name": "_grantComp", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "_mintGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "newBorrowCapGuardian", "type": "address" }],
    "name": "_setBorrowCapGuardian",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
    }],
    "name": "_setBorrowPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "newCloseFactorMantissa", "type": "uint256" }],
    "name": "_setCloseFactor",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "contract CToken[]",
        "name": "cTokens",
        "type": "address[]"
    }, { "internalType": "uint256[]", "name": "supplySpeeds", "type": "uint256[]" }, {
        "internalType": "uint256[]",
        "name": "borrowSpeeds",
        "type": "uint256[]"
    }], "name": "_setCompSpeeds", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "contributor", "type": "address" }, {
        "internalType": "uint256",
        "name": "compSpeed",
        "type": "uint256"
    }], "name": "_setContributorCompSpeed", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, {
        "internalType": "uint256",
        "name": "newCollateralFactorMantissa",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "newCollateralFactorMantissaVip",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "newLiquidationThresholdMantissa",
        "type": "uint256"
    }, { "internalType": "uint256", "name": "newLiquidationThresholdMantissaVip", "type": "uint256" }],
    "name": "_setFactorsAndThresholds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "newLiquidationIncentiveMantissa", "type": "uint256" }],
    "name": "_setLiquidationIncentive",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "contract CToken[]",
        "name": "cTokens",
        "type": "address[]"
    }, { "internalType": "uint256[]", "name": "newBorrowCaps", "type": "uint256[]" }, {
        "internalType": "uint256[]",
        "name": "newSupplyCaps",
        "type": "uint256[]"
    }], "name": "_setMarketBorrowCaps", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
    }],
    "name": "_setMintPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "newPauseGuardian", "type": "address" }],
    "name": "_setPauseGuardian",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "contract PriceOracle", "name": "newOracle", "type": "address" }],
    "name": "_setPriceOracle",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }],
    "name": "_setSeizePaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }],
    "name": "_setTransferPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, {
        "internalType": "bool",
        "name": "isComped_",
        "type": "bool"
    }, { "internalType": "bool", "name": "isPrivate_", "type": "bool" }, {
        "internalType": "bool",
        "name": "onlyWhitelistedBorrow_",
        "type": "bool"
    }],
    "name": "_supportMarket",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "accountAssets",
    "outputs": [{ "internalType": "contract CToken", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }], "name": "addToMarketExternal", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "allMarkets",
    "outputs": [{ "internalType": "contract CToken", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }],
    "name": "borrowAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "borrowCapGuardian",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "borrowCaps",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "borrowGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }],
    "name": "borrowVerify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, {
        "internalType": "contract CToken",
        "name": "cToken",
        "type": "address"
    }],
    "name": "checkMembership",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, {
        "internalType": "contract CToken[]",
        "name": "cTokens",
        "type": "address[]"
    }], "name": "claimComp", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "holders",
        "type": "address[]"
    }, { "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }, {
        "internalType": "bool",
        "name": "borrowers",
        "type": "bool"
    }, { "internalType": "bool", "name": "suppliers", "type": "bool" }],
    "name": "claimComp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }],
    "name": "claimComp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "closeFactorMantissa",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compAccrued",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "compAddress",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compBorrowSpeeds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compBorrowState",
    "outputs": [{ "internalType": "uint224", "name": "index", "type": "uint224" }, {
        "internalType": "uint32",
        "name": "block",
        "type": "uint32"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "compBorrowerIndex",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compContributorSpeeds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "compInitialIndex",
    "outputs": [{ "internalType": "uint224", "name": "", "type": "uint224" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "compRate",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compReceivable",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compSpeeds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "compSupplierIndex",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compSupplySpeeds",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "compSupplyState",
    "outputs": [{ "internalType": "uint224", "name": "index", "type": "uint224" }, {
        "internalType": "uint32",
        "name": "block",
        "type": "uint32"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "comptrollerImplementation",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address[]", "name": "cTokens", "type": "address[]" }],
    "name": "enterMarkets",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenAddress", "type": "address" }],
    "name": "exitMarket",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "getAccountLiquidity",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getAllMarkets",
    "outputs": [{ "internalType": "contract CToken[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "getAssetsIn",
    "outputs": [{ "internalType": "contract CToken[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getBlockNumber",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getCompAddress",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenModify",
        "type": "address"
    }, { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
    }],
    "name": "getHypotheticalAccountLiquidity",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, { "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }],
    "name": "getIsAccountVip",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "immutableCompAddress",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "isComptroller",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }],
    "name": "isDeprecated",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "lastContributorBlock",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenCollateral",
        "type": "address"
    }, { "internalType": "address", "name": "liquidator", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }],
    "name": "liquidateBorrowAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenCollateral",
        "type": "address"
    }, { "internalType": "address", "name": "liquidator", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "actualRepayAmount", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "seizeTokens",
        "type": "uint256"
    }], "name": "liquidateBorrowVerify", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenCollateral",
        "type": "address"
    }, { "internalType": "uint256", "name": "actualRepayAmount", "type": "uint256" }],
    "name": "liquidateCalculateSeizeTokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "liquidationIncentiveMantissa",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "markets",
    "outputs": [{ "internalType": "bool", "name": "isListed", "type": "bool" }, {
        "internalType": "uint256",
        "name": "collateralFactorMantissa",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "liquidationThresholdMantissa",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "collateralFactorMantissaVip",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "liquidationThresholdMantissaVip",
        "type": "uint256"
    }, { "internalType": "bool", "name": "isComped", "type": "bool" }, {
        "internalType": "bool",
        "name": "isPrivate",
        "type": "bool"
    }, { "internalType": "bool", "name": "onlyWhitelistedBorrow", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxAssets",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "minter",
        "type": "address"
    }, { "internalType": "uint256", "name": "mintAmount", "type": "uint256" }],
    "name": "mintAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "mintGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "minter",
        "type": "address"
    }, { "internalType": "uint256", "name": "actualMintAmount", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "mintTokens",
        "type": "uint256"
    }], "name": "mintVerify", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "oracle",
    "outputs": [{ "internalType": "contract PriceOracle", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pauseGuardian",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pendingAdmin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pendingComptrollerImplementation",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
    }, { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }],
    "name": "redeemAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
    }, { "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }, {
        "internalType": "uint256",
        "name": "redeemTokens",
        "type": "uint256"
    }], "name": "redeemVerify", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "payer",
        "type": "address"
    }, { "internalType": "address", "name": "borrower", "type": "address" }, {
        "internalType": "uint256",
        "name": "repayAmount",
        "type": "uint256"
    }],
    "name": "repayBorrowAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "payer",
        "type": "address"
    }, { "internalType": "address", "name": "borrower", "type": "address" }, {
        "internalType": "uint256",
        "name": "actualRepayAmount",
        "type": "uint256"
    }, { "internalType": "uint256", "name": "borrowerIndex", "type": "uint256" }],
    "name": "repayBorrowVerify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenCollateral", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenBorrowed",
        "type": "address"
    }, { "internalType": "address", "name": "liquidator", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }],
    "name": "seizeAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "seizeGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cTokenCollateral", "type": "address" }, {
        "internalType": "address",
        "name": "cTokenBorrowed",
        "type": "address"
    }, { "internalType": "address", "name": "liquidator", "type": "address" }, {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
    }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }],
    "name": "seizeVerify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "compAddress_", "type": "address" }],
    "name": "setCompAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "setImmutableCompAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken_", "type": "address" }, {
        "internalType": "bool",
        "name": "isPrivate_",
        "type": "bool"
    }, { "internalType": "bool", "name": "onlyWhitelistedCanBorrow_", "type": "bool" }, {
        "internalType": "bool",
        "name": "isComped_",
        "type": "bool"
    }], "name": "setMarketVariables", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "_tokenBalanceVipThreshold", "type": "uint256" }],
    "name": "setTokenBalanceVipThreshold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "_vipNft", "type": "address" }],
    "name": "setVipNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "user_", "type": "address" }, {
        "internalType": "bool",
        "name": "isWhiteListed_",
        "type": "bool"
    }], "name": "setWhitelistedUser", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "supplyCaps",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "tokenBalanceVipThreshold",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "src",
        "type": "address"
    }, { "internalType": "address", "name": "dst", "type": "address" }, {
        "internalType": "uint256",
        "name": "transferTokens",
        "type": "uint256"
    }],
    "name": "transferAllowed",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "transferGuardianPaused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, {
        "internalType": "address",
        "name": "src",
        "type": "address"
    }, { "internalType": "address", "name": "dst", "type": "address" }, {
        "internalType": "uint256",
        "name": "transferTokens",
        "type": "uint256"
    }], "name": "transferVerify", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "contributor", "type": "address" }],
    "name": "updateContributorRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "vipNft",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "whitelistedUser",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
}];
