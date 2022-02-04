const API_GATEWAY_BASE_URL =
  'https://bwrjdgft98.execute-api.us-east-1.amazonaws.com/v1/';

export const environment = {
  production: false,
  BPM_BASE_URL: `${API_GATEWAY_BASE_URL}bpm/`,
  CDC_BASE_URL: `${API_GATEWAY_BASE_URL}cdc/`,
  AUTH_BASE_URL: `${API_GATEWAY_BASE_URL}auth/`,
};
