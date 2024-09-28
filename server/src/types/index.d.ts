declare global {
    namespace Express {
      interface Request {
        userId: number;  // Prisma typically uses string for IDs
        sessionId: number;  // Use string for session IDs as well
      }
    }
  }
  
  // This ensures the file is treated as a module in TypeScript
export {};
  