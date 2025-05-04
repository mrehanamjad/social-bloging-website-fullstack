import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastAllPostId: null,
    allPostData: [],
    noMoreAllPosts: false,
    lastMyPostId: null,
    myPostData: [],
    noMoreMyPosts: false,
}

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
        }
    }
});

export const { setAllPosts, setMyPosts, setNoMoreAllPosts, setNoMoreMyPosts } = postsSlice.actions;

export default postsSlice.reducer;
