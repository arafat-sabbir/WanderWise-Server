import express from 'express';
import { CommentValidation } from './comment.validation';
import { CommentControllers } from './comment.controller';
import AuthorizeRequest from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();


// Comment On A Post By Post Id
router.post(
  '/:id',
  AuthorizeRequest('user', 'admin'),
  validateRequest(CommentValidation.createCommentSchema),
  CommentControllers.createNewComment
);

// Edit comment By CommentId
router.put(
  '/:id',
  AuthorizeRequest('user', 'admin'),
  validateRequest(CommentValidation.createCommentSchema),
  CommentControllers.editComment
);

// Delete comment By CommentId
router.delete('/:id', AuthorizeRequest('user', 'admin'), CommentControllers.deletedComment);

router.get('/get-post-comment/:id', CommentControllers.getAllCommentForAPost);

router.get('/:id', CommentControllers.getSingleComment);

const commentRoutes = router;

export default commentRoutes;

