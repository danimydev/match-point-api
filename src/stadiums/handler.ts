import { Hono } from "hono";

const app = new Hono();

app.get("/stadiums", async (c) => {
  return c.json([]);
});

app.get("/stadiums/:id", async (c) => {
  return c.json({
    id: c.req.param("id"),
  });
});

app.post("/stadiums", async (c) => {
  return c.json(await c.req.json());
});

app.patch("/stadiums/:id", async (c) => {
  return c.text(`updated user ${c.req.param("id")}`);
});

app.delete("/stadiums/:id", async (c) => {
  return c.text(`deleted user ${c.req.param("id")}`);
});

export default app;
