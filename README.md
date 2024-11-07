
# Studybuddies_Infosys_Internship_Oct2024

# Project Title
Studybuddies

# Local Setup Instructions

## Client Setup
1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend directory:
   ```bash
   touch .env
   ```

3. Copy the contents of `.env.sample` into the newly created `.env` file.

4. Start the backend server:
   ```bash
   npm run start
   ```


## Description
StudyBuddies aims to streamline the  studying process by providing a user-friendly web application. This application allows users to create and organize their study materials (Cards) into private or public decks. Public decks can be favorited by other users, fostering a collaborative community for studying and note-sharing.

## Installation
1. Clone the repo:
   ```bash

   git clone https://github.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024.git


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
