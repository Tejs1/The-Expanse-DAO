import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken("0x5ecdbd0fc6472ee147406b06d16ee222b0a20337");

(async () => {
  try {
    // max supply? 1,111,111 is a nice number!
    const amount = 1_111_111;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log(
      "✅ There now is",
      totalSupply.displayValue,
      "BESKAR in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
