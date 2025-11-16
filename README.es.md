# Pokedex App

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/) 
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/) 
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) 
[![Zustand](https://img.shields.io/badge/Zustand-00C7B7?logo=&logoColor=white)](https://github.com/pmndrs/zustand)  

Aplicación web de Pokedex construida con **Next.js**, **TypeScript**, **Zustand** y **TailwindCSS**.  
Permite a los usuarios explorar Pokémon, ver sus tipos, generaciones y cadenas de evolución usando la **PokéAPI** oficial.  

## Características

- Navegar por todos los Pokémon con información detallada.  
- Ver cadenas de evolución e información de especies.  
- Filtrar Pokémon por tipo o generación.  
- Fetch de datos optimizado con hooks personalizados de React.  
- Gestión global del estado usando Zustand.  
- Scroll infinito: los Pokémon se cargan progresivamente a medida que el usuario desplaza la página.  

## Stack Tecnológico

- **Next.js 15**  
- **React 19**  
- **TailwindCSS 4**  
- **Zustand**  
- **TypeScript**  
- **Jest + Testing Library**  

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Antonio-Borrero/pokedex-app.git
cd pokedex-app

npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

## Para comenzar

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```
Abre http://localhost:3000 en el navegador para ver la aplicación.

## Ejecutar Tests

Ejecuta el conjunto de pruebas con:

```bash
npm run test
# o
yarn test
# o
pnpm test
# o
bun test
```

### Uso

- Navega por la lista de Pokémon desplazándote hacia abajo.
- Haz clic en un Pokémon para ver información detallada, incluyendo sus tipos, estadísticas base y cadena de evolución.
- Utiliza los filtros en la barra de navegación para seleccionar Pokémon por tipo o generación.
- Usa la barra de búsqueda para encontrar rápidamente un Pokémon por nombre.

- ## Screenshots
- ![Lista de Pokémon](screenshots/pokemon-list.png)
- ![Detalles de Pokémon](screenshots/pokemon-details.png)
- ![Barra de busqueda](screenshots/pokemon-search-bar.png)
- ![Filtro de tipos Pokémon](screenshots/pokemon-types.png)
- ![Filtro de generaciones Pokémon](screenshots/pokemon-generations.png)

## Data Source

Esta aplicación utiliza PokéAPI para obtener los datos de los Pokémon, incluyendo tipos, generaciones, cadenas de evolución y sprites.
