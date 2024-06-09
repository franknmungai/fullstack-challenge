import { useContext, useEffect, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Book } from '../../utils/types';
import { Button, CardActions, Stack } from '@mui/material';
import './bookcard.css';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';

type Props = {
  book: Book;
};

const BookCard: React.FC<Props> = ({ book }) => {
  const [imageSrc, setImageSrc] = useState('');
  const {
    state: { readingList, showReadingList },
    addToReadingList,
    removeFromReadingList,
  } = useContext(AppContext);

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

  const isInReadingList = useMemo(() => {
    return readingList.some(({ id }) => id === book.id);
  }, [readingList]);

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
          sx={{ margin: '0.8rem 0' }}
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
        {isInReadingList ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              if (showReadingList) {
                removeFromReadingList(book.id);
                toast.success(
                  book.title + ' has been removed from the reading list',
                  {
                    duration: 3000,
                  }
                );
              }
            }}
          >
            {showReadingList
              ? 'Remove from reading list'
              : 'Added to reading list'}
          </Button>
        ) : (
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={() => {
              addToReadingList(book);
              toast.success(
                book.title + ' has been added to the reading list',
                {
                  duration: 3000,
                }
              );
            }}
          >
            Add to reading list
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
