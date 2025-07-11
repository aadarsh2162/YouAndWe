# YouAndWe - Community Help Platform

A modern web application that connects people who need help with those who want to offer support in their community.

## 🚀 Features

### Core Functionality
- **Browse Help Requests**: View and search through community help requests
- **Post Requests**: Create new help requests with categories and details
- **Offer Support**: One-click support offering with email notifications
- **Contact Information**: Access contact details for request creators
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Modern UI with Tailwind CSS

### Technical Features
- **Frontend**: React.js with Vite
- **Backend**: Spring Boot with JPA/Hibernate
- **Database**: H2 (in-memory for development)
- **Authentication**: JWT tokens
- **Email Notifications**: SMTP integration
- **Security**: Spring Security with CORS support

## 🛠️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd YouAndWe/YouAndWe
   ```

2. **Configure Email Settings** (Optional):
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   ```

3. **Start the backend server**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access H2 Database Console** (Optional):
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:youandwe`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd YouAndWeFront/youandwe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## 📧 Email Configuration

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Update `application.properties` with your credentials

### Alternative Email Providers
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com`
- **SendGrid**: Use `smtp.sendgrid.net` with API key

## 🔒 Security Configuration

The application uses Spring Security with JWT authentication:

### Public Endpoints (No Authentication Required)
- `/api/auth/**` - Login, register, JWT endpoints
- `/api/requests` - Browse requests
- `/api/requests/{id}` - View request details
- `/api/requests/{id}/contact` - Get contact information
- `/api/support-offers/**` - Create support offers

### Protected Endpoints (Authentication Required)
- `/api/users/**` - User management
- `/api/requests/create` - Create requests
- `/api/requests/{id}/update` - Update requests
- `/api/requests/{id}/delete` - Delete requests
- `/api/dashboard/**` - User dashboard

## 🎨 UI Features

### Modern Design
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Glass Morphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful visual design
- **Smooth Animations**: Enhanced user experience

### Components
- **Request Cards**: Display help requests with categories
- **Search & Filter**: Find specific requests
- **Contact Modal**: View creator contact information
- **Support Offer**: One-click support offering
- **Loading States**: User feedback during operations

## 📱 User Flow

1. **Browse Requests**: Users can view all help requests without logging in
2. **Offer Support**: Click "Offer Support" to help someone (requires login)
3. **Email Notification**: Request creator receives email with supporter details
4. **Contact**: Access contact information to coordinate help
5. **Post Requests**: Logged-in users can create their own help requests

## 🔧 Development

### Project Structure
```
YouAndWe/
├── src/main/java/com/youandwe/
│   ├── controller/     # REST API controllers
│   ├── service/        # Business logic
│   ├── dto/           # Data transfer objects
│   ├── config/        # Configuration classes
│   └── security/      # JWT and security
└── src/main/resources/
    └── application.properties

YouAndWeFront/
└── youandwe/
    ├── src/
    │   ├── components/ # React components
    │   ├── pages/      # Page components
    │   ├── layouts/    # Layout components
    │   └── utils/      # Utility functions
    └── package.json
```

### API Endpoints
- `GET /api/requests` - Get all requests
- `GET /api/requests/{id}` - Get specific request
- `GET /api/requests/{id}/contact` - Get contact info
- `POST /api/support-offers` - Create support offer
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file: `mvn clean package`
2. Run: `java -jar target/YouAndWe-0.0.1-SNAPSHOT.jar`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy the `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**YouAndWe** - Building stronger communities through mutual support! 🤝
