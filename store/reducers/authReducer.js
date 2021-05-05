import { GET_USER_DATA } from "../actions/authAction";

const initialState = {
    email: "",
    password: "",
    aboutMe: "",
    image: "",
    nickname: "",
    birthday: "",
    residence: "",
    gender: 0,
    job: 0,
    personality: 0,
    hobby: "",
    image_id: 0,
    GENDER_DATA: [
        {key:"1",label:"Male",value:"1"},
        {key:"2",label:"Female",value:"2"}
    ],
    JOB_DATA: [
        {key:"1",label:"Youtuber",value:"1"},
        {key:"2",label:"Actors",value:"2"},
        {key:"3",label:"Teacher",value:"3"}
    ],
    AREA_DATA: [
        {key:"1",label:"Denpasar",value:"Denpasar"},
        {key:"2",label:"Tabanan",value:"Tabanan"},
        {key:"3",label:"Badung",value:"Badung"}
    ],
    HOBBY_DATA: [
        {key:"1",label:"Fishing",value:1},
        {key:"2",label:"Singing",value:2},
        {key:"3",label:"Dancing",value:3}
    ],
    CHARACTER: [
        {key:"1",label:"Extrovert",value:"1"},
        {key:"2",label:"Introvert",value:"2"}
    ]
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_DATA: 
            if(action.payload===null){
                return
            }
            const userProfile = action.payload
            console.log(userProfile.hobby)
            return{
                ...state,
                image: userProfile.imageUrl,
                email: userProfile.email,
                password: userProfile.password,
                aboutMe: userProfile.aboutMe,
                nickname: userProfile.nickname,
                birthday: userProfile.birthday,
                residence: userProfile.residence,
                gender: userProfile.gender,
                job: userProfile.job,
                personality: userProfile.personality,
                hobby: userProfile.hobby,
                imageId: userProfile.imageId,
            }
        
    };
    return state;
}