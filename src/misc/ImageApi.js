import axios from 'axios';

export const imageApi = {
  getListImages,
  getCurrentImage,
};

function getListImages(limitImage) {
  return instance.get(`/v1/sample-data/photos?limit=${limitImage}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
}

function getCurrentImage(currentId) {
  return instance.get(`/v1/sample-data/photos/${currentId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
}

const instance = axios.create({
  baseURL: 'https://api.slingacademy.com/',
});
