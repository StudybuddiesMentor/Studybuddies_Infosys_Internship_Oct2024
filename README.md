# 📚 StudyBuddies
*A Collaborative Study Platform*

## 🌟 Project Overview

**StudyBuddies** is a web application designed to make studying more effective and collaborative. This app lets users create study cards, organize them into decks, and share them publicly or privately. Public decks can be favorited by others, creating a community-driven environment for shared learning.

---

## 🛠️ Local Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **MongoDB** (for local database setup)

---

### 🔹 Client Setup

1. **Navigate to the Client Directory**  
   ```bash
   cd Studybuddies_Infosys_Internship_Oct2024/client
   ```

2. **Install Dependencies**  
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the Development Server**  
   ```bash
   npm run dev
   ```

---

### 🔹 Backend Setup

1. **Navigate to the Backend Directory**  
   ```bash
   cd Studybuddies_Infosys_Internship_Oct2024/backend
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file for sensitive data:
   ```bash
   touch .env
   ```
   Copy the contents of `.env.sample` and add the following:
   ```plaintext
   GMAIL_ID = your-email@gmail.com  # Your StudyBuddies Gmail account
   GMAIL_PASS = your-google-auth-key # Google App password
   ```

4. **Start the Backend Server**  
   ```bash
   npm start
   ```

---

## 📁 Installation

### Clone the Repository

```bash
git clone https://github.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024.git
```

### Setting Up Client and Backend

**Client-Side Installation**
1. Navigate to `client`:
   ```bash
   cd client
   ```
2. Install and start:
   ```bash
   npm install && npm run dev
   ```

**Backend-Side Installation**
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies and start server:
   ```bash
   npm install && npm start
   ```

---

 # Install dependencies
   
   # Install dependencies On Client Side
   1. cd Studybuddies_Infosys_Internship_Oct2024
   2. cd client
   3. npm install
   4. npm install --legacy-peer-deps
   5. npm run dev

   ** Explanation of Flags
install: This command tells npm to install the dependencies listed in your package.json file.
--legacy-peer-deps: This flag allows npm to ignore peer dependency conflicts. It’s useful if you’re dealing with older packages that have conflicting peer dependencies.
   npm install

# Install dependencies On Backend Side

   1. cd Studybuddies_Infosys_Internship_Oct2024
   2. cd backend
   3. npm install
   4. npm install nodemailer                        // Run the following command to install Nodemailer:
   5. npm start



# Create File 
  new file name:  .env
*copy this and make neccessary changes*
  
  GMAIL_ID = ........@gmail.com     *write studybuddy email*
  GMAIL_PASS = khhtzzbxdlzuxfuz     *passkey generated from google authentication*

# Create DataBase and Collection
* create a database and connect it local host and change db collection name in src / index.js file
  
  example: mongodb://127.0.0.1:27017/test


## 🗄️ Database Configuration

1. **Create a MongoDB Database**  
   Set up a MongoDB database (e.g., `studybuddies_db`) and ensure it is connected locally.
2. **Update Connection String**  
   Add your MongoDB connection URI in `src/index.js`:
   ```javascript
   mongodb://127.0.0.1:27017/studybuddies_db
   ```

---

## 🎨 Key Features

- **Create Study Cards**: Quickly create and organize flashcards.
- **Deck Management**: Organize cards into private or public decks.
- **Favorite Public Decks**: Bookmark public decks from other users to study collaboratively.
- **User-Friendly Interface**: Easy-to-navigate UI, designed for streamlined studying.


---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 
