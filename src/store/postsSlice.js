import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastAllPostId: null,
    allPostData: [],
    noMoreAllPosts: false,
    lastMyPostId: null,
    myPostData: [],
    noMoreMyPosts: false,
    categoryPosts: {},  // { "Technology": { data: [], lastId: null, noMore: false }, ... }
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPostData = [...state.allPostData, ...action.payload.allPostData];
            state.lastAllPostId = action.payload.lastAllPostId;
        },
        setMyPosts: (state, action) => {
            state.myPostData = [...state.myPostData, ...action.payload.myPostData];
            state.lastMyPostId = action.payload.lastMyPostId;
        },
        setNoMoreAllPosts: (state) => {
            state.noMoreAllPosts = true;
        },
        setNoMoreMyPosts: (state) => {
            state.noMoreMyPosts = true;
        },

        setCategoryPosts: (state, action) => {
            const { category, posts, lastId } = action.payload;
            if (!state.categoryPosts[category]) {
                state.categoryPosts[category] = { data: [], lastId: null, noMore: false };
            }
            state.categoryPosts[category].data.push(...posts);
            state.categoryPosts[category].lastId = lastId;
        },
        setNoMoreCategoryPosts: (state, action) => {
            const category = action.payload;
            if (!state.categoryPosts[category]) {
                state.categoryPosts[category] = { data: [], lastId: null, noMore: false };
            }
            state.categoryPosts[category].noMore = true;
        },
        resetAll(state, action) {
            state.allPostData = [];
            state.lastAllPostId = null;
            state.noMoreAllPosts = false;
            state.myPostData = [];
            state.lastMyPostId = null;
            state.noMoreMyPosts = false;
            state.categoryPosts = {};
        }
    }
});

export const {
    setAllPosts,
    setMyPosts,
    setNoMoreAllPosts,
    setNoMoreMyPosts,
    setCategoryPosts,
    setNoMoreCategoryPosts,
    resetAll,
} = postsSlice.actions;

export default postsSlice.reducer;
