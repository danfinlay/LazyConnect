"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LazyConnect;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _onboarding = _interopRequireDefault(require("@metamask/onboarding"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const config = require('./config.json');

function LazyConnect(props) {
  const {
    actionName,
    chainId
  } = props;
  const [provider, setInjectedProvider] = (0, _react.useState)();
  const [accounts, setAccounts] = (0, _react.useState)([]);
  const [error, setError] = (0, _react.useState)(null);
  const [userChainId, setUserChainId] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(false);

  if (!provider && _onboarding.default.isMetaMaskInstalled()) {
    setInjectedProvider(window.ethereum);
  } // Get accounts;


  (0, _react.useEffect)(() => {
    if (!provider) {
      return;
    }

    getAccounts().then(setAccounts).catch(console.error);

    async function getAccounts() {
      const accounts = await ethereum.request({
        method: 'eth_accounts'
      });
      return accounts;
    }

    provider.on("accountsChanged", setAccounts);
  }, []); // Get current selected network:

  (0, _react.useEffect)(() => {
    if (!provider || userChainId) {
      return;
    }

    getUserChainId().then(setUserChainId).catch(console.error);

    async function getUserChainId() {
      const chainId = await ethereum.request({
        method: 'eth_chainId'
      });
      return chainId;
    }

    provider.provider.on('chainChanged', _chainId => {
      setUserChainId(_chainId);
    });
  }, []);

  if (!_onboarding.default.isMetaMaskInstalled()) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "lazyConnect"
    }, /*#__PURE__*/_react.default.createElement("p", null, "You need a wallet to ", actionName, "."), /*#__PURE__*/_react.default.createElement("button", {
      onClick: () => {
        const onboarding = new _onboarding.default();
        onboarding.startOnboarding();
      }
    }, "Install MetaMask"));
  }

  if (Number(userChainId) !== config.chainId) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "lazyConnect"
    }, /*#__PURE__*/_react.default.createElement("p", null, "This app requires the Goerli test network to be selected in your wallet, since this is just a test for now."), /*#__PURE__*/_react.default.createElement("button", {
      onClick: async () => {
        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: '0x' + config.chainId.toString(16)
          }]
        }).then(() => {
          setLoading(false);
        }).catch(reason => {
          setLoading(false);
          setError(reason);
        });
        setLoading(true);
      }
    }, "Switch to Goerli"));
  }

  if (accounts && accounts.length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "lazyConnect"
    }, /*#__PURE__*/_react.default.createElement("p", null, "You need to connect an account to ", actionName, "."), /*#__PURE__*/_react.default.createElement("button", {
      onClick: async () => {
        const accounts = await ethereum.request({
          method: 'wallet_requestAccounts'
        });
        setAccounts(accounts);
      }
    }, "Connect an account"));
  }

  if (loading) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "lazyConnect"
    }, "Loading...");
  }

  const {
    children
  } = props;

  const childrenWithProps = _react.default.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if ( /*#__PURE__*/_react.default.isValidElement(child)) {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        provider
      });
    }

    return child;
  });

  return /*#__PURE__*/_react.default.createElement("div", null, childrenWithProps);
}