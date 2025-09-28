import React, { useEffect, useState } from "react";
import ProfileNavbar from "./ProfileNavbar";

function Profile() {
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    age: 28,
    location: "San Francisco, CA",
    memberSince: "January 2024",
    primaryGoal: "Build emergency fund",
    interestCategory: "investing",
    monthlyIncome: 4500,
    creditScore: "750-799",
    totalSavings: 12500,
    monthsActive: 8,
    timeframe: "12 months",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Options from your onboarding components
  const goalOptions = [
    "Build emergency fund",
    "Pay off debt",
    "Buy a home",
    "Save for retirement",
    "General budgeting",
    "Build credit",
  ];

  const interestOptions = [
    { value: "investing", label: "Investing & markets" },
    { value: "budgeting", label: "Budgeting & saving" },
    { value: "credit", label: "Build credit" },
    { value: "debt", label: "Pay off debt" },
    { value: "retirement", label: "Retirement & long-term" },
    { value: "smallbiz", label: "Small business finances" },
    { value: "other", label: "Other" },
  ];

  const creditScoreOptions = [
    "600-649",
    "650-699",
    "700-749",
    "750-799",
    "800+",
  ];

  const timeframeOptions = [
    "3 months",
    "6 months",
    "9 months",
    "12 months",
    "18 months",
    "24 months",
  ];

  useEffect(() => {
    // Fetch user data from your backend
    // fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    // Save to backend
    // saveUserProfile(editData);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "white",
      padding: "32px",
      fontFamily: "system-ui, sans-serif",
    },
    headerCard: {
      background: "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
      borderRadius: "24px",
      padding: "32px",
      marginBottom: "32px",
      position: "relative",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
      flexWrap: "wrap",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      border: "4px solid rgba(255,255,255,0.3)",
      backgroundColor: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "bold",
      color: "white",
    },
    profileInfo: {
      flex: 1,
      minWidth: "250px",
    },
    profileName: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "8px",
      margin: 0,
    },
    location: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px",
      fontSize: "20px",
    },
    memberSince: {
      opacity: 0.9,
      fontSize: "16px",
    },
    editButton: {
      backgroundColor: "rgba(255,255,255,0.2)",
      border: "none",
      borderRadius: "8px",
      padding: "12px 24px",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "all 0.2s ease",
      ":hover": {
        backgroundColor: "rgba(255,255,255,0.3)",
      },
    },
    saveButton: {
      background: "linear-gradient(135deg, #3BB273 0%, #2E8BC0 100%)",
      border: "none",
      borderRadius: "8px",
      padding: "12px 24px",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: "12px",
      transition: "all 0.2s ease",
    },
    cancelButton: {
      backgroundColor: "#666",
      border: "none",
      borderRadius: "8px",
      padding: "12px 24px",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginBottom: "32px",
    },
    statCard: {
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      padding: "24px",
      textAlign: "center",
    },
    statIcon: {
      fontSize: "40px",
      marginBottom: "8px",
    },
    statValue: {
      fontSize: "32px",
      fontWeight: "bold",
      margin: "8px 0",
    },
    statLabel: {
      opacity: 0.8,
      fontSize: "14px",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      padding: "24px",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "24px",
      margin: "0 0 24px 0",
    },
    editableField: {
      marginBottom: "16px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "8px",
      fontSize: "16px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    chip: {
      background: "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
      color: "white",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      display: "inline-block",
    },
    chipOutlined: {
      border: "2px solid #2E8BC0",
      color: "#2E8BC0",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      backgroundColor: "transparent",
      display: "inline-block",
      textTransform: "capitalize",
    },
    divider: {
      height: "1px",
      backgroundColor: "rgba(255,255,255,0.1)",
      margin: "16px 0",
      border: "none",
    },
    progressBox: {
      backgroundColor: "rgba(59, 178, 115, 0.2)",
      borderRadius: "8px",
      padding: "16px",
      color: "#3BB273",
    },
    readOnlyField: {
      backgroundColor: "rgba(255,255,255,0.05)",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ccc",
      fontSize: "14px",
    },
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getInterestLabel = (value) => {
    const interest = interestOptions.find((opt) => opt.value === value);
    return interest ? interest.label : value;
  };

  return (
    <>
      <ProfileNavbar />
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.headerCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>{getInitials(userData.name)}</div>

            <div style={styles.profileInfo}>
              <h1 style={styles.profileName}>{userData.name}</h1>
              <div style={styles.location}>
                <span>📍</span>
                <span>{userData.location}</span>
              </div>
              <div style={styles.memberSince}>
                Member since {userData.memberSince} • Age {userData.age}
              </div>
            </div>

            {!isEditing ? (
              <button style={styles.editButton} onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <div>
                <button style={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
                <button style={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#3BB273" }}>🏦</div>
            <div style={{ ...styles.statValue, color: "#3BB273" }}>
              ${userData.totalSavings.toLocaleString()}
            </div>
            <div style={styles.statLabel}>Total Savings</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#2E8BC0" }}>📈</div>
            {isEditing ? (
              <input
                type="number"
                value={editData.monthlyIncome || ""}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyIncome",
                    parseInt(e.target.value) || 0
                  )
                }
                style={{
                  ...styles.input,
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                placeholder="Monthly Income"
              />
            ) : (
              <div style={{ ...styles.statValue, color: "#2E8BC0" }}>
                ${userData.monthlyIncome.toLocaleString()}
              </div>
            )}
            <div style={styles.statLabel}>Monthly Income</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#3BB273" }}>📊</div>
            {isEditing ? (
              <select
                value={editData.creditScore || userData.creditScore}
                onChange={(e) =>
                  handleInputChange("creditScore", e.target.value)
                }
                style={{
                  ...styles.select,
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {creditScoreOptions.map((score) => (
                  <option
                    key={score}
                    value={score}
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    {score}
                  </option>
                ))}
              </select>
            ) : (
              <div style={{ ...styles.statValue, color: "#3BB273" }}>
                {userData.creditScore}
              </div>
            )}
            <div style={styles.statLabel}>Credit Score</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#2E8BC0" }}>⏱️</div>
            <div style={{ ...styles.statValue, color: "#2E8BC0" }}>
              {userData.monthsActive}
            </div>
            <div style={styles.statLabel}>Months Active</div>
          </div>
        </div>

        {/* Financial Goals & Interests */}
        <div style={styles.contentGrid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Financial Goals</h2>

            <div style={styles.editableField}>
              <label style={styles.label}>Primary Goal</label>
              {isEditing ? (
                <select
                  value={editData.primaryGoal || userData.primaryGoal}
                  onChange={(e) =>
                    handleInputChange("primaryGoal", e.target.value)
                  }
                  style={styles.select}
                >
                  {goalOptions.map((goal) => (
                    <option
                      key={goal}
                      value={goal}
                      style={{ backgroundColor: "#333", color: "white" }}
                    >
                      {goal}
                    </option>
                  ))}
                </select>
              ) : (
                <span style={styles.chip}>{userData.primaryGoal}</span>
              )}
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Timeframe</label>
              {isEditing ? (
                <select
                  value={editData.timeframe || userData.timeframe}
                  onChange={(e) =>
                    handleInputChange("timeframe", e.target.value)
                  }
                  style={styles.select}
                >
                  {timeframeOptions.map((time) => (
                    <option
                      key={time}
                      value={time}
                      style={{ backgroundColor: "#333", color: "white" }}
                    >
                      {time}
                    </option>
                  ))}
                </select>
              ) : (
                <span style={styles.chipOutlined}>{userData.timeframe}</span>
              )}
            </div>

            <hr style={styles.divider} />
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
                fontSize: "16px",
              }}
            >
              Progress This Month
            </h3>
            <div style={styles.progressBox}>
              📈 On track to save $800 this month
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Personal Information</h2>

            <div style={styles.editableField}>
              <label style={styles.label}>Name (Read Only)</label>
              <div style={styles.readOnlyField}>{userData.name}</div>
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Age (Read Only)</label>
              <div style={styles.readOnlyField}>{userData.age} years old</div>
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location || userData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  style={styles.input}
                  placeholder="Enter your location"
                />
              ) : (
                <div style={styles.input}>{userData.location}</div>
              )}
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Primary Interest</label>
              {isEditing ? (
                <select
                  value={editData.interestCategory || userData.interestCategory}
                  onChange={(e) =>
                    handleInputChange("interestCategory", e.target.value)
                  }
                  style={styles.select}
                >
                  {interestOptions.map((interest) => (
                    <option
                      key={interest.value}
                      value={interest.value}
                      style={{ backgroundColor: "#333", color: "white" }}
                    >
                      {interest.label}
                    </option>
                  ))}
                </select>
              ) : (
                <span style={styles.chipOutlined}>
                  {getInterestLabel(userData.interestCategory)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
