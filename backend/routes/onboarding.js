// routes/onboarding.js
import express from "express";
import supabase from "../DB/supabase.js";

const router = express.Router();

// Complete onboarding and save user data
router.post("/complete", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.oidc || !req.oidc.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = req.oidc.user;
    const {
      name,
      city,
      country,
      interests,
      salary,
      goal,
      creditScoreRange,
      timeframe,
      debt,
      housing,
      monthlyIncome,
    } = req.body;

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("UserInfo")
      .select("*")
      .eq("auth0_id", user.sub)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing user:", checkError);
      return res.status(500).json({ error: "Database error" });
    }

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists in database",
        userData: existingUser,
      });
    }

    // Prepare data for UserInfo table (no DOB or Age)
    const userInfoData = {
      Name: name || user.name,
      Goal: goal,
      Annual_salary: salary ? parseFloat(salary) : null,
      City: city,
      Country: country,
      Email: user.email,
      auth0_id: user.sub,
      monthly_income: monthlyIncome ? parseFloat(monthlyIncome) : null,
      housing_payment: housing ? parseFloat(housing) : null,
      credit_score: creditScoreRange ? parseFloat(creditScoreRange) : null,
      debt_payment: debt ? parseFloat(debt) : null,
      timeframe: timeframe ? parseFloat(timeframe) : null,
    };

    // Insert data into UserInfo table
    const { data, error } = await supabase
      .from("UserInfo")
      .insert([userInfoData])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("User onboarding completed:", data[0]);
    res.json({
      success: true,
      message: "Onboarding completed successfully",
      userData: data[0],
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add endpoint to check if user needs onboarding
router.get("/status", async (req, res) => {
  try {
    if (!req.oidc || !req.oidc.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = req.oidc.user;

    const { data, error } = await supabase
      .from("UserInfo")
      .select("*")
      .eq("auth0_id", user.sub)
      .single();

    if (error && error.code === "PGRST116") {
      // User not found - needs onboarding
      return res.json({
        needsOnboarding: true,
        user: {
          name: user.name,
          email: user.email,
          picture: user.picture,
          sub: user.sub,
        },
      });
    } else if (data) {
      // User found - already onboarded
      return res.json({
        needsOnboarding: false,
        userData: data,
      });
    } else {
      throw error;
    }
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
