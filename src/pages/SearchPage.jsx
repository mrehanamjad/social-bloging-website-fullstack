import React from 'react'
import { Button, Container, Input } from '../components'
import { CategoryDropdown } from '../components/CardCarousel'
import { FaSearch } from 'react-icons/fa'

function SearchPage() {
    const [searchText, setSearchText] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [searchedText, setSearchedText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)


    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div>
            );
        }



        if (searchResults.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                    <FaNewspaper className="w-24 h-24 text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        No Post Found for "{searchedText}"
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We couldn’t find any posts matching your search. Try different keywords or filters.
                    </p>
                    <Link to="/add-post">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <FaPen size={20} />
                            Write a New Post
                        </Button>
                    </Link>
                </div>
            );
            
        }


    }

      return (
          <div className='w-full py-12 bg-gray-50 min-h-screen'>
              <Container>
                  <div className="mb-8">
                      <div className='flex justify-between gap-3 md:items-center w-full max-md:flex-col  mb-6'>
                      <h1 className="text-4xl font-bold text-gray-900 ">
                          Search..
                      </h1>
                      {/* <CategoryDropdown /> */}
                      </div>
                      <div className="flex items-center space-x-4 mb-6">
                          <div className="relative flex-grow">
                              <Input 
                                  type="text" 
                                  placeholder="Search posts..."
                                  value={searchText}
                                  onChange={(e) => setSearchText(e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <Button 
                                  className="flex justify-center items-center gap-1 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 p-1" 
                                  
                              >
                                <FaSearch />  Search
                              </Button>
                          </div>
                      </div>
                  </div>
  
                  {/* {renderContent()} */}
              </Container>
          </div>
      )
}

export default SearchPage