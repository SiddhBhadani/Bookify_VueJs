
import { getMongoRepository } from 'typeorm';
import { Book } from '../entities/Book.entity'; 
import { User } from '../entities/User.entity'; 
import middlewares from '../middlwares';
import { Router } from 'express';
import { ObjectId } from 'mongodb';

const getBooks = async(req:any,res:any ,next:any) => {
  try{
    const bookRepo = getMongoRepository(Book);
    const getBooks = await bookRepo.find({});
    res.status(200).send(getBooks);
  }
  catch(e){
    res.status(400).send("access denied");
    console.log("error")
  }
}

const postBook = async(req:any,res:any,next:any) => {
  try {
    const bookRepo = getMongoRepository(Book);
    const newBook = await new Book();
    const newBooks = await bookRepo.save(req.body);

    res.status(201).send(newBooks);
  } catch (e) {
    if (e.message === 'access denied') {
      // Handle access denied error
      res.status(403).send({ error: 'Access denied' });
    } else {
      // Handle other errors
      console.error('Error:', e);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
} 

const getBookById = async(req:any , res:any , next:any) => {
  try {
    const _id = req.params.id;
    const bookRepo = getMongoRepository(Book);
    const getBook = await bookRepo.findOne({where : { _id : new ObjectId(_id) }});
    
    if (!getBook) {
      // Handle the case where the book with the given ID is not found
      return res.status(404).send("Book not found");
    }

    res.status(200).send(getBook);
  } catch (e) {
    // Handle other errors
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
}

const editBook = async(req:any,res:any,next:any) => {
  try{
    const _id = req.params.id;
    const bookRepo = getMongoRepository(Book);
    const getBook = await bookRepo.update({_id : new ObjectId(_id)},{...req.body});
    res.send(getBook);
  }
  catch(e){
    res.status(400).send("access denied");
  }
}

const deleteBook = async(req:any , res:any ,next:any) => {
  try{
    const _id = req.params.id;
    const bookRepo = getMongoRepository(Book);
    const getBook = await bookRepo.delete({_id : new ObjectId(_id)});
    res.send(getBook);
  }
  catch(e){
    res.status(500).send(e);
  }
}

const deleteBookmark = async(req:any ,res:any,next:any) => {
  try {
      
    const bookId = req.params.bookId;

    // Check if the user exists
    const userRepo = getMongoRepository(User);
    const user:any = await userRepo.findOne({where : {_id : new ObjectId(req.user._id)}});
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the book is bookmarked by the user
    if (!user.bookmarks.includes(bookId)) {
      return res.status(404).json({ error: 'Book not found in bookmarks.' });
    }

    // Remove the book from the user's bookmarks
    user.bookmarks = user.bookmarks.filter((_id:any) => _id.toString() !== bookId);
    await userRepo.save(user);

    res.json({ message: 'Book removed from bookmarks successfully.' });
  } catch (error) {
    console.error('Delete Bookmark Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}

const getBookmarks = async(req:any,res:any,next:any) => {
  try {

    const userRepository = getMongoRepository(User);
    const user = await userRepository.findOne({where : {_id: new ObjectId(req.user._id)}});

    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Retrieve the list of bookmarked book IDs from the user's document
    const bookmarkedBookIds = user.bookmarks || [];
    const newBookmarks= bookmarkedBookIds.map((id) => new ObjectId(id));
    // Fetch details of each bookmarked book
    const bookRepository = getMongoRepository(Book);
    const bookmarkedBooks = await bookRepository.find({ where: { _id: { $in: newBookmarks } } });
    res.json({ bookmarkedBooks });
  } catch (error) {
    console.error('Get Bookmarks Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}

const postBookmark = async(req:any,res:any , next:any) => {
  try {
    const bookId = req.params.bookId;

    // Find the authenticated user
    const userRepository = getMongoRepository(User);
    const user = await userRepository.findOne({where:{_id : new ObjectId(req.user._id)}});

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Use $addToSet to ensure the book is only added if not already present
    const userBookmarks = user.bookmarks || [];
    userBookmarks.push(bookId);
    user.bookmarks = userBookmarks;

    // Save the updated user
    const updatedUser = await userRepository.save(user);

    res.json({ message: 'Bookmarked successfully.' });
  } catch (error) {
    console.error('Bookmark Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}

export default { 
  getBooks,
  postBook,
  getBookById,
  editBook,
  deleteBook,
  deleteBookmark,
  getBookmarks,
  postBookmark
};
