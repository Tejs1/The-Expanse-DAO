import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0x8a0436ccb3c73ff2e1f5dfaa39409c55f2a63fa8"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Ready Player One Anorak key ",
        description: "This NFT will give you access to The ExpanseDAO!",
        image: readFileSync("scripts/assets/key.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
