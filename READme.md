Backend Assessment: School Management System

Build a School Management System REST API using Node.js and Express.js.

This is a backend-only project. There is no frontend and no real database.

Use dummy/in-memory data such as arrays to simulate your database.

Authentication

Implement user authentication with:

POST /api/auth/register
POST /api/auth/login

Users should be able to register and log in.

Use:

* JWT for authentication
* bcrypt for password hashing
* Input validation
* Environment variables

The system should support:

admin
teacher
student

Students

Create endpoints to:

POST   /api/students
GET    /api/students
GET    /api/students/:id
PUT    /api/students/:id
DELETE /api/students/:id

A student should contain information such as:

id
name
email
phone
class
createdAt

Teachers

Create endpoints to:

POST   /api/teachers
GET    /api/teachers
GET    /api/teachers/:id
PUT    /api/teachers/:id
DELETE /api/teachers/:id

A teacher should contain information such as:

id
name
email
phone
subject
createdAt

Classes

Create endpoints to:

POST   /api/classes
GET    /api/classes
GET    /api/classes/:id
PUT    /api/classes/:id
DELETE /api/classes/:id

Subjects

Create endpoints to:

POST   /api/subjects
GET    /api/subjects
GET    /api/subjects/:id
PUT    /api/subjects/:id
DELETE /api/subjects/:id

Student Results

Create endpoints to:

POST   /api/results
GET    /api/results
GET    /api/results/:id
PUT    /api/results/:id
DELETE /api/results/:id

A result should contain:

id
studentId
subjectId
score
grade
term
session

Authorization

Implement role-based authorization.

Admin

Admin users can:

* Create, view, update and delete students.
* Create, view, update and delete teachers.
* Create, view, update and delete classes.
* Create, view, update and delete subjects.
* Manage student results.

Teacher

Teachers can:

* View students.
* View classes.
* View subjects.
* Create results.
* View results.
* Update results.

Teachers should not be able to manage administrators or delete students/teachers.

Student

Students can:

* View their own profile.
* View their class.
* View subjects.
* View their own results.

Students should not be able to create, update, or delete school records.

Authentication Middleware

Create middleware that:

* Checks for the JWT token.
* Verifies the token.
* Identifies the authenticated user.
* Adds the user information to req.user.
* Rejects unauthenticated requests.

Authorization Middleware

Create middleware that checks the user’s role before allowing access to protected routes.

Return:

401 Unauthorized

when the user is not authenticated.

Return:

403 Forbidden

when the user is authenticated but does not have permission to perform the requested action.

Validation

All incoming requests must be validated.

Validate things such as:

* Required fields.
* Email format.
* Password requirements.
* Valid IDs.
* Valid scores.
* Valid roles.
* Valid request body data.

Security

Your backend should:

* Hash passwords using bcrypt.
* Never store plain-text passwords.
* Never return passwords in API responses.
* Store JWT secrets in .env.
* Protect private routes.
* Validate incoming data.
* Use appropriate HTTP status codes.
* Avoid exposing sensitive information.

Error Handling

Create a global error-handling middleware.

Errors should return consistent responses such as:

{
  "success": false,
  "message": "Student not found"
}

Logger

Implement request logging that records information such as:

HTTP method
Request URL
Status code
Timestamp

Rate Limiting

Add rate limiting to your API.

At minimum, apply it to:

POST /api/auth/register
POST /api/auth/login

Dummy Data

Do not use a real database.

Use arrays or other in-memory data structures to simulate:

users
students
teachers
classes
subjects
results

The data should be properly related using IDs.

For example:

Student
   ↓
studentId
   ↓
Result
   ↓
subjectId
   ↓
Subject

Project Structure

Organize your backend properly.

Example:

src/
├── controllers/
├── routes/
├── middleware/
├── validators/
├── utils/
├── data/
├── app.js
└── server.js

API Testing

Test your API using Postman or Thunder Client.

Your tests should demonstrate:

* Registration.
* Login.
* JWT authentication.
* Protected routes.
* Role-based authorization.
* Student CRUD.
* Teacher CRUD.
* Class CRUD.
* Subject CRUD.
* Result management.
* Validation errors.
* Unauthorized requests.
* Forbidden requests.
* Error handling.

Deliverables

Submit:

* Complete backend source code.
* Proper project structure.
* Authentication system.
* JWT middleware.
* Authorization middleware.
* All required CRUD endpoints.
* Input validation.
* Error handling.
* Logger.
* Rate limiting.
* .env configuration.
* Postman/Thunder Client collection.
* README with setup instructions.

No frontend. No real database. Focus on building a clean, secure, well-structured REST API.