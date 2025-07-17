# YouAndWe: Community Help Platform

A fullstack web application for posting, browsing, and supporting community help requests.

---

## 🏗️ Project Structure

```
YouAndWe/
  ├── YouAndWe/                # Spring Boot backend
  └── YouAndWeFront/youandwe/  # React frontend (Vite + Tailwind CSS)
```

---

## 🚀 Features
- User registration (username, email, mobile, password)
- Login with username/email/mobile + password
- JWT authentication (secure, stateless)
- Post, browse, and support help requests
- Dashboard for user and community stats
- Protected routes (frontend & backend)
- Modern, responsive UI (Tailwind CSS)
- No phone/SMS/OTP logic (privacy-first)

---

## 🖥️ Backend (Spring Boot)

### **Setup**
1. **Install Java 17+ and Maven**
2. Navigate to the backend directory:
   ```sh
   cd YouAndWe/YouAndWe
   ```
3. **Configure Database**
   - Edit `src/main/resources/application.properties` for your DB settings (H2/MySQL/Postgres supported).
4. **Run the backend:**
   ```sh
   ./mvnw spring-boot:run
   # or
   mvn spring-boot:run
   ```
5. **API runs at:** `http://localhost:8080/api`

### **Key Endpoints**
- `POST   /api/auth/signup`   — Register
- `POST   /api/auth/login`    — Login (returns JWT)
- `GET    /api/helpRequests`  — List all help requests
- `POST   /api/helpRequests`  — Create help request
- `GET    /api/helpRequests/{id}` — View request
- `PUT    /api/helpRequests/{id}` — Update request
- `DELETE /api/helpRequests/{id}` — Delete request

---

## 🌐 Frontend (React + Vite + Tailwind)

### **Setup**
1. **Install Node.js 18+ and npm**
2. Navigate to the frontend directory:
   ```sh
   cd YouAndWe/YouAndWeFront/youandwe
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Run the frontend:**
   ```sh
   npm run dev
   ```
5. **App runs at:** `http://localhost:5173/` (or next available port)

### **Environment**
- The frontend expects the backend at `http://localhost:8080/api` (see `src/utils/api.js`)
- JWT is stored in `localStorage` and attached to all protected requests

---

## 🛡️ Security & Auth
- JWT-based authentication (stateless, secure)
- Protected routes in both backend (Spring Security) and frontend (React Router)
- No phone/SMS/OTP logic for privacy

---

## 📝 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
MIT

---

## 🙏 Credits
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Contact
For questions, suggestions, or support, open an issue or contact the maintainer. 
