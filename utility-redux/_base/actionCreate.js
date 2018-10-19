import toastr from 'toastr';
import BaseApi from './api';

toastr.options = {
  positionClass: 'toast-top-left',
  timeOut: 2000,
  extendedTimeOut: 2000, // after user touch
};

// const UPDATE_VIA_SOCKET = ['dailyRecord'];

export const actionCreate = (apiNameSnake) => {
  const {
    apiNameCamel,
    capitalizedNameCamel,
    capitalizedNameSnakePlural,
    capitalizedNameSnake,
  } = require('../_utility/getVariousNames')(apiNameSnake);

  const getResourceSuccess = data => ({
    type: `LOAD_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: data,
  });

  const createResourceSuccess = data => ({
    type: `CREATE_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: data,
  });

  const updateResourceSuccess = data => ({
    type: `UPDATE_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: data,
  });

  const deleteResourceSuccess = record => ({
    type: `DELETE_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: record,
  });

  const deleteResourcesSuccess = query => ({
    type: `DELETE_${capitalizedNameSnakePlural}_SUCCESS`,
    query,
  });

  class ExtendedClassApi extends BaseApi {
    constructor() {
      super(apiNameCamel);
    }
  }

  return {
    [`${capitalizedNameCamel}Actions`]: {
      getResourceSuccess,
      createResourceSuccess,
      updateResourceSuccess,
      deleteResourceSuccess,
      deleteResourcesSuccess,

      get(record, params = {}) {
        return (dispatch, getState) => new ExtendedClassApi().get(record, params).then((res) => {
          dispatch(getResourceSuccess(res.data)); // Need fromJS()
          toastr.success(`${apiNameCamel} loaded successfully`);
          return res.data;
        }).catch((error) => {
          toastr.error('Error', error);
          throw (error);
        });
      },

      create(record) {
        return (dispatch, getState) => new ExtendedClassApi().create(record).then((res) => {
          dispatch(createResourceSuccess(res.data));
          toastr.success(`${apiNameCamel} created successfully`);
          return res.data;
        }).catch((error) => {
          toastr.error('Error', error);
          throw (error);
        });
      },

      update(record) {
        return (dispatch, getState) => new ExtendedClassApi().update(record).then((res) => {
          // if (UPDATE_VIA_SOCKET.indexOf(apiNameCamel) === -1) {
          //   // FIXME: the device the started will be updated twice
          //   // But if you only wait for socketio it will be slow
          dispatch(updateResourceSuccess(res.data));
          toastr.success(`${apiNameCamel} updated successfully`);
          // }
          return res.data;
        }).catch((error) => {
          toastr.error('Error', error);
          throw (error);
        });
      },

      deleteRecord(record) { // delete is reserved
        return (dispatch, getState) => new ExtendedClassApi().delete(record).then(() => {
          dispatch(deleteResourceSuccess(record));
          toastr.success(`${apiNameCamel} deleted successfully`);
          return record;
        }).catch((error) => {
          toastr.error('Error', error);
          throw (error);
        });
      },

      deleteRecords(query) {
        return (dispatch, getState) => new ExtendedClassApi().deleteMany(query).then(() => {
          dispatch(deleteResourcesSuccess(query));
          toastr.success(`${apiNameCamel}s deleted successfully`);
          // No return data
        }).catch((error) => {
          toastr.error('Error', error);
          throw (error);
        });
      },
    },
  };
};
