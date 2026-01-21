export const getInitialState = () => {
    try {
        const storedPosts = localStorage.getItem('userPosts');
        const storedUser = localStorage.getItem('user');

        return {
            user: storedUser ? JSON.parse(storedUser) : null,
            userPosts: storedPosts ? JSON.parse(storedPosts) : []
        };
    } catch (e) {
        return { user: null, userPosts: [] };
    }
};

export const reducer = (state, action) => {
    switch(action.type) {
        case "USER":
            return { ...state, user: action.payload };
        case "SET_USER_POSTS":
  return {
    ...state,
    userPosts: action.payload,
  };
        case "ADD_POST":
            return { ...state, userPosts: [action.payload, ...(state.userPosts || [])] };
        case "DELETE_POST":
            return { ...state, userPosts: (state.userPosts || []).filter(p => p.id !== action.payload) };
        case "LIKE_POST":
            return {
                ...state,
                userPosts: (state.userPosts || []).map(p =>
                    p.id === action.payload.postId
                        ? { ...p, likes: action.payload.likes, liked: action.payload.liked }
                        : p
                )
            };
        default:
            return state;
    }
};