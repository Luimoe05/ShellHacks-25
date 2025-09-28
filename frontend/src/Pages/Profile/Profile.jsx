import React, { useEffect, useState } from "react";
import ProfileNavbar from "./ProfileNavbar";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    memberSince: "",
    primaryGoal: "",
    monthlyIncome: 0,
    creditScore: 0,
    totalSavings: 0,
    monthsActive: 0,
    timeframe: 0,
    annualSalary: 0,
    housingPayment: 0,
    debtPayment: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Options from your onboarding components
  const goalOptions = [
    "Build emergency fund",
    "Pay off debt",
    "Buy a home",
    "Save for retirement",
    "General budgeting",
    "Build credit",
  ];

  const timeframeOptions = [3, 6, 9, 12, 18, 24];

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env?.VITE_BACKEND_URL}/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile data received:", data); // Debug log
      setUserData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save profile updates
  const saveUserProfile = async (updatedData) => {
    try {
      console.log("Saving profile data:", updatedData); // Debug log
      const response = await fetch(
        `${import.meta.env?.VITE_BACKEND_URL}/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile updated:", data); // Debug log
      setUserData(data);
      setError(null);
      return true;
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await saveUserProfile(editData);
    if (success) {
      setIsEditing(false);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
    setError(null);
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
    errorMessage: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      border: "1px solid rgba(239, 68, 68, 0.5)",
      borderRadius: "8px",
      padding: "16px",
      color: "#EF4444",
      marginBottom: "24px",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      fontSize: "18px",
    },
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  if (loading) {
    return (
      <>
        <ProfileNavbar />
        <div style={styles.container}>
          <div style={styles.loadingContainer}>Loading your profile...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileNavbar />
      <div style={styles.container}>
        {error && (
          <div style={styles.errorMessage}>
            {error}
            <button
              onClick={fetchUserProfile}
              style={{
                marginLeft: "16px",
                padding: "8px 16px",
                backgroundColor: "#EF4444",
                border: "none",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Header Section */}
        <div style={styles.headerCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>{getInitials(userData.name)}</div>

            <div style={styles.profileInfo}>
              <h1 style={styles.profileName}>
                {userData.name || "Anonymous User"}
              </h1>
              <div style={styles.location}>
                <span>📍</span>
                <span>{userData.location || "Location not set"}</span>
              </div>
              <div style={styles.memberSince}>
                Member since {userData.memberSince || "Unknown"}
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

      
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#2E8BC0" }}>📈</div>
            {isEditing ? (
              <input
                type="number"
                value={editData.monthlyIncome || ""}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyIncome",
                    parseFloat(e.target.value) || 0
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
                ${(userData.monthlyIncome || 0).toLocaleString()}
              </div>
            )}
            <div style={styles.statLabel}>Monthly Income</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#E74C3C" }}>🏠</div>
            {isEditing ? (
              <input
                type="number"
                value={editData.housingPayment || ""}
                onChange={(e) =>
                  handleInputChange(
                    "housingPayment",
                    parseFloat(e.target.value) || 0
                  )
                }
                style={{
                  ...styles.input,
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                placeholder="Housing Payment"
              />
            ) : (
              <div style={{ ...styles.statValue, color: "#E74C3C" }}>
                ${(userData.housingPayment || 0).toLocaleString()}
              </div>
            )}
            <div style={styles.statLabel}>Housing Payment</div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, color: "#F39C12" }}>💳</div>
            {isEditing ? (
              <input
                type="number"
                value={editData.debtPayment || ""}
                onChange={(e) =>
                  handleInputChange(
                    "debtPayment",
                    parseFloat(e.target.value) || 0
                  )
                }
                style={{
                  ...styles.input,
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                placeholder="Debt Payment"
              />
            ) : (
              <div style={{ ...styles.statValue, color: "#F39C12" }}>
                ${(userData.debtPayment || 0).toLocaleString()}
              </div>
            )}
            <div style={styles.statLabel}>Debt Payment</div>
          </div>
        </div>

        {/* Financial Goals & Personal Info */}
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
                  <option
                    value=""
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Select a goal...
                  </option>
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
                <span style={styles.chip}>
                  {userData.primaryGoal || "Not set"}
                </span>
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
                  <option
                    value=""
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Select timeframe...
                  </option>
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
                <span style={styles.chipOutlined}>
                  {userData.timeframe || "Not set"}
                </span>
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
              Account Status
            </h3>
            <div style={styles.progressBox}>
              📅 Active for {userData.monthsActive || 0} months
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Personal Information</h2>

            <div style={styles.editableField}>
              <label style={styles.label}>Name (Read Only)</label>
              <div style={styles.readOnlyField}>
                {userData.name || "Not available"}
              </div>
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location || userData.location || ""}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  style={styles.input}
                  placeholder="City, Country"
                />
              ) : (
                <div style={styles.input}>{userData.location || "Not set"}</div>
              )}
            </div>

            <div style={styles.editableField}>
              <label style={styles.label}>Credit Score</label>
              {isEditing ? (
                <select
                  value={editData.creditScore || userData.creditScore}
                  onChange={(e) =>
                    handleInputChange("creditScore", e.target.value)
                  }
                  style={styles.select}
                >
                  <option
                    value=""
                    style={{ backgroundColor: "#333", color: "white" }}
                  >
                    Select credit score range...
                  </option>
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
                <span style={styles.chipOutlined}>
                  {userData.creditScore || "Not set"}
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
