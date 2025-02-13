import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

function getEth() {
  // @ts-ignore
  const eth = globalThis.ethereum;
  if (!eth) {
    throw new Error("No ethereum provider found");
  }

  return eth;
}

const CONTRACTS = {
  hello: "0x8a791620dd6260079bf849dc5567adc3f2fdc318",
  counter: "0x610178da211fef7d417bc0e6fed39f05609ad788",
};

async function hasAccounts() {
  const eth = getEth();
  if (!eth) {
    return false;
  }

  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
  return accounts.length > 0;
}

async function requestAccount() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];
  return Boolean(accounts && accounts.length);
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccount())) {
    throw new Error("No accounts found");
  }

  const eth = getEth();
  const provider = new ethers.BrowserProvider(eth);

  const counter = new ethers.Contract(
    // counter contract address
    CONTRACTS.counter,
    Counter.abi,
    await provider.getSigner()
  );

  const body = document.querySelector("body")!;

  // counter

  const pCounter = document.createElement("p");

  const num = await counter.getCounter();
  pCounter.textContent = num.toString();

  // on value change
  counter.on(counter.filters.CounterInc(), (payload) => {
    const [value, message] = payload.args;

    console.log("CountIncremented event:", value, message);

    pCounter.textContent = value.toString();
    button.disabled = false;
    button.textContent = "Count +1";
    button.focus();
  });

  // button

  const button = document.createElement("button");
  button.textContent = "Count +1";
  // autofocus
  button.focus();

  button.onclick = () => {
    counter.count();
    counter.count();
    counter.count();
    counter.count();
    button.disabled = true;
    button.textContent = "Counting...";
  };

  body.appendChild(pCounter);
  body.appendChild(button);
}

run().catch(console.error);
