import { Router } from "express";
import bookController from "../controllers/index";
import middlwares from "../middlwares";

const router = Router();

router.get("/books", bookController.getBooks);
router.get("/bookmarks", middlwares.authenticate , bookController.getBookmarks);
router.get("/books/:id" , bookController.getBookById);

router.post("/book" , bookController.postBook);
router.post("/bookmarks/:bookId" , middlwares.authenticate , bookController.postBookmark);

router.patch("/books/:id" , bookController.editBook);

router.delete("/books/:id" , bookController.deleteBook)
router.delete('/bookmarks/:bookId', middlwares.authenticate , bookController.deleteBookmark);

export default router;
