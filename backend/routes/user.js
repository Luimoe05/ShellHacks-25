import express from "express";
const router = express.Router();
import supabase from "../DB/supabase.js";

// CREATE user
router.post("/", async (req, res) => {
  const { auth0_id, email, name, picture } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ auth0_id, email, name, picture }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// READ user by ID
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// UPDATE user by ID
router.put("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .update(req.body)
    .eq("id", req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

export default router;
