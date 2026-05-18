# Backend - Smart Leads Dashboard

## Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control
- Leads CRUD APIs
- Filtering, Search, Sorting
- Pagination
- TypeScript Support

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Lead Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/leads | Get all leads |
| GET | /api/leads/:id | Get single lead |
| POST | /api/leads | Create lead |
| PUT | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead |

## Query Parameters

| Parameter | Description |
|---|---|
| search | Search by name/email |
| status | Filter by status |
| source | Filter by source |
| sort | latest / oldest |
| page | Pagination |

## Run Locally

```bash
npm install
npm run dev
````

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```