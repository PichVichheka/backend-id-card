import {
  deleteUserService,
  getUsersService,
  meService,
  updateProfileService,
  updateUserByAdminService,
  getUserByUsernameService, // <- Add this line
} from '@/service/user-service';
import { Request, Response } from 'express';

export const getUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { page, limit, sortBy, sortOrder, ...filters } = req.query;
  const result = await getUsersService({
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 10,
    sortBy: sortBy as string,
    sortOrder: (sortOrder?.toString().toUpperCase() === 'ASC'
      ? 'ASC'
      : 'DESC') as 'ASC' | 'DESC',
    filters: filters as Record<string, string>,
  });
  res.status(201).json(result);
};

export const meController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = await meService(req);
  res.status(201).json(result);
};

export const updateProfileController = async (req: Request, res: Response) => {
  const result = await updateProfileService(req, res);
  res.status(201).json(result);
};

export const updateUserByAdminController = async (
  req: Request,
  res: Response,
) => {
  const result = await updateUserByAdminService(req, res);
  res.status(201).json(result);
};

export const DeleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req, res);
  res.status(201).json({
    message: 'Deleted this user successfully',
  });
};

export const GetUserByUsernameController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({ message: 'Username is required' });
      return;
    }

    const result = await getUserByUsernameService(username);

    if (!result) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in GetUserByUsernameController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
