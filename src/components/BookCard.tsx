
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(book)}
              className="h-8 w-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(book.id)}
              className="h-8 w-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
        <CardDescription className="text-sm">
          Par {book.author} • {book.year}
        </CardDescription>
      </CardHeader>
      
      {book.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 line-clamp-3">
            {book.description}
          </p>
        </CardContent>
      )}
      
      {book.isbn && (
        <CardContent className="pt-2">
          <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default BookCard;
