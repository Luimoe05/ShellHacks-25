import express from "express";
import pkg from "express-openid-connect";
import supabase from "../DB/supabase.js";

const { requiresAuth } = pkg;
const router = express.Router();

// Get user profile data
router.get("/", requiresAuth(), async (req, res) => {
  try {
    const user = req.oidc.user;

    // Fetch user data from UserInfo table
    const { data: userInfo, error } = await supabase
      .from("UserInfo")
      .select(
        `
        *,
        auth0_id,
        name,
        age,
        location,
        member_since,
        primary_goal,
        interest_category,
        monthly_income,
        credit_score,
        total_savings,
        timeframe,
        created_at
      `
      )
      .eq("auth0_id", user.sub)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return res.status(404).json({
        error: "User profile not found",
        message: "Please complete onboarding first",
      });
    }

    // Calculate months active (from created_at to now)
    const createdDate = new Date(userInfo.created_at);
    const now = new Date();
    const monthsActive = Math.floor(
      (now - createdDate) / (1000 * 60 * 60 * 24 * 30)
    );

    // Format the response to match your frontend expectations
    const profileData = {
      name: userInfo.name || user.name,
      age: userInfo.age,
      location: userInfo.location,
      memberSince:
        userInfo.member_since ||
        new Date(userInfo.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      primaryGoal: userInfo.primary_goal,
      interestCategory: userInfo.interest_category,
      monthlyIncome: userInfo.monthly_income,
      creditScore: userInfo.credit_score,
      totalSavings: userInfo.total_savings || 0,
      monthsActive: monthsActive > 0 ? monthsActive : 1,
      timeframe: userInfo.timeframe,
      // Add any other fields you need
      auth0_id: userInfo.auth0_id,
      email: user.email,
      picture: user.picture,
    };

    res.json(profileData);
  } catch (error) {
    console.error("Error in profile route:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch profile data",
    });
  }
});

// Update user profile data
router.put("/", requiresAuth(), async (req, res) => {
  try {
    const user = req.oidc.user;
    const updateData = req.body;

    // Remove fields that shouldn't be updated via this endpoint
    const {
      auth0_id,
      name,
      age,
      email,
      picture,
      created_at,
      ...allowedUpdates
    } = updateData;

    const { data, error } = await supabase
      .from("UserInfo")
      .update(allowedUpdates)
      .eq("auth0_id", user.sub)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return res.status(400).json({
        error: "Update failed",
        message: error.message,
      });
    }

    // Return updated profile data in the same format as GET
    const monthsActive = Math.floor(
      (new Date() - new Date(data.created_at)) / (1000 * 60 * 60 * 24 * 30)
    );

    const profileData = {
      name: data.name || user.name,
      age: data.age,
      location: data.location,
      memberSince:
        data.member_since ||
        new Date(data.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      primaryGoal: data.primary_goal,
      interestCategory: data.interest_category,
      monthlyIncome: data.monthly_income,
      creditScore: data.credit_score,
      totalSavings: data.total_savings || 0,
      monthsActive: monthsActive > 0 ? monthsActive : 1,
      timeframe: data.timeframe,
      auth0_id: data.auth0_id,
      email: user.email,
      picture: user.picture,
    };

    res.json(profileData);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to update profile",
    });
  }
});

export default router;
