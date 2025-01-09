# Player-Table-Website
# Players Table Application README

## Overview

This web application retrieves data from Google Cloud Storage (GCS) and displays it in a user-friendly table format on the UI. The primary goal of the application is to fetch the data from the provided GCS JSON file and present it with a clean and interactive interface.

### Table Columns

The table displays the following columns:

- **id**
- **name**
- **status**
- **description**
- **delta**
- **createdOn**

### Features

The table provides the following features for better usability:

- **Free text search** by `name`
- **Filtering** by `status` value
- **Pagination** with 20 entries per page
- **Row ordering** by `id`, `name`, and `createdOn` (Click on the respective column name to sort)

### Data Handling

- The API call to Google Cloud Storage is managed entirely in the backend.
- Filtering, pagination, and data manipulation are all handled server-side.
- The frontend retrieves already processed data through a REST API call from the backend.
- **Note:**
 There is an issue with the `createdOn` data, as it is currently in timestamp format. The conversion to a valid date format was not fully understood during development.

## Tech Stack

### Backend

- **Java 17** with **Spring Boot**
- The backend handles all data retrieval, processing, and API endpoints.

### Frontend

- **React** with **Vite**
- This is one of my first applications developed using React, as I have a stronger background in HTML, CSS, and JavaScript.

## Running the Application

To run the application successfully, ensure both the backend and frontend are properly set up and running.

### Backend

Ensure the backend server built with **Java 17 and Spring Boot** is running before launching the frontend.

### Frontend

1. Navigate to the `FrontEnd Table King` directory.
2. Run the following commands in the terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Press `H` in the terminal to view available options, such as restarting the server, stopping the server, and opening the app in the browser.
## Developed by Alex Man.
