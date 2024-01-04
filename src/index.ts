import { serve } from "@hono/node-server";
import { Hono } from "hono";

import profilesHandler from "./profiles/handler";
import teamsHandler from "./teams/handler";
import membersHandler from "./members/handler";

const app = new Hono();

app.route("/profiles", profilesHandler);
app.route("/teams", teamsHandler);
app.route("/members", membersHandler);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
