import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
      .then((response) => {
        const data = response.data.books;
        setBooks(data);
        setFilteredBooks(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Failed to fetch books:', error);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) || (book.authors && book.authors.join(' ').toLowerCase().includes(query))
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <nav className='grid grid-cols-3 items-center h-20 navigation'>
        <img className='ml-10' src='https://s3.ap-south-1.amazonaws.com/kalvi-education.github.io/front-end-web-development/Kalvium-Logo.png' />
        <input
          type='text'
          placeholder='Search books'
          className='font-roboto border inputbox mx-auto block rounded g-20'
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className='ml-auto mr-5'>
          <Link to="/Form"><button className='bg-red-500 rounded buton font-semibold text-white'>
            Register
          </button>
          </Link>
        </div>
      </nav>

      <div className='p-10 X bg-white result'>
        <ul className=' grid gap-9 grid-cols-4 '>
          {filteredBooks.map((book) => (
            <li key={book.id} className='bg-white card p-2  grid justify-center items-center' >
              <div className='w-60 flex justify-between items-center'>
                <p className=' font-bold '>Free</p><p className='rating'>★ {book.averageRating || "3.7"}</p>

              </div>
              <div className='grid justify-center'>
              {book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.title} className='mb-2 text-center p-5 image' />}
              <h3 className='font-bold title w-32 line-clamp-2 text-center'>{book.title}</h3>
              {book.authors && <p className='author line-clamp-2 w-40 text-center'>{book.authors.join(', ')}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
