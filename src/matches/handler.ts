import { Hono } from "hono";

const app = new Hono();

app.get("/matches", async (c) => {
  return c.json([]);
});

app.get("/matches/:id", async (c) => {
  return c.json({
    id: c.req.param("id"),
  });
});

app.post("/matches", async (c) => {
  //validate schema
  return c.json(await c.req.json());
});

app.patch("/matches/:id", async (c) => {
  return c.text(`updated user ${c.req.param("id")}`);
});

app.delete("/matches/:id", async (c) => {
  return c.text(`deleted user ${c.req.param("id")}`);
});

export default app;
