// src/service/my-card-service.ts
import { AppDataSource } from '@/config/data-source';
import { IdCard } from '@/entities/id-card';
import { User } from '@/entities/user';
import { Request } from 'express';

export const getMyCardsService = async (req: Request): Promise<any> => {
  const userId = req.user?.user_id;
  console.log('Authenticated userId:', userId);
  if (!userId) throw new Error('User not authenticated');

  const cardRepo = AppDataSource.getRepository(IdCard);
  const cards = await cardRepo
    .createQueryBuilder('card')
    .leftJoinAndSelect('card.user', 'user')
    .leftJoinAndSelect(
      'card.socialLinks',
      'socialLink',
      'socialLink.is_deleted = false',
    )
    .where('card.is_deleted = false')
    .andWhere('user.is_deleted = false')
    .andWhere('user.id != :adminId', {
      adminId: '02371363-fac6-4424-97d8-bc8a34975fca',
    })
    .andWhere('card.user_id = :userId', { userId })
    .select([
      'card.id',
      'card.gender',
      'card.dob',
      'card.address',
      'card.phone',
      'card.nationality',
      'user.id',
      'user.full_name',
      'user.user_name',
      'user.email',
      'user.is_active',
      'user.roles',
      'user.avatar',
    ])
    .getMany();

  console.log('Fetched cards:', cards);
  return { message: 'Cards listed successfully', cards };
};

export const deleteMyUserService = async (userId: string): Promise<any> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  await userRepo.update({ id: userId }, { is_deleted: true });
  return { message: 'User deleted successfully' };
};

export const getMyUserDetailService = async (userId: string): Promise<any> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id: userId, is_deleted: false },
    relations: ['idCards', 'socialLinks'],
  });
  if (!user) throw new Error('User not found');
  return { message: 'User details retrieved successfully', data: user };
};

export const toggleMyUserBlockService = async (
  userId: string,
  action: 'block' | 'unblock',
): Promise<any> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  await userRepo.update({ id: userId }, { is_active: action === 'unblock' });
  return { message: `User ${action}ed successfully` };
};
