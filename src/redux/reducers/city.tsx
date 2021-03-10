import {ADD_CITY} from "../actionTypes";

const initialState = {
    name: "Oskemen"
};

export default function(state: any = initialState, action: any){
    switch (action.type){
        case ADD_CITY: {
            const {name} = action.payload;
            return {name: name}
        }
        default:
            return state;
    }
}
