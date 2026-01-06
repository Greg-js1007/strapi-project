import qs from 'qs'; 


export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || "http://localhost:1337";

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
  const query = qs.stringify(QUERY_HOME_PAGE);
  // Eliminamos 'use cache' y cacheLife para usar el estándar de fetch
  const response = await getStrapiData(`/api/home-page?${query}`);
  return response?.data;
}

export async function getStrapiData(url) {
  try {
    // Agregamos revalidate: 60 para que Next.js cachee la respuesta 1 minuto
    const response = await fetch(`${STRAPI_BASE_URL}${url}`, {
      next: { revalidate: 60 },
    });

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

