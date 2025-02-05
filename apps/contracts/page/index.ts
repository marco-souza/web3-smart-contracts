import { ethers } from "ethers";

function getEth() {
  // @ts-ignore
  const eth = globalThis.ethereum;
  if (!eth) {
    throw new Error("No ethereum provider found");
  }

  return eth;
}

async function hasAccounts() {
  const eth = getEth();
  if (!eth) {
    return false;
  }

  const accounts = await eth.request({ method: "eth_accounts" }) as string[];
  return accounts.length > 0;
}

async function requestAccount() {
  const eth = getEth();
  const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[];
  return Boolean(accounts && accounts.length);
}

async function run() {
  if (!await hasAccounts() && !await requestAccount()) {
    throw new Error("No accounts found");
  }

  const eth = getEth();

  const hello = new ethers.Contract(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    [
      "function hello() pure returns (string)",
    ],
    new ethers.BrowserProvider(eth)
  );

  const provider = new ethers.BrowserProvider(eth);
  const counter = new ethers.Contract(
    // counter contract address
    "0x68b1d87f95878fe05b998f19b66f4baba5de1aed",
    [
      "function count()",
      "function ping() pure returns (string)",
      "function getCounter() view returns (uint)",
    ],
    await provider.getSigner(),
  );

  const body = document.querySelector("body")!

  body.textContent = await hello.hello();

  const pCounter = document.createElement("p");

  async function setState() {
    const num = await counter.getCounter()
    pCounter.textContent = num.toString();
  }

  setState()

  const button = document.createElement("button");
  button.textContent = "Count +1";
  button.onclick = async () => {
    const tx = await counter.count();
    await tx.wait(); // sad ;(
    alert("transaction confirmed: " + tx.hash);
    setState();
  };

  body.appendChild(pCounter);
  body.appendChild(button);
}

run().catch(console.error);
