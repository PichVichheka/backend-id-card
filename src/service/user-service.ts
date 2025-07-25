import { AppDataSource } from '@/config/data-source';
import { User } from '@/entities/user';
import { paginate } from '@/util';
import { Request, Response } from 'express';

/**
 *
 * - path /users/me - get user profile
 * - method: PUT
 * - roles: [USER, ADMIN]
 */
export const getUsersService = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  filters,
}: {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  filters: Record<string, string>;
}) => {
  // const userRepo = await AppDataSource.getRepository(User)
  //   .createQueryBuilder('user')
  //   .leftJoinAndSelect('user.devices', 'devices')
  //   .getMany();
  // return userRepo;
  const userRepo = AppDataSource.getRepository(User);

  return await paginate(userRepo, {
    page,
    limit,
    sortBy,
    sortOrder,
    filters,
    relations: ['devices'],
  });
};

export const meService = async (req: Request) => {
  const userId = req.user?.user_id;

  const data = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });
  return {
    message: 'get profile successfully',
    data,
  };
};

/**
 *
 * - path /api/v1/users/update-profile - Update user profile
 * - method: PUT
 * - roles: [USER, ADMIN,SUPER_ADMIN]
 */
export const updateProfileService = async (req: Request, res: Response) => {
  const userId = req.user?.user_id;
  const { full_name, email, user_name, avatar } = req.body;
  const users = await AppDataSource.getRepository(User).find();
  // const user = users.find((user) => user.id == userId);
  const userNameExist = users.find((user) => user.user_name == user_name);
  if (userNameExist && userNameExist.id !== userId) {
    res.status(409).json({
      message: 'Username already exists',
    });
  }
  await AppDataSource.getRepository(User).update(
    { id: userId },
    {
      full_name,
      email,
      user_name,
      avatar,
      updated_at: new Date(),
    },
  );
  const updatedUser = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });

  return res.status(200).json({
    message: 'User updated successfully',
    user: updatedUser,
  });
};

/**
 *
 * - path /api/v1/users/update-user - Update user
 * - method: DELETE
 * - roles: [ADMIN,SUPER_ADMIN]
 */

export const updateUserByAdminService = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { full_name, email, user_name, avatar, is_active } = req.body;
  const users = await AppDataSource.getRepository(User).find();

  const userNameExist = users.find((user) => user.user_name == user_name);
  if (userNameExist && userNameExist.id !== userId) {
    res.status(409).json({
      message: 'Username already exists',
    });
  }
  await AppDataSource.getRepository(User).update(
    { id: userId },
    {
      full_name,
      email,
      user_name,
      avatar,
      is_active,
      updated_at: new Date(),
    },
  );
  const updatedUser = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });

  return res.status(200).json({
    message: 'User updated successfully',
    user: updatedUser,
  });
};

/**
 *
 * - path /api/v1/users/update-profile - Update user profile
 * - method: DELETE
 * - roles: [ADMIN,SUPER_ADMIN]
 */
export const deleteUserService = async (req: Request, res: Response) => {
  const userId = req.params?.id as string;

  const findUser = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });
  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = await AppDataSource.getRepository(User).update(
    { id: userId },
    {
      is_deleted: true,
      updated_at: new Date(),
    },
  );
  return user;
};

/**
 *
 * - path /api/v1/users/user-by-username/:username - Get user by username
 * - method: GET
 * - roles: [USER, ADMIN, SUPER_ADMIN]
 */
export const getUserByUsernameService = async (username: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { user_name: username }, // Note: using user_name to match your schema
    relations: ['devices'], // Using same relations as your getUsersService
  });

  return user;
};
