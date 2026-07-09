# ⚖️ Legal Case Management System

A cloud-based **Legal Case Management System** built using the **MERN Stack** and **Microsoft Azure**. The system enables legal professionals to efficiently manage cases, clients, and documents while leveraging Azure cloud services for secure hosting, storage, and access management.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Case Management
- Client Management
- Issue Tracking
- Secure Document Upload
- Azure Blob Storage Integration
- Dashboard for Case Overview
- Cloud-Based Deployment
- RESTful APIs

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Multer

## Microsoft Azure
- Azure App Service
- Azure Static Web Apps
- Azure Blob Storage
- Microsoft Entra ID (Azure AD)
- Azure Role-Based Access Control (RBAC)

## DevOps
- GitHub
- GitHub Actions (CI/CD)

---

# ☁️ Azure Services Used

- Azure App Service
- Azure Static Web Apps
- Azure Blob Storage
- Microsoft Entra ID (Azure AD)
- Azure Role-Based Access Control (RBAC)

---

# 📂 Project Structure

```
Legal-Case-Management
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔄 System Workflow

1. User Registration & Authentication
2. JWT Token Generation
3. Case & Client Management
4. Document Upload
5. Files stored securely in Azure Blob Storage
6. Data stored in MongoDB Atlas
7. Frontend communicates with Backend APIs
8. Application deployed on Microsoft Azure

---

# 🌐 Deployment

| Component | Service |
|----------|----------|
| Frontend | Azure Static Web Apps |
| Backend | Azure App Service |
| Database | MongoDB Atlas |
| File Storage | Azure Blob Storage |

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Azure Blob Storage Security
- Microsoft Entra ID
- Azure RBAC
- Environment Variables

---

# 📸 Project Screenshots



### Case Management
<img width="1710" height="902" alt="Screenshot 2026-07-09 at 12 26 44 PM" src="https://github.com/user-attachments/assets/47e792fb-ff41-4134-9beb-ff2d48c995cc" />


### Azure Blob Storage
<img width="1475" height="902" alt="Screenshot 2026-07-10 at 12 59 20 AM" src="https://github.com/user-attachments/assets/e8e329a6-8582-4b89-ad1a-72663c5d8909" />


### Azure App Service
<img width="1475" height="902" alt="Screenshot 2026-07-10 at 1 08 10 AM" src="https://github.com/user-attachments/assets/9c11813d-c68f-437d-8232-edb1b8eecd1c" />


### Microsoft Entra ID
<img width="1102" height="902" alt="Screenshot 2026-07-10 at 12 57 51 AM" src="https://github.com/user-attachments/assets/06092016-0508-4847-a515-97d26321d670" />





---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/vaishnavi2628/legal-case-management.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

AZURE_STORAGE_CONNECTION_STRING=your_connection_string

AZURE_STORAGE_CONTAINER=legal-documents
```

---

# 📈 Future Enhancements

- Hearing Scheduler
- Email Notifications
- AI-powered Legal Document Classification
- Advanced Search & Filters
- Microsoft Entra ID User Login
- Audit Logs
- Report Generation
- Real-Time Notifications

---

# 📄 License

This project is developed for educational purposes.

---

# 🙏 Acknowledgement

This project demonstrates the implementation of a cloud-based Legal Case Management System using the MERN Stack and Microsoft Azure services, including secure application hosting, document storage, identity management, and role-based access control.
