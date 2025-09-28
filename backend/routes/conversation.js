import express from "express";
const router = express.Router();
import supabase from "../DB/supabase.js";

// CREATE a new conversation
router.post("/", async (req, res) => {
  try {
    const { user_id, content } = req.body;

    // console.log("Creating new conversation:", { user_id, content });

    const { data, error } = await supabase
      .from("conversations_and_messages")
      .insert([{ user_id, content, role: "system", parent_id: null }])
      .select();

    if (error) {
      console.error("Error creating conversation:", error);
      return res.status(400).json({ error: error.message });
    }

    // console.log("Conversation created successfully:", data[0]);
    res.json(data[0]);
  } catch (err) {
    // console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all conversations for a user
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // console.log("Fetching conversations for user:", user_id);

    const { data, error } = await supabase
      .from("conversations_and_messages")
      .select("*")
      .eq("user_id", user_id)
      .is("parent_id", null) // Only get root conversations
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      return res.status(400).json({ error: error.message });
    }

    // console.log(`Found ${data.length} conversations for user ${user_id}`);
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ADD a message to a conversation
router.post("/:conversation_id/messages", async (req, res) => {
  try {
    const { user_id, role, content } = req.body;
    const { conversation_id } = req.params;

    // console.log("Adding message to conversation:", {
    //   conversation_id,
    //   user_id,
    //   role,
    //   content: content.substring(0, 50) + "...",
    // });

    const { data, error } = await supabase
      .from("conversations_and_messages")
      .insert([{ user_id, parent_id: conversation_id, role, content }])
      .select();

    if (error) {
      console.error("Error adding message:", error);
      return res.status(400).json({ error: error.message });
    }

    // console.log("Message added successfully:", data[0].id);
    res.json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE a single message
router.put("/messages/:message_id", async (req, res) => {
  try {
    const { message_id } = req.params;
    const { content } = req.body;

    const { data, error } = await supabase
      .from("conversations_and_messages")
      .update({ content })
      .eq("id", message_id)
      .select();

    if (error) {
      console.error("Error updating message:", error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a single message
router.delete("/messages/:message_id", async (req, res) => {
  try {
    const { message_id } = req.params;

    const { error } = await supabase
      .from("conversations_and_messages")
      .delete()
      .eq("id", message_id);

    if (error) {
      console.error("Error deleting message:", error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all messages in a conversation
router.get("/:conversation_id", async (req, res) => {
  try {
    const { conversation_id } = req.params;

    // console.log("Fetching messages for conversation:", conversation_id);

    const { data, error } = await supabase
      .from("conversations_and_messages")
      .select("*")
      .or(`id.eq.${conversation_id},parent_id.eq.${conversation_id}`)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return res.status(400).json({ error: error.message });
    }

    // console.log(
    //   `Found ${data.length} messages in conversation ${conversation_id}`
    // );
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a conversation (cascade deletes messages)
router.delete("/:conversation_id", async (req, res) => {
  try {
    const { conversation_id } = req.params;

    const { error } = await supabase
      .from("conversations_and_messages")
      .delete()
      .eq("id", conversation_id);

    if (error) {
      console.error("Error deleting conversation:", error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
