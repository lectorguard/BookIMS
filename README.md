# Inventory Management System for Books

Simple react application for front-end and a sqlite express app for back-end.

# Features 

- Display book inventory in a table
- Filter inventory based on columns : Title, Author, Genre, Release and ISBN
- Adding new books via form
- Export books as json based on query

# Technologies

- React
- Typescript
- SQLite
- Express

# Prerequisites

- Node.js
- Tested on Windows 10 and Firefox browser

# Set Up

- Clone the repository `git clone git@github.com:lectorguard/BookIMS.git` or `git clone https://github.com/lectorguard/BookIMS.git`
- Inside the BookIMS folder run `npm install`
- Run `npm run start` to start the client app and the server app together
    - Alternatively run `npm run dev` for client and `npm run api` for server
- Web app runs in browser on `http://localhost:3000/base`

# Usage

- Add book to inventory
    - Fill form on the right side of the screen
    - Clicking  `Add Book` triggers validation
    - On success, message is printed under the form

![alt text](documentation/AddBook.JPG)

- Books List
    - Based on the local search and database filters books are shown in the main table
- DB Search
    - Click on the filter icon next to the search bar (yellow indicated)
    - Fill the form based on column, operator and search value
    - By clicking Add, the filter is added as DB filter to the search bar
    - You can add multiple filter by filling the form multiple times or writing the db filter by yourself in format `{<column><operator><value>}`
    - The book table shows automatically the search result 
- Local Search
    - Based on the result of the DB search, you can make a search based on any key words by typing it after the db search queries like 
    `{genre='Horror'} Dracula`

![alt text](documentation/BookTable.JPG)


- Export 
    - You can export the current result of a query or a single book by clicking on the three dots of table header or of a single entry (indicated yellow)
    - When clicking export, a json file containing the selected books is downloaded (indicated yellow)

![alt text](documentation/Export.JPG)

- Demo
    - Can be found in documentation folder

![](documentation/Demo.mov)

# Relevant Code 

- The relevant code for this project is located in two folders
    - `src/components/sections/dashboard/`
    - `src/components/database/`
- Database is created on the fly when running the project in the project root (`books.db`)

# Design Decisions 

- The design is based on a theme from [themewagon](https://themewagon.com/), which brings out of the box adaption to screen sizes and modern UI
- All adoptions of the design were derived from the themewagon theme

# Challenges 

- The biggest challenge was the conversion from the database book format to a more strict client side Book format : 
    - Conversion of different date formats
    - Conversion of ISBN formats
- Validation of inputs in the Add Book form
- Internal validation of database queries





