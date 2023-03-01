export const getQueryParams = (queryParams: any) => {
  let params = "";
  Object.keys(queryParams)?.forEach((param) => {
    if (queryParams[param] != "") params += `&${param}=${queryParams[param]}`;
  });
  return params;
};
