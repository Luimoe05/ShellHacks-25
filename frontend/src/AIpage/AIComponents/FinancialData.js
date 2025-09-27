import {
  AttachMoneyRounded,
  TrendingUpRounded,
  AccountBalanceWalletRounded,
  CreditCardRounded,
} from "@mui/icons-material";

// --- Placeholder Data for Key Metrics ---
export const METRICS = [
  {
    title: "Total Balance",
    value: "$52,100.50",
    icon: AttachMoneyRounded,
    color: "#3BB273",
    trend: "+$1,500",
  },
  {
    title: "Monthly Income",
    value: "$6,800.00",
    icon: TrendingUpRounded,
    color: "#2E8BC0",
    trend: "+12%",
  },
  {
    title: "Monthly Expenses",
    value: "$3,150.25",
    icon: CreditCardRounded,
    color: "#EF5350",
    trend: "-$150",
  },
  {
    title: "Savings Goal",
    value: "75%",
    icon: AccountBalanceWalletRounded,
    color: "#FFA726",
    trend: "On Track",
  },
];

// --- Placeholder Data for Recent Transactions ---
export const TRANSACTIONS = [
  {
    id: 1,
    description: "Salary Deposit",
    amount: "+6800.00",
    date: "Oct 1",
    type: "income",
  },
  {
    id: 2,
    description: "Grocery Store",
    amount: "-150.75",
    date: "Sep 30",
    type: "expense",
  },
  {
    id: 3,
    description: "Netflix Subscription",
    amount: "-22.99",
    date: "Sep 28",
    type: "expense",
  },
  {
    id: 4,
    description: "Investment Gain",
    amount: "+500.00",
    date: "Sep 27",
    type: "income",
  },
  {
    id: 5,
    description: "Rent Payment",
    amount: "-1800.00",
    date: "Sep 26",
    type: "expense",
  },
];
