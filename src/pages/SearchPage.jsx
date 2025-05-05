import React from 'react'
import { Button, Container, Input } from '../components'
import { FaSearch } from 'react-icons/fa'
import appwriteService from '../appwrite/config'
import { Query } from 'appwrite'
import ShowMutiPosts from '../components/ShowMutiPosts'

function SearchPage() {
    const [searchText, setSearchText] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [searchedText, setSearchedText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [lastSearchedPostId, setLastSearchedPostId] = React.useState(null)
    const [noMorePosts, setNoMorePosts] = React.useState(false)


    const searchPosts = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            setSearchedText(searchText)
            const posts = lastSearchedPostId ? await appwriteService.getSearchedPosts(searchText, [Query.limit(8), Query.cursorAfter(lastSearchedPostId)]) : await appwriteService.getSearchedPosts(searchText, [Query.limit(8)],);
            if (posts && posts.documents?.length > 0) {
                setSearchResults(posts.documents)
            }

            if (posts && posts.documents?.length > 7) setLastSearchedPostId(posts.documents?.at(-1)?.$id)
            if ( posts.documents?.length < 8) {
                setNoMorePosts(true)
            }

        } catch (error) {
            console.log(error)
            setNoMorePosts(true)
        } finally {
            setIsLoading(false)
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
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <form onSubmit={searchPosts} className="relative flex-grow">
                            <Input
                                type="text"
                                placeholder="Search posts..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Button
                                className="flex justify-center items-center gap-1 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 p-1  max-sm:px-2 max-sm:py-1"
                            >
                                <FaSearch />  Search
                            </Button>
                        </form>
                    </div>
                </div>

                {!searchedText && (
                    <p className="col-span-full text-gray-500 text-center">
                        Enter a search term above to find posts.
                    </p>
                )}

                {searchedText && <ShowMutiPosts
                    fetchPost={searchPosts}
                    postsData={searchResults}
                    loading={isLoading}
                    noMorePosts={noMorePosts}
                    notFoundObject={{
                        title: `No results found for ${searchedText}`,
                        description: 'Try searching for something else.'
                    }}
                />}

            </Container>
        </div>
    )
}

export default SearchPage