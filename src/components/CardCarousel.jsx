import React, { useRef, useState, useEffect } from 'react'
import { BsArrowLeft, BsArrowLeftCircleFill, BsArrowRight, BsArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// types => card & text
function CardCarousel({ type = 'card' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectRef = useRef(null);
  const [carousalValues, setCarousalValues] = useState({ cardWidth: 0, totalCards: 0, gap: 0, scrollableWidth: 0 });

  const CategoryCardData = [
    {
      text: 'All',
      className: '',
      bgImg: '',
    },
    {
      text: 'Technology',
      className: 'bg-right',
      bgImg: 'https://cdn.pixabay.com/photo/2023/01/20/19/48/chip-7732459_1280.png',
    },
    {
      text: 'Life & Culture',
      className: '',
      bgImg: 'https://cdn.pixabay.com/photo/2020/05/29/15/31/lantern-5235537_1280.jpg',
    },
    {
      text: 'Business & Finance',
      className: '',
      bgImg: 'https://cdn.pixabay.com/photo/2020/02/18/08/35/finance-4858797_1280.jpg',
    },
    {
      text: 'Health & Fitness',
      className: '',
      bgImg: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      text: 'Creative Writing',
      className: '',
      bgImg: 'https://images.pexels.com/photos/5554771/pexels-photo-5554771.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      text: 'Travel & Adventure',
      className: '',
      bgImg: 'https://cdn.pixabay.com/photo/2017/08/07/23/50/climbing-2609319_1280.jpg',
    },
    {
      text: 'Food & Cooking',
      className: '',
      bgImg: 'https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_1280.jpg',
    },
    {
      text: 'Entertainment & Sports Media',
      className: '',
      bgImg: 'https://images.pexels.com/photos/5022810/pexels-photo-5022810.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      text: 'Self-Improvement',
      className: '',
      bgImg: 'https://images.pexels.com/photos/5206052/pexels-photo-5206052.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]

  useEffect(() => {
    if (selectRef.current) {
      const cardWidth = selectRef.current.querySelector('.CategoryCard').offsetWidth;
      const totalCards = selectRef.current.querySelectorAll('.CategoryCard').length;
      const gap = 20;
      const scrollableWidth = (cardWidth + gap) * totalCards;
      setCarousalValues({ cardWidth, totalCards, gap, scrollableWidth });
    }
  }, [selectRef.current]);


  useEffect(() => { updateCarousal() }, [setCurrentIndex, currentIndex])
  const updateCarousal = () => selectRef.current.style.transform = `translateX(-${currentIndex * (carousalValues.cardWidth + carousalValues.gap)}px)`;
  const prev = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);
  const next = () => currentIndex < carousalValues.totalCards - 1 && setCurrentIndex(prev => prev + 1);

  if (type === 'card') {
    return (
      <div
        className='bg-gray-200 h-96 rounded-t-3xl w-full bg-cover bg-center bg-fixed flex flex-col justify-center items-center text-white'
        // style={{
        //   backgroundImage: `url("https://images.unsplash.com/photo-1530533718754-001d2668365a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        // }}
      >
        {/* <h2 className='text-4xl md:text-6xl lg:text-7xl font-bold py-8'>Catrgories:</h2> */}
        <div className=' h-96 w-11/12 max-sm:w-full flex items-center justify-between gap-9 px-6 mx-auto'>
          <BsArrowLeftCircleFill onClick={prev} className='text-5xl cursor-pointer shadow-xl hover:shadow-md bg-blue-600 rounded-full hover:bg-white hover:text-blue-600' />
          <div className={`w-[83%] min-w-56 overflow-hidden`}>
            <div ref={selectRef} className='h-96 w-full transition-transform duration-500 ease-in-out flex items-center'>
              {CategoryCardData.map(data => (
                data.text !== 'All' && <Link key={data.text} to={`/all-posts/category/${data.text}`}>
                  <div key={data.text} className={`CategoryCard w-52 h-72   bg-slate-400 rounded-xl shrink-0 bg-cover bg-center cursor-pointer hover:bg-right-top duration-150 ease-in-out  mx-[10px] ${data.className}`} style={{ backgroundImage: `url("${data.bgImg}")` }}>
                    <div className='h-full w-full flex flex-col-reverse p-4 rounded-xl inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40'>
                      <h3 className="z-10 mt-3 text-2xl font-bold text-white">{data.text}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <BsArrowRightCircleFill onClick={next} className='text-5xl cursor-pointer shadow-xl hover:shadow-md bg-blue-600 rounded-full hover:bg-white hover:text-blue-600' />
        </div>

      </div>
    )
  } else {
    return (
      <div
        className=' w-full mb-10 mt-5 flex flex-col justify-center items-center text-white'
      >
        <div className='  w-11/12 max-sm:w-full flex items-center justify-between gap-9 px-6 mx-auto'>
          <BsArrowLeft onClick={prev} className='text-5xl cursor-pointer hover:text-blue-600' />
          <div className={`w-[83%] min-w-56 overflow-hidden`}>
            <div ref={selectRef} className=' w-full transition-transform duration-500 ease-in-out flex items-center'>
              {CategoryCardData.map(data => (
                <Link key={data.text} to={data.text === 'All' ? "/all-posts" : `/all-posts/category/${data.text}`}>
                  <div key={data.text} className={`CategoryCard w-52 py-1 text-center hover:bg-blue-400 flex justify-center items-center  bg-slate-300 rounded-3xl shrink-0  cursor-pointer  duration-150 ease-in-out  mx-[10px] ${data.className}`}>
                    <h3 className="z-10 text-lg text-black">{data.text}</h3>

                  </div>
                </Link>
              ))}
            </div>
          </div>
          <BsArrowRight onClick={next} className='text-5xl cursor-pointer hover:text-blue-600' />
        </div>

      </div>
    )
  }

}

export default CardCarousel

