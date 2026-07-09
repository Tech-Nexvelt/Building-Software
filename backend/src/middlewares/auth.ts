import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware to protect routes. 
 * Extracts Bearer token from header and validates it with Supabase.
 */
export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token using Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error during authentication' });
  }
};

/**
 * Middleware for Role-Based Access Control (RBAC).
 * Must be used AFTER requireAuth.
 * @param allowedRoles Array of roles that are permitted to access the route
 */
export const requireRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      }

      // Fetch user role from database profiles table
      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', req.user.id)
        .single();

      if (error || !profile) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: Role not found' });
      }

      const userRole = profile.role.toLowerCase();

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          status: 'error', 
          message: `Forbidden: Requires one of [${allowedRoles.join(', ')}] role` 
        });
      }

      next();
    } catch (error) {
      console.error('RBAC Middleware Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error during authorization' });
    }
  };
};
