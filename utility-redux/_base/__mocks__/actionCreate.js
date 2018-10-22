import toastr from 'toastr';
import BaseApi from '../api';

toastr.options = {
  positionClass: 'toast-bottom-left'
};

const capitalizeWord = word => word.toUpperCase()[0] + word.slice(1);
const snakeToCamel = apiNameSnake => (apiNameSnake.indexOf('_') > -1 ? apiNameSnake.split('_')[0] + capitalizeWord(apiNameSnake.split('_')[1]) : apiNameSnake);
const capitalizedSnake = apiNameSnake => apiNameSnake.toUpperCase();
const pluralizeWord = word => (word[word.length - 1] === 'y' ? `${word.slice(0, -1)}ies` : `${word}s`);

export const actionCreate = (apiNameSnake, packageName = '') => {
  const apiNameCamel = snakeToCamel(apiNameSnake);
  const capitalizedNameCamel = capitalizeWord(apiNameCamel);
  const capitalizedName = capitalizedSnake(apiNameSnake);
  // const apiNameCamelPlural = pluralizeWord(apiNameCamel);
  const capitalizedNamePlural = pluralizeWord(apiNameSnake).toUpperCase();

  const createResourceSuccess = data => ({
    type: `CREATE_${capitalizedName}_SUCCESS`,
    [`${apiNameCamel}`]: data,
  });

  const updateResourceSuccess = data => ({
    type: `UPDATE_${capitalizedName}_SUCCESS`,
    [`${apiNameCamel}`]: data,
  });

  const deleteResourceSuccess = record => ({
    type: `DELETE_${capitalizedName}_SUCCESS`,
    [`${apiNameCamel}`]: record,
  });

  const deleteResourcesSuccess = query => ({
    type: `DELETE_${capitalizedNamePlural}_SUCCESS`,
    query,
  });

  class ExtendedClassApi extends BaseApi {
    constructor() {
      super(apiNameCamel, packageName);
    }
  }

  return {
    [`${capitalizedNameCamel}Actions`]: {
      createResourceSuccess,
      updateResourceSuccess,
      deleteResourceSuccess,
      deleteResourcesSuccess,

      get(record, params = {}) {
        const jsRecord = record.toJS();
        return (dispatch, getState) => {
          dispatch({
            type: `LOAD_${capitalizedName}_SUCCESS`,
            [`${apiNameCamel}`]: jsRecord,
          }); // Need fromJS()
          return jsRecord;
        };
      },

      create(record) {
        const jsRecord = record.toJS();
        return (dispatch, getState) => {
          dispatch(createResourceSuccess(jsRecord)); // No more res.data, need to be object
          return jsRecord;
        };
      },

      update(record) {
        const jsRecord = record.toJS();
        return (dispatch, getState) => {
          dispatch(updateResourceSuccess(jsRecord));
          return jsRecord;
        };
      },

      deleteRecord(record) { // delete is reserved
        return (dispatch, getState) => {
          dispatch(deleteResourceSuccess(record));
          return record;
        };
      },

      // deleteRecords(query) {
      //   return (dispatch, getState) => new ExtendedClassApi().deleteMany(query).then(() => {
      //     dispatch(deleteResourcesSuccess(query));
      //     toastr.success(`${apiNameCamel}s deleted successfully`);
      //     // No return data
      //   }).catch((error) => {
      //     throw (error);
      //   });
      // },
    },
  };
};
