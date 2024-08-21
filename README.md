# Personal Notes API

This project is a simple RESTful API for managing personal notes. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on notes, which are stored in a JSON file. 
The project is built using Node.js and Express.

## Features

- **Create a Note**: Add a new note with a title and content.
- **Read Notes**: Retrieve all notes or a single note by ID.
- **Update a Note**: Modify the title and/or content of an existing note.
- **Delete a Note**: Remove a note by its ID.

## Requirements

- Node.js (version 12.x or higher)
- npm (version 6.x or higher)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/personal-notes-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd personal-notes-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To start the server, use the following command:

```bash
npm start
 ```
By default, the server will run on http://localhost:3000.

## Usage

### 1. **GET /notes**
   - Open **Postman**.
   - Set the request type to **GET**.
   - Enter the URL: `http://localhost:3000/notes`
   - Click **Send**.
   - Review the response in the **Body** tab to see the list of notes.

### 2. **POST /notes**
   - Set the request type to **POST**.
   - Enter the URL: `http://localhost:3000/notes`
   - Go to the **Body** tab and select **raw**.
   - Choose **JSON** from the dropdown menu.
   - Enter the JSON data:
     ```json
     {
       "title": "New Note",
       "content": "This is a new note."
     }
     ```
   - Click **Send**.
   - Check the response for the details of the new note created.

### 3. **GET /notes/:id**
   - Set the request type to **GET**.
   - Enter the URL: `http://localhost:3000/notes/1` (replace `1` with the ID of the note you want to retrieve)
   - Click **Send**.
   - Review the response to see the details of the note with the specified ID.

### 4. **PUT /notes/:id**
   - Set the request type to **PUT**.
   - Enter the URL: `http://localhost:3000/notes/1` (replace `1` with the ID of the note you want to update)
   - Go to the **Body** tab and select **raw**.
   - Choose **JSON** from the dropdown menu.
   - Enter the JSON data:
     ```json
     {
       "title": "Updated Note Title",
       "content": "Updated content of the note."
     }
     ```
   - Click **Send**.
   - Verify the response to ensure the note was updated successfully.

### 5. **DELETE /notes/:id**
   - Set the request type to **DELETE**.
   - Enter the URL: `http://localhost:3000/notes/1` (replace `1` with the ID of the note you want to delete)
   - Click **Send**.
   - Check the response to ensure the note was deleted.

## Error Handling

- **400 Bad Request:** Invalid request data.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Server or data issues.

