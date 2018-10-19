import {
  fromJS
} from 'immutable';

export const reducerCreate = (apiNameSnake) => {
  const {
    apiNameCamel,
    apiNameCamelPlural,
    capitalizedNameSnakePlural,
    capitalizedNameSnake,
  } = require('../_utility/getVariousNames')(apiNameSnake, '');

  return (state = fromJS({}), action) => {
    switch (action.type) {
    case `LOAD_${capitalizedNameSnakePlural}_SUCCESS`:
    {
      const newInitState = {};
      let key = '_id'; // action.key === undefined ? '_id' : action.key; // i think for user it is not defined

      // TODO: this could be refactored
      // if (key !== '_id') {
      //   return action[`${apiNameCamelPlural}`];
      // }

      action[`${apiNameCamelPlural}`].forEach((c) => {
        if (c[key] === undefined) {
          key = 'id';
        } // Just for Files
        newInitState[c[key]] = c;
      });
      return fromJS(newInitState);
    }

    case `LOAD_${capitalizedNameSnake}_SUCCESS`:
    {
      return state.set(action[apiNameCamel]._id, fromJS(action[apiNameCamel]));
    }

    case `CREATE_${capitalizedNameSnake}_SUCCESS`:
    {
      return state.set(action[apiNameCamel]._id, fromJS(action[apiNameCamel]));
    }

    case `UPDATE_${capitalizedNameSnake}_SUCCESS`:
    {
      return state.set(action[apiNameCamel]._id, fromJS(action[apiNameCamel]));
    }

    case `DELETE_${capitalizedNameSnake}_SUCCESS`:
    {
      // Note that the item here is immutable
      return state.delete(action[apiNameCamel].get('_id'));
    }

    case `DELETE_${capitalizedNameSnakePlural}_SUCCESS`:
    {
      // Note that the item here is immutable
      const newState = state.filter((rec) => {
        let isFiltered = false;
        Object.keys(action.query).forEach((key) => {
          if (rec.get(key) !== action.query[key]) {
            isFiltered = true;
          }
        });
        return isFiltered;
      });

      return newState;
    }

    // case `SOCKET_${capitalizedNameSnake}`: {
    //   if (JSON.stringify(state.get(action[apiNameCamel]._id).toJS()) !== JSON.stringify(action[apiNameCamel])) {
    //     const res = state.set(action[apiNameCamel]._id, fromJS(action[apiNameCamel]));
    //     return res;
    //   }
    //
    //   return state;
    // }

    default:
      return state;
    }
  };
};
