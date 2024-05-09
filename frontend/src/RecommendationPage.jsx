


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieImage from './Assets/bg-movie.jpg';
import BookImage from './Assets/bg-books.png'
import SearchImage from './Assets/search.png'
import ViewComponent from './ViewComponent';
import MovieComponent from './Components/MovieComponent';
import CourseImage from "./Assets/bg-courses.png"
import RestaurantImage from "./Assets/bg-restaurants.png"
import axios from 'axios';
import CourseComponent from './Components/CourseComponent';
import RestaurantComponent from './Components/RestaurantComponent';
import Shimmer from './Shimmer';
function RecommendationPage() {
  const { id } = useParams();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [input, setInput] = useState('')
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([{
    image: '',
    title: '',
    category: '',
    duration: '',
    year: '',
    numerics: '',
    rating: '',
    people: '',
    genre: '',
    scores: { review: '', count: '' },
    overview: ''
  }])
  const [url, setUrl] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [index, setIndex] = useState()
  const [text, setText] = useState("")

  function onModalClick(index) {
    setModal(!modal)
    setIndex(index)
  }
  function onModalBackClick() {
    setModal(!modal)
  }

  useEffect(() => {
    // Set background image based on id
    if (id === "movies") {
      setBackgroundImage(`url(${MovieImage})`);
      setData({ category: "Movie", duration: "min" })
      setUrl("moviesm")
      setText("Explore endless cinematic possibilities with our movie recommender system! Whether you crave heart-pounding action, spine-tingling thrillers, or heartwarming dramas, we've got you covered. Discover hidden gems and blockbuster hits tailored to your unique tastes and preferences. From timeless classics to the latest releases, our algorithm ensures personalized recommendations that guarantee an unforgettable movie-watching experience. Say goodbye to endless scrolling and hello to movie nights filled with excitement and joy. Let our recommender system be your ultimate guide to the mesmerizing world of cinema. Sit back, relax, and let the magic of movies unfold before your eyes")

    }
    else if (id === "books") {
      setBackgroundImage(`url(${BookImage})`);
      // setData()
      setData({ category: "Books", duration: "" })
      setUrl("booksm")
      setText("Discover your next literary adventure with our book recommender system. Whether you crave heart-pounding thrillers, thought-provoking classics, or enchanting fantasies, our algorithm tailors recommendations to your unique tastes. By analyzing your reading history, preferences, and genre interests, we curate a personalized list of titles you're sure to love. From bestsellers to hidden gems, embark on a journey through worlds unknown. Expand your literary horizons and find your next page-turner effortlessly. With our book recommender system, the perfect book is just a click away, waiting to transport you to new realms of imagination and discovery.")
    }
    else if (id === "courses") {
      setBackgroundImage(`url(${CourseImage})`);
      setData({ category: "Book", duration: "" })
      // setUrl("booksm")
      setText("Discover your next literary adventure with our book recommender system. Whether you crave heart-pounding thrillers, thought-provoking classics, or enchanting fantasies, our algorithm tailors recommendations to your unique tastes. By analyzing your reading history, preferences, and genre interests, we curate a personalized list of titles you're sure to love. From bestsellers to hidden gems, embark on a journey through worlds unknown. Expand your literary horizons and find your next page-turner effortlessly. With our book recommender system, the perfect book is just a click away, waiting to transport you to new realms of imagination and discovery.")
    }
    else if (id === "restaurants") {
      setBackgroundImage(`url(${RestaurantImage})`);
      setData({ category: "Book", duration: "" })
      // setUrl("booksm")
      setText("Discover your next literary adventure with our book recommender system. Whether you crave heart-pounding thrillers, thought-provoking classics, or enchanting fantasies, our algorithm tailors recommendations to your unique tastes. By analyzing your reading history, preferences, and genre interests, we curate a personalized list of titles you're sure to love. From bestsellers to hidden gems, embark on a journey through worlds unknown. Expand your literary horizons and find your next page-turner effortlessly. With our book recommender system, the perfect book is just a click away, waiting to transport you to new realms of imagination and discovery.")
    }
    else {
      // Set default background if id is not recognized
      setBackgroundImage('');
    }
  }, [id]);

  function handleChange(event) {
    const { value } = event.target;
    setInput(value)
  }

  function handleSearch() {
    console.log(input)
  }



  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   setI
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)


    if (id === "movies") {
      try {
        const response = await axios.post(`http://localhost:5000/${url}`, {
          movie_name: input,
        });

        setRecommendations(response.data.recommendations);
        // const imageId = response.data.recommendations[0].Id
        // console.log(imageId)


        // const imageResponse = await axios.get(`https://api.themoviedb.org/3/movie/${imageId}?api_key=86c48e9d929996f5f775aa9b14fdad89`)
        // console.log(imageResponse)
        // const path=imageResponse.data.poster_path
        // setData((prevData) => ({
        //   ...prevData,
        //   image: `https://image.tmdb.org/t/p/w500${path}`
        // }));

        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false)
    }
    else {
      try {
        const response = await axios.post(`http://localhost:5000/${url}`, {
          book_name: input,
        });

        setRecommendations(response.data.recommendations);
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false)
    }

  };
  console.log(data.image)

  return (
    <div
      className='flex h-screen '
    // Apply dynamic background image
    >
      <div className='hidden  xl:block xl:w-1/4 m-4'>
        <div className='text-white text-[40px] font-extrabold uppercase text-center p-4'>{id}</div>
        <div className='bg-[#F8F8FF] p-16 rounded-3xl pr-8 pl-8 text-[18px] font-semibold' >
          {text}
        </div>
      </div>
      <div className=' hidden xl:block bg-white border-8 rounded-md'></div>
      {/* <div className='w-3/4 ml-4' style={{ backgroundImage: backgroundImage, opacity: "50%" }}>
        <div className='bg-[#D9D9D9]  w-2/3 m-auto mt-10 h-12   rounded-3xl flex pr-3'>
          <input type="text" name="" id="" className='w-full h-full bg-[#D9D9D9] border-none rounded-3xl text-xl font-normal text-[30px] p-4 border-2 border-white' />
          <div className='m-auto'>          <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
          </div>
        </div>
        <div>hello</div>

      </div>
       */}

      {/* <div className='w-3/4 ml-4 relative  '>
        <div
          className='absolute inset-0 bg-cover bg-center '
          style={{ backgroundImage: backgroundImage, zIndex: -1,  }}
        />
        <div className='bg-[#D9D9D9] w-2/3 m-auto mt-10 h-12 rounded-3xl flex pr-3  '>
          <input
            type="text"
            name=""
            id=""
            value={input}
            onChange={handleChange}
            className='w-full h-full bg-[#D9D9D9] border-none rounded-3xl text-xl font-normal text-[30px] p-4 border-2 border-white'
          />
          <div className='m-auto' onClick={handleSearch}>
            <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
          </div>
        </div>
        <div className='flex flex-wrap overflow-y-auto ml-11 mr-11 mt-4 '>
          {!modal ? <ViewComponent titleClick={onModalClick} info={data} /> : <MovieComponent backClick={onModalBackClick} info={data}/>
          }
        </div>

      </div> */}

      <div className='w-full xl:w-3/4 ml-4 relative overflow-y-auto'>
        <div
          className='absolute inset-0 bg-cover bg-center filter blur-sm'
          style={{ backgroundImage: backgroundImage, zIndex: -1 }}
        />
        <div>
          <form onSubmit={handleFormSubmit} method='post' className='bg-[#F8F8FF] w-2/3 m-auto mt-10 h-12 rounded-3xl flex pr-3'>
            <input
              type="text"
              id="movie_name" name="movie_name"
              placeholder='Search'
              value={input}
              onChange={handleChange}
              className='w-full h-full outline-none bg-[#F8F8FF] border-none rounded-3xl  font-normal text-[15px] md:text-[20px] p-4 border-2 '
            />
            <button className='m-auto' type='submit'>
              <img src={SearchImage} alt="" className='w-[36px] h-[36px] m-auto' />
            </button>
          </form>
        </div>
        {/* <div className='flex flex-wrap overflow-y-auto h-5/6 ml-11 mr-11 mt-4 place-content-evenly'>
          {()=>{
            switch (id) {
              case ('movies' || 'books'):
                return (!modal ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} /> : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />)
                break;
              case 'restaurants':
                return <CourseComponent />
              default:
                break;
            }
          }}
          {/* {!modal ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} /> : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />} */}
        {/* </div>  */}
        <div className='scroller flex flex-wrap overflow-y-auto h-5/6 ml-2 mr-2 lg:ml-11 lg:mr-11 mt-4 place-content-evenly'>
          {!loading ?
            (() => {
              switch (id) {
                case 'movies':
                case 'books':
                  return (!modal
                    ? <ViewComponent titleClick={onModalClick} info={data} recommendations={recommendations} />
                    : <MovieComponent backClick={onModalBackClick} info={data} recommendations={recommendations[index]} />
                  );
                case 'courses':
                  return <CourseComponent />;
                case 'restaurants':
                  return <RestaurantComponent />;
                default:
                  return <div>Invalid category</div>;
              }
            })()
            : <> <Shimmer />  <Shimmer />  <Shimmer /> <Shimmer /> <Shimmer /> </>}
          {/* This function is now immediately invoked */}
          {/* <MovieComponent backClick={onModalBackClick} info={data && data} recommendations={recommendations && recommendations[index]} /> */}
        </div>

      </div>


    </div>
  );
}

export default RecommendationPage;





