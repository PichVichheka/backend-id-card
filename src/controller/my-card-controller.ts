// import { Request, Response } from 'express';
// import {
//   getMyCardsService,
//   deleteMyUserService,
//   getMyUserDetailService,
//   toggleMyUserBlockService,
// } from '@/service/my-card-service';

// export const getMyCardsController = async (req: Request, res: Response) => {
//   try {
//     const result = await getMyCardsService(req);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving cards' });
//   }
// };

// export const deleteMyUserController = async (req: Request, res: Response) => {
//   try {
//     const result = await deleteMyUserService(req.params.id);
//     res.status(204).json(result);
//   } catch (error) {
//     res
//       .status(404)
//       .json({
//         message:
//           error instanceof Error ? error.message : 'An unknown error occurred',
//       });
//   }
// };

// export const getMyUserDetailController = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const result = await getMyUserDetailService(req.params.id);
//     res.status(200).json(result);
//   } catch (error) {
//     res
//       .status(404)
//       .json({
//         message:
//           error instanceof Error ? error.message : 'An unknown error occurred',
//       });
//   }
// };

// export const toggleMyUserBlockController = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const result = await toggleMyUserBlockService(
//       req.params.id,
//       req.body.action,
//     );
//     res.status(200).json(result);
//   } catch (error) {
//     res
//       .status(404)
//       .json({
//         message:
//           error instanceof Error ? error.message : 'An unknown error occurred',
//       });
//   }
// };

import { Request, Response } from 'express';
import {
  getMyCardsService,
  deleteMyUserService,
  getMyUserDetailService,
  toggleMyUserBlockService,
} from '@/service/my-card-service';

export const getMyCardsController = async (req: Request, res: Response) => {
  try {
    const result = await getMyCardsService(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cards' });
  }
};

export const deleteMyUserController = async (req: Request, res: Response) => {
  try {
    const result = await deleteMyUserService(req.params.id);
    res.status(204).json(result);
  } catch (error) {
    res
      .status(404)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
  }
};

export const getMyUserDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getMyUserDetailService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(404)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
  }
};

export const toggleMyUserBlockController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await toggleMyUserBlockService(
      req.params.id,
      req.body.action,
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(404)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
  }
};
