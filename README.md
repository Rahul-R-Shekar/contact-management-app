# Contact Management App

## Overview

This full-stack application allows users to manage contacts (CRUD operations) with a modern Angular frontend and a robust Node.js/Express backend connected to MongoDB. It showcases Angular best practices including reactive and template-driven forms, custom directives, services with dependency injection, and routing. The app includes a responsive contacts list with search/pagination, modals for add/edit, and a legacy template-driven form for comparison.

### Screenshots/GIFs

Add screenshots or GIFs here for better visualization (use tools like Snipping Tool or LICEcap to capture):

- **List Page**: ![Contacts List](screenshots/contacts-list.png)  
  (Shows the DataTable with contacts, search bar, and action buttons.)

- **Modal Open (Add/Edit Contact)**: ![Add/Edit Modal](screenshots/add-modal.gif)  
  (Demonstrates opening the modal, form validation, and success message after submit.)

- **Template-Driven Page**: ![Legacy Form](screenshots/legacy-form.png)  
  (Displays the simple form at `/legacy-form` with success confirmation after submission.)

Place image files in a `screenshots/` folder in the repo root and commit them.

## Tech Stack & Versions

### Frontend (client/)
- **Angular**: 16.0.2 (Core, Forms, Router, etc.)
- **Bootstrap**: 5.3.0 (Styling and modals)
- **DataTables.net**: 1.13.6 (Table with sorting, searching, pagination)
- **jQuery**: 3.7.0 (For DataTables integration)
- **RxJS**: ~7.8.0 (Observables for HTTP)
- **TypeScript**: ~5.0.4
- **Other**: Zone.js ~0.13.0, TSLib ^2.5.0

### Backend (server/)
- **Node.js**: v18+ (Runtime)
- **Express**: ^5.1.0 (Web framework)
- **Mongoose**: ^8.18.2 (MongoDB ODM)
- **CORS**: ^2.8.5 (Cross-origin requests)
- **dotenv**: ^17.2.2 (Environment variables)
- **Nodemon**: ^3.1.10 (Dev server restart)

### Database
- **MongoDB**: Local or cloud (Atlas); no specific version lock, compatible with Mongoose 8.x

### Development Tools
- **Angular CLI**: 16.0.2
- **npm**: For package management

## Features

### Frontend Features
- **Contacts List Page (/)**:
  - Displays all contacts in a responsive DataTable with sorting, searching, and pagination.
  - Columns: Name, Email, Phone, Actions (Edit/Delete buttons).
  - Add Contact button to open modal.
  - Real-time table refresh after CRUD operations without page reload.

- **Add/Edit Contact Modal**:
  - Reactive form with FormBuilder and FormGroup.
  - Fields: Name (required, max 50 chars), Email (required, valid email), Phone (required).
  - Validation: Real-time error messages for invalid inputs.
  - Loading spinner during submission.
  - Success message on add/update, auto-closes modal after 2 seconds.
  - Handles email uniqueness errors from backend.
  - Edit mode pre-fills form with selected contact data.

- **Legacy Template-Driven Form (/legacy-form)**:
  - Simple template-driven form using ngForm and ngModel.
  - Fields: Name, Email, Phone (all required).
  - Submits to the same API endpoint as the modal.
  - Displays success message ("Contact added successfully!") and resets form on success.
  - Shows error message on failure.

- **Custom Directives**:
  - `autofocusInvalid`: Applied to form inputs; focuses the first invalid field after form submission.
  - `onlyNumbers`: Applied to phone input; restricts input to numeric characters only.

- **Services & Dependency Injection**:
  - `DataService`: Injectable service handling all HTTP calls (GET, POST, PUT, DELETE) using HttpClient.
  - Components inject DataService; no direct HttpClient usage in components.
  - Observable-based API calls with error handling.

- **Routing & Navigation**:
  - Angular Router with routes for / (contacts list) and /legacy-form.
  - Lazy loading not implemented (small app), but modular structure.

- **Responsive Design**:
  - Bootstrap 5 for styling, modals, and layout.
  - Mobile-friendly table and forms.

### Backend Features
- **RESTful API**:
  - Base path: `/api/contacts`
  - Endpoints: GET (list), POST (create), PUT (update), DELETE (delete).
  - JSON request/response format.
  - CORS enabled for frontend origin.

- **Data Validation & Error Handling**:
  - Email uniqueness enforced at database level.
  - Required fields validation.
  - Centralized error handler middleware for 400, 404, 500 responses.
  - Custom error messages (e.g., "Email already exists").

- **Database Integration**:
  - MongoDB with Mongoose ODM.
  - Contact schema: _id (ObjectId), name (String, max 50), email (String, unique), phone (String).
  - Connection handling with retry and error logging.

- **Additional Routes**:
  - `/`: Welcome message.
  - `/ping`: Health check (returns "pong").

## Setup and Run Steps

### Prerequisites
- Node.js (v18+)
- MongoDB (install locally via Homebrew: `brew install mongodb-community` or use MongoDB Atlas for cloud)
- Git (for repo cloning)

### Environment Variables
- **Backend** (`server/.env` - create if missing):
  ```
  MONGODB_URI=mongodb://localhost:27017/contactapp  # Local MongoDB; update for Atlas
  PORT=3030  # Server port
  ```
- **Frontend** (in `client/src/environments/environment.ts`):
  ```
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:3030/api'  // Backend API base URL
  };
  ```
  For production (`environment.prod.ts`), update `apiUrl` to your deployed backend.

### Backend Setup & Run
1. Clone the repo: `git clone <repo-url> contactapp && cd contactapp/server`
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB URI (see above).
4. Start MongoDB service: `brew services start mongodb/brew/mongodb-community` (macOS) or ensure it's running.
5. Run the server: `npm start` (or `npm run dev` for nodemon in development).
   - Server listens on `http://localhost:3030`.
   - Test: `curl http://localhost:3030/api/contacts`

### Frontend Setup & Run
1. From repo root: `cd client`
2. Install dependencies: `npm install`
3. Run dev server: `ng serve` (or `npm start`).
   - App available at `http://localhost:4200` (auto-reloads on changes).
   - If port conflict, it will prompt for a new one (e.g., 62899).

### Full Stack Run
- Start backend first (port 3030).
- Then start frontend (port 4200).
- Open `http://localhost:4200/` in browser.

For production build: `ng build --prod` (outputs to `dist/`); serve with a static server.

## API Endpoints Summary

All endpoints under `/api` (base: `http://localhost:3030/api`). Uses JSON for requests/responses. CORS enabled for `http://localhost:4200`.

- **GET /contacts**  
  Retrieve all contacts.  
  Response: `200 { contacts: [Contact[]] }`  
  Example: `curl http://localhost:3030/api/contacts`

- **POST /contacts**  
  Create a new contact. Body: `{ name: string, email: string, phone: string }` (required).  
  Validates email uniqueness.  
  Response: `201 { contact: Contact }` or `400 { message: 'Email already exists' }`  
  Example: `curl -X POST http://localhost:3030/api/contacts -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'`

- **PUT /contacts/:id**  
  Update contact by ID. Body: `{ name?: string, email?: string, phone?: string }`.  
  Response: `200 { contact: Contact }` or `404 { message: 'Contact not found' }`  
  Example: `curl -X PUT http://localhost:3030/api/contacts/123 -H "Content-Type: application/json" -d '{"name":"Updated Name"}'`

- **DELETE /contacts/:id**  
  Delete contact by ID.  
  Response: `204 No Content` or `404 { message: 'Contact not found' }`  
  Example: `curl -X DELETE http://localhost:3030/api/contacts/123`

Contact Schema: `{ _id: ObjectId, name: string (max 50), email: string (unique), phone: string }`

## DataTables.net Integration & Refresh After CRUD

DataTables is integrated in `client/src/app/features/contacts/contacts-list/contacts-list.component.ts` for the contacts table:

- **Initialization**: In `ngAfterViewInit()`, jQuery initializes DataTables on `#contactsTable`:
  ```typescript
  this.dataTable = ($('#contactsTable') as any).DataTable({
    columns: [
      { data: 'name' },
      { data: 'email' },
      { data: 'phone' },
      { data: null, orderable: false, render: (data, type, row) => /* Edit/Delete buttons */ }
    ]
  });
  ```
  - Event listeners attached for edit/delete buttons using jQuery delegation.
  - Requires importing jQuery and DataTables in the component.

- **Refresh After CRUD**: After add/update/delete (via modal success event or direct delete), `loadContacts()` is called:
  ```typescript
  loadContacts(): void {
    this.dataService.getContacts().subscribe(data => {
      this.contacts = data;
      if (this.dataTable) {
        this.dataTable.clear();  // Clear existing rows
        this.dataTable.rows.add(this.contacts);  // Add new data
        this.dataTable.draw();  // Redraw table
      }
    });
  }
  ```
  - Subscribes to modal's `onSuccess` event: `this.modal.onSuccess.subscribe(() => this.loadContacts());`
  - Ensures table updates without full page reload, maintaining search/sort state where possible.

Note: For better performance, consider Angular-native alternatives like Angular Material Table in future refactors.

## Common Issues & Fixes

- **MongoDB Connection Failed**:
  - Error: "MongoServerError" or connection timeout.
  - Fix: Verify MongoDB is running (`mongod` or service). Update `MONGODB_URI` in `.env` (e.g., for Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/contactapp?retryWrites=true&w=majority`). Test connection: `mongo <URI>`.

- **CORS Errors** (e.g., "Access to XMLHttpRequest blocked"):
  - Error: Browser console shows CORS policy violation.
  - Fix: Backend uses `app.use(cors())` in `server.js`. Ensure origin includes frontend URL (default: all origins). For production, restrict: `cors({ origin: 'https://yourdomain.com' })`. Restart server after changes.

- **Port Already in Use**:
  - Error: Angular prompts for new port; Node throws EADDRINUSE.
  - Fix: Kill process: `lsof -ti:4200 | xargs kill -9` (macOS). Or set `PORT=3000` in env.

- **API Not Responding / 404 on Endpoints**:
  - Fix: Ensure backend running on 3030. Check `apiUrl` in frontend env. Verify routes in `server/routes/contact.routes.js` mounted at `/api`.

- **jQuery/DataTables Conflicts**:
  - Error: "jQuery is not defined" or table not rendering.
  - Fix: Ensure jQuery imported before DataTables in component. Add `@types/jquery` if TS errors.

- **Form Validation/Submission Issues**:
  - Fix: Check browser console for TS/JS errors. Ensure FormsModule imported in `app.module.ts`.

- **Build/Dependency Errors**:
  - Fix: Run `npm install` in both dirs. Clear cache: `npm cache clean --force`. Update Angular: `ng update @angular/cli`.

For more, check server logs or browser dev tools (F12).

## Project Structure
```
contactapp/
├── client/                 # Angular frontend
│   ├── src/app/
│   │   ├── core/           # Models (contact.model.ts) & services (data.service.ts)
│   │   ├── features/       # Components: contacts/ (list, modal), legacy-form/
│   │   ├── shared/         # Directives (autofocus-invalid, only-numbers), components (confirm-dialog)
│   │   └── app.module.ts   # Declarations, imports (FormsModule, ReactiveFormsModule, HttpClientModule)
│   ├── environments/       # API config
│   ├── angular.json
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/db.js        # MongoDB connection
│   ├── controllers/contact.controller.js  # CRUD logic
│   ├── middleware/errorHandler.js  # Global error handling
│   ├── models/contact.model.js     # Mongoose schema
│   ├── routes/contact.routes.js    # API routes
│   ├── server.js           # Express app setup (CORS, routes, error handler)
│   ├── .env                # Environment vars (create if missing)
│   └── package.json
├── README.md               # This file
├── screenshots/            # Add images here (optional)
└── TODO.md                 # Task tracking
```

## GitHub Repo
Push to GitHub:
1. Initialize: `git init`
2. Add remote: `git remote add origin <repo-url>`
3. Commit: `git add . && git commit -m "Initial commit: Full-stack contact app"`
4. Push: `git push -u origin main`
5. Add `.gitignore` for `node_modules/`, `.env`, `dist/`.

Include screenshots in repo for deliverables.

## Repository
[GitHub Repository](https://github.com/Rahul-R-Shekar/contact-management-app)
