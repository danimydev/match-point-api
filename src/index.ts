import { serve } from "@hono/node-server";
import { Hono } from "hono";

import profilesHandler from "./profiles/handler";
import matchesHandler from "./matches/handler";
import stadiumsHandler from "./stadiums/handler";

const app = new Hono();

app.route("/profiles", profilesHandler);
app.route("/matches", matchesHandler);
app.route("/stadiums", stadiumsHandler);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
