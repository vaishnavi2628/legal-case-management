const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();
const caseRoutes = require("./routes/caseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const clientRoutes = require("./routes/clientRoutes");
const issueRoutes = require("./routes/issueRoutes");



app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/cases", caseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/upload", uploadRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Legal Case Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});