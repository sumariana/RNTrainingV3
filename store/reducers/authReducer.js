import { GET_USER_DATA } from "../actions/authAction";

const initialState = {
    email: "",
    password: "",
    aboutMe: "",
    image: ""
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_DATA: 
            if(action.payload===null){
                return
            }
            const userProfile = action.payload
            return{
                ...state,
                image: userProfile.imageUrl,
                email: userProfile.email,
                password: userProfile.password,
                aboutMe: userProfile.aboutMe
            }
        
    };
    return state;
}