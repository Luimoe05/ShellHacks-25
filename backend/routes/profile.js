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
      .select("*")
      .eq("auth0_id", user.sub)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return res.status(404).json({
        error: "User profile not found",
        message: "Please complete onboarding first",
      });
    }

    // Calculate months active from Created_at
    const createdDate = new Date(userInfo.Created_at);
    const now = new Date();
    const monthsActive = Math.floor(
      (now - createdDate) / (1000 * 60 * 60 * 24 * 30)
    );

    // Map database columns to frontend format
    const profileData = {
      name: userInfo.Name || user.name,
      location: `${userInfo.City || ""}, ${userInfo.Country || ""}`.replace(
        ", ",
        userInfo.City && userInfo.Country ? ", " : ""
      ),
      memberSince: new Date(userInfo.Created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      primaryGoal: userInfo.Goal,
      monthlyIncome: userInfo.monthly_income,
      creditScore: userInfo.credit_score,

      monthsActive: monthsActive > 0 ? monthsActive : 1,
      timeframe: userInfo.timeframe,

      housingPayment: userInfo.housing_payment,
      debtPayment: userInfo.debt_payment,
      // Auth info
      auth0_id: userInfo.auth0_id,
      email: userInfo.Email,
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
      Name,
      Email,
      picture,
      Created_at,
      memberSince,
      ...allowedUpdates
    } = updateData;

    // Map frontend field names to database column names
    const dbUpdateData = {};

    if (allowedUpdates.location) {
      // Split location into City and Country if it contains a comma
      const locationParts = allowedUpdates.location
        .split(",")
        .map((part) => part.trim());
      if (locationParts.length >= 2) {
        dbUpdateData.City = locationParts[0];
        dbUpdateData.Country = locationParts[1];
      } else {
        dbUpdateData.City = locationParts[0];
      }
    }

    if (allowedUpdates.primaryGoal !== undefined)
      dbUpdateData.Goal = allowedUpdates.primaryGoal;
    if (allowedUpdates.monthlyIncome !== undefined)
      dbUpdateData.monthly_income = allowedUpdates.monthlyIncome;
    if (allowedUpdates.creditScore !== undefined)
      dbUpdateData.credit_score = allowedUpdates.creditScore;
    if (allowedUpdates.timeframe !== undefined)
      dbUpdateData.timeframe = allowedUpdates.timeframe;

    if (allowedUpdates.housingPayment !== undefined)
      dbUpdateData.housing_payment = allowedUpdates.housingPayment;
    if (allowedUpdates.debtPayment !== undefined)
      dbUpdateData.debt_payment = allowedUpdates.debtPayment;

    const { data, error } = await supabase
      .from("UserInfo")
      .update(dbUpdateData)
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
      (new Date() - new Date(data.Created_at)) / (1000 * 60 * 60 * 24 * 30)
    );

    const profileData = {
      name: data.Name || user.name,
      location: `${data.City || ""}, ${data.Country || ""}`.replace(
        ", ",
        data.City && data.Country ? ", " : ""
      ),
      memberSince: new Date(data.Created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      primaryGoal: data.Goal,
      monthlyIncome: data.monthly_income,
      creditScore: data.credit_score,
      totalSavings: 0, // Not in your schema
      monthsActive: monthsActive > 0 ? monthsActive : 1,
      timeframe: data.timeframe,

      housingPayment: data.housing_payment,
      debtPayment: data.debt_payment,
      auth0_id: data.auth0_id,
      email: data.Email,
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
