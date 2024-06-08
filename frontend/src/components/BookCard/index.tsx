import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Book } from '../../utils/types';
import { Button, CardActions, Stack } from '@mui/material';
import './bookcard.css';

type Props = {
  book: Book;
};

const BookCard: React.FC<Props> = ({ book }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../../${book.coverPhotoURL}`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, []);

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ maxHeight: 160 }}
        image={imageSrc}
        alt="book"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {book.title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ margin: '0.5rem 0' }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            <span className="author">Title</span> {book.author}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            <span className="author">Reading level</span> {book.readingLevel}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ padding: '1.5rem' }}>
        <Button size="small" color="secondary" variant="contained">
          Add to reading list
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
