import qs from 'qs'; 
import { cacheLife } from 'next/cache';

export const STRAPI_BASE_URL = "http://localhost:1337";

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

export async function getHomePage() {
  'use cache';
  
  cacheLife({expire: 60})
  
  const query = qs.stringify(QUERY_HOME_PAGE); 
  const response = await getStrapiData(`/api/home-page?${query}`)
  return response?.data
}


export async function getStrapiData(url) {

  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtener datos de la URL strapi", error);
    return null;
  }
}

export async function registerUserService(userData) {
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json(); 
    console.log(data)
    return data

  } catch (error) {
    console.error('Errore registering user: ', error)
    throw error
  }
}


export async function loginUserService(userData) {
  const url = `${STRAPI_BASE_URL}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Errore loggin user: ", error);
    throw error;
  }
}

