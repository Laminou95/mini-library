
import { useState } from "react";
import { Book, BookFormData } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: BookFormData) => void;
  book?: Book;
  mode: 'add' | 'edit';
}

const BookForm = ({ isOpen, onClose, onSubmit, book, mode }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: book?.title || '',
    author: book?.author || '',
    year: book?.year || new Date().getFullYear(),
    isbn: book?.isbn || '',
    description: book?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    if (mode === 'add') {
      setFormData({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        isbn: '',
        description: '',
      });
    }
  };

  const handleInputChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Ajouter un livre' : 'Modifier le livre'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Remplissez les informations du nouveau livre.'
              : 'Modifiez les informations du livre.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Titre du livre"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Auteur *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Nom de l'auteur"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Année *</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
              placeholder="Année de publication"
              min="1000"
              max={new Date().getFullYear() + 5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={formData.isbn}
              onChange={(e) => handleInputChange('isbn', e.target.value)}
              placeholder="ISBN (optionnel)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description du livre (optionnelle)"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Ajouter' : 'Modifier'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
