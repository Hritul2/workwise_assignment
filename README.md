# Train Seat Booking Application

A Next.js application for managing train seat reservations with user authentication and real-time booking capabilities.

## Features

- **User Authentication**: Secure login and signup using NextAuth.js
- **Seat Booking System**:
  - 80 seats with 7 seats per row (last row has 3 seats)
  - Book up to 7 seats at once
  - Priority booking for seats in the same row
  - Adjacent seat allocation when same-row booking isn't possible
- **Real-time Updates**: Using TanStack Query for live seat status
- **Responsive Design**: Works across all device sizes
- **Server Actions**: Efficient server-side operations
- **Data Persistence**: PostgreSQL database with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 14 with React
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Hritul2/workwise_assignment.git
cd workwise_assignment
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── actions/          # Server actions
├── app/             # Next.js app router pages
├── components/      # React components
├── form/           # Form components
├── lib/            # Utility functions
├── service/        # Business logic
├── types/          # TypeScript types
└── utils/          # Helper functions
```

## Key Components

- `booking-action.ts`: Handles seat booking logic
- `booking-service.ts`: Business logic for seat management
- `components/main/`: Core UI components for booking interface
- `form/auth/`: Authentication forms
- `middleware.ts`: Request middleware for auth protection

## Authentication

The application uses NextAuth.js for authentication with the following features:

- Email/password authentication
- Protected routes
- Session management
- Middleware protection

## API Routes

- `/api/auth/[...nextauth]`: Authentication endpoints
- `/api/sign-up`: User registration endpoint

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- User
- Booking
- Seat

## Development

To contribute to the project:

1. Create a new branch
2. Make your changes
3. Run tests (if available)
4. Submit a pull request

## Deployment

The application can be deployed to any platform that supports Next.js applications (Vercel, Netlify, etc.).

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the GitHub repository.
