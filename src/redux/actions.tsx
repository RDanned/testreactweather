import {ADD_CITY} from "./actionTypes";

let nextCityId = 0;

export const addCity = (name: any) => {
    return({
            type: ADD_CITY,
            payload: {name}
    });
};
