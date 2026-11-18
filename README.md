# 🛒 ShopSphere – E-Commerce & Inventory Management System

ShopSphere is an E-Commerce and Inventory Management System designed to provide a smooth online shopping experience while managing products, orders, customers, and inventory efficiently.

The project includes a customer-facing shopping interface, administrative modules, and a MySQL relational database. Backend API integration is the next development milestone.

## 🚀 Project Overview

ShopSphere aims to simplify online shopping and inventory operations through a structured and user-friendly platform.

**Key highlights:**
- Product browsing and category management
- Shopping cart and wishlist
- Customer account and address management
- Order and payment records
- Product and inventory management
- Relational database with 13 tables

## ✨ Main Features

### 👤 Customer Module
- Browse available products.
- View product details, prices, ratings, and images.
- Add products to the shopping cart.
- Manage wishlist items.
- Manage customer profile.
- Save delivery addresses.
- Place orders and view order history.

### 🛠️ Admin Module
- Manage products.
- Manage product categories.
- Monitor inventory and stock quantities.
- Track stock movements.
- View customer and role information.
- Monitor orders and payment statuses.

## 💻 Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Frontend structure |
| Java | Backend project structure |
| Maven | Java project management |
| MySQL 8.0.46 | Database management |
| SQL | Database queries and operations |
| Git | Version control |
| GitHub | Repository and collaboration |
| Visual Studio Code | Code editing |

## 🗄️ Database Design

The project uses a MySQL database named `shopsphere`, containing 13 relational tables.

| Table | Description |
|---|---|
| users | Customer and admin information |
| roles | User roles |
| categories | Product categories |
| products | Product details and stock |
| carts | Customer shopping carts |
| cart_items | Products in carts |
| wishlists | Customer wishlists |
| wishlist_items | Saved wishlist products |
| addresses | Customer delivery addresses |
| orders | Customer order information |
| order_items | Individual order details |
| payments | Payment records |
| stock_movements | Inventory movement history |

### Database Features
- Primary Keys
- Foreign Keys
- Unique Constraints
- CHECK Constraints
- Referential Integrity
- Indexes
- Sample Data

## 📂 Project Structure

```text
Shopsphere/
│
├── frontend/
│
├── src/
│   └── main/
│       └── java/
│
├── index.html
├── pom.xml
├── .gitignore
│
└── shopsphere_backup.sql
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jayasreekomaripalam-netizen148/Shopsphere.git
```

### 2. Open the Project

```bash
cd Shopsphere
```

Open the project folder in Visual Studio Code or IntelliJ IDEA.

### 3. Database Setup

Make sure MySQL Server is installed and running.

Create the database:

```sql
CREATE DATABASE shopsphere;
```

Select the database:

```sql
USE shopsphere;
```

Import the `shopsphere_backup.sql` file using MySQL Workbench or the MySQL command-line client.

Verify the tables:

```sql
SHOW TABLES;
```

You should see the 13 database tables.

### 4. Backend Integration

The frontend and database are intended to communicate through the backend application layer.

The backend developer will complete API integration, database connectivity, authentication, and business logic.

## 🧪 Database Testing

The database was tested through:

- Table structure verification.
- Foreign key and constraint inspection.
- Product listing queries.
- Stock availability queries.
- Order and payment queries.
- Sales aggregation.
- Database backup and restoration.

The SQL backup was successfully restored into a separate test database.

## 🔄 GitHub Contribution

The database backup was uploaded using a separate Git branch.

**Branch:** `add-database-backup`

**Commit:** `de5c587`

**Commit Message:** `Add ShopSphere database backup`

The Pull Request was successfully merged into the `main` branch.

## 📌 Project Status

### Completed
- MySQL database creation.
- 13 relational tables.
- Sample data insertion.
- SQL query testing.
- Database backup and restoration.
- GitHub database backup contribution.

### Upcoming Development
- Backend API integration.
- Frontend and backend connectivity.
- Authentication and authorization.
- Complete order processing.
- Payment gateway integration.
- End-to-end application testing.

## 🔮 Future Scope

- Secure online payment integration.
- Advanced inventory analytics.
- Automated stock alerts.
- Order tracking.
- Improved security and role-based access.
- Cloud deployment.

## 👨‍💻 Project Contributor

**Amit Shanker Pandey**
**sunny raj kumar**
**jayashree**

**Project:** ShopSphere – E-Commerce & Inventory Management System

**GitHub Repository:**  
https://github.com/jayasreekomaripalam-netizen148/Shopsphere

---

⭐ If you find this project interesting, feel free to explore the repository.
