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
    hobbyLabel: "",
    image_id: 0,
    selectedHobby:[],
    selectedHobbyLabel:[],
    GENDER_DATA: [
        {key:"1",label:"Male",value:1},
        {key:"2",label:"Female",value:2}
    ],
    JOB_DATA: [
        {key:"1",label:"Youtuber",value:1},
        {key:"2",label:"Actors",value:2},
        {key:"3",label:"Teacher",value:3}
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
        {key:"1",label:"Extrovert",value:1},
        {key:"2",label:"Introvert",value:2}
    ]
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_DATA: 
            if(action.payload===null){
                return
            }
            const userProfile = action.payload

            const array = userProfile.hobby.split(",").map(x=>+x)
            const labelArray = []
            var label = ""
            for(var x=0; x<state.HOBBY_DATA.length;x++){
                for(var y=0; y<array.length;y++){
                    if(state.HOBBY_DATA[x].value==array[y]){
                        label += state.HOBBY_DATA[x].label+","
                        labelArray.push(state.HOBBY_DATA[x].label)
                    }
                }
            }
            label = label.replace(/.$/,"")

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
                hobbyLabel: label,
                selectedHobby: array,
                selectedHobbyLabel:labelArray,
                imageId: userProfile.imageId,
            }
        
    };
    return state;
}