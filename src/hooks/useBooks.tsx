
import { useState } from 'react';
import { Book, BookFormData } from '@/types/book';
import { useLocalStorage } from './useLocalStorage';
import { toast } from 'sonner';

export function useBooks() {
  const [books, setBooks] = useLocalStorage<Book[]>('library-books', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'year'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const addBook = (bookData: BookFormData) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setBooks(prevBooks => [...prevBooks, newBook]);
    toast.success('Livre ajouté avec succès');
    return newBook;
  };

  const updateBook = (id: string, bookData: BookFormData) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );
    toast.success('Livre mis à jour avec succès');
  };

  const deleteBook = (id: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    toast.success('Livre supprimé avec succès');
  };

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.year.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const stats = {
    totalBooks: books.length,
    totalAuthors: new Set(books.map(book => book.author)).size,
    latestYear: books.length > 0 ? Math.max(...books.map(book => book.year)) : 0,
    oldestYear: books.length > 0 ? Math.min(...books.map(book => book.year)) : 0,
  };

  return {
    books: filteredBooks,
    addBook,
    updateBook,
    deleteBook,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    stats,
  };
}
