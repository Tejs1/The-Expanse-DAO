import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x754cC62356027A186eaeD3AfF1a60F5fb59F86E3");

// This is our ERC-20 contract.
const token = sdk.getToken("0x5ECdbd0fc6472eE147406b06d16ee222B0a20337");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    // Grab 80% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent80 = (Number(ownedAmount) / 100) * 80;

    // Transfer 80% of the supply to our voting contract.
    await token.transfer(vote.getAddress(), percent80);

    console.log(
      "✅ Successfully transferred " + percent80 + " tokens to vote contract"
    );
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();
