import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { syncMergedPullRequests } from "../src/lib/github-sync";

syncMergedPullRequests()
  .then((r) => {
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.errors.length ? 1 : 0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
