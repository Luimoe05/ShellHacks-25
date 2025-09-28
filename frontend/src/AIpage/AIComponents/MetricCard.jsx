import React from "react";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";

const MonthlySummary = ({ userProfile }) => {
  // Mock data for now - you can replace with real calculations later
  const monthlyData = {
    income: userProfile?.monthlyIncome || 5200,
    housing: userProfile?.housingPayment || 1400,
    debt: userProfile?.debtPayment || 300,
    food: 450, // Mock data
    transportation: 280, // Mock data
    entertainment: 200, // Mock data
    utilities: 150, // Mock data
    other: 180, // Mock data
  };

  const totalExpenses =
    monthlyData.housing +
    monthlyData.debt +
    monthlyData.food +
    monthlyData.transportation +
    monthlyData.entertainment +
    monthlyData.utilities +
    monthlyData.other;

  const netIncome = monthlyData.income - totalExpenses;
  const savingsRate = (netIncome / monthlyData.income) * 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const ExpenseItem = ({ label, amount, color }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography
        variant="body2"
        sx={{ color: "#b0b0b0", fontSize: "0.85rem" }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: color, fontWeight: 600 }}>
        {formatCurrency(amount)}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        width: "100%",
        maxWidth: 500,
        margin: "20px auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
        }}
      >
        Monthly Financial Summary
      </Typography>

      {/* Income Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
            Monthly Income
          </Typography>
          <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 700 }}>
            {formatCurrency(monthlyData.income)}
          </Typography>
        </Box>
      </Box>

      {/* Expenses Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ color: "#FF9800", fontWeight: 600, mb: 2 }}
        >
          Monthly Expenses
        </Typography>

        <ExpenseItem
          label="Housing & Rent"
          amount={monthlyData.housing}
          color="#FF5722"
        />
        <ExpenseItem
          label="Debt Payments"
          amount={monthlyData.debt}
          color="#F44336"
        />
        <ExpenseItem
          label="Food & Dining"
          amount={monthlyData.food}
          color="#FF9800"
        />
        <ExpenseItem
          label="Transportation"
          amount={monthlyData.transportation}
          color="#2196F3"
        />
        <ExpenseItem
          label="Entertainment"
          amount={monthlyData.entertainment}
          color="#9C27B0"
        />
        <ExpenseItem
          label="Utilities"
          amount={monthlyData.utilities}
          color="#607D8B"
        />
        <ExpenseItem
          label="Other Expenses"
          amount={monthlyData.other}
          color="#795548"
        />

        <Box sx={{ borderTop: "1px solid #333", pt: 2, mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ color: "#FF9800", fontWeight: 600 }}>
              Total Expenses
            </Typography>
            <Typography variant="h6" sx={{ color: "#FF9800", fontWeight: 700 }}>
              {formatCurrency(totalExpenses)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Net Income Section */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: "#2a2a2a", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: netIncome >= 0 ? "#4CAF50" : "#F44336",
              fontWeight: 600,
            }}
          >
            {netIncome >= 0 ? "Monthly Savings" : "Monthly Deficit"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: netIncome >= 0 ? "#4CAF50" : "#F44336",
              fontWeight: 700,
            }}
          >
            {formatCurrency(netIncome)}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 2 }}>
          Savings Rate: {savingsRate.toFixed(1)}% (Target: 20%)
        </Typography>

        <LinearProgress
          variant="determinate"
          value={Math.min(Math.max(savingsRate, 0), 100)}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#444",
            "& .MuiLinearProgress-bar": {
              backgroundColor:
                savingsRate >= 20
                  ? "#4CAF50"
                  : savingsRate >= 10
                  ? "#FF9800"
                  : "#F44336",
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Financial Health Indicator */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 1 }}>
          Financial Health Status
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color:
              savingsRate >= 20
                ? "#4CAF50"
                : savingsRate >= 10
                ? "#FF9800"
                : "#F44336",
            fontWeight: 700,
          }}
        >
          {savingsRate >= 20
            ? "Excellent"
            : savingsRate >= 10
            ? "Good"
            : savingsRate >= 0
            ? "Fair"
            : "Needs Attention"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MonthlySummary;
