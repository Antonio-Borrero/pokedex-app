Español | [English](README.md)

# Pokedex App

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)

![Lista Pokemon](screenshots/pokemon-grid.webp)

<br>

Este es mi primer proyecto personal independiente, desarrollado fuera de cualquier bootcamp o curso formal. Mi objetivo no era construir la "app perfecta", sino experimentar con nuevas herramientas y comprender sus flujos de trabajo.

- **Primeros pasos con Next.js y Tailwind:** Utilicé este proyecto para sumergirme en el ecosistema de Next.js y Tailwind CSS. Fue una experiencia de "aprender haciendo" para entender el enrutamiento basado en archivos y el diseño basado en utilidades.
- **Gestión de Estado (Zustand vs Redux):** Exploré Zustand como una alternativa ligera a Redux. Aunque sigo evaluando las diferencias de rendimiento, su experiencia de desarrollo me resultó mucho más intuitiva para un proyecto de esta escala.
- **Decisiones de Rendimiento:** Para garantizar una búsqueda global fluida, opté por obtener la lista completa de Pokémon en la carga inicial. Para equilibrar esto, implementé un **Intersection Observer** para el renderizado de la lista, asegurando que las imágenes solo se carguen cuando entran en el viewport.
- **Introducción al Testing:** Este fue mi primer contacto con **Jest**. Aunque la suite de pruebas es básica y todavía estoy dominando la "mentalidad de testing", sentó las bases para mi enfoque futuro en la fiabilidad del código.

Soy consciente de que hay mucho margen de mejora y planeo actualizar este proyecto a medida que continúe creciendo como desarrollador.

<br>

## Características

- Explora todos los Pokémon con datos detallados.
- Visualización de cadenas de evolución e información de especies.
- Filtrado por tipo o generación.
- Consumo de datos optimizado mediante hooks personalizados.
- Gestión de estado global mediante Zustand.
- **Scroll Infinito:** Carga progresiva de Pokémon a medida que el usuario navega.

<br>

## Tech Stack

- **Next.js 15**
- **TailwindCSS 4**
- **Zustand**
- **TypeScript**
- **Jest + Testing Library**

<br>

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/Antonio-Borrero/pokedex-app.git](https://github.com/Antonio-Borrero/pokedex-app.git)
   ```
2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Ejecutar la suite de pruebas con:
   ```bash
   npm run test
   ```
4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

<br>

## Desafíos de Desarrollo y Aprendizaje

Al ser un proyecto autodidacta centrado en dominar herramientas modernas, me enfoqué en varios desafíos arquitectónicos clave:

- **Next.js:** Implementación de las funciones más recientes del ecosistema (App Router y hooks mejorados).
- **Gestión de Estado:** Uso de Zustand para un estado global ligero, rápido y escalable para favoritos y filtros.
- **Optimización:** Integración de Scroll Infinito y carga de imágenes optimizada para manejar grandes volúmenes de datos de la PokéAPI.
- **Tailwind:** Experimentación con el nuevo motor de TailwindCSS 4 para crear una interfaz responsiva con menos código.
- **Cultura de Testing:** Priorización de la fiabilidad mediante pruebas unitarias para asegurar las funcionalidades principales.

<br>

## Capturas de Pantalla

| Main Grid                                      | Main List                                      | Preview                                      |
| ---------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| ![Pokemon Grid](screenshots/pokemon-grid.webp) | ![Pokemon List](screenshots/pokemon-list.webp) | ![Preview](screenshots/pokemon-preview.webp) |

| Types Filter                                            | Generations Filter                                                  | Details                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| ![Pokemon types filter](screenshots/pokemon-types.webp) | ![pokemon generations filter](screenshots/pokemon-generations.webp) | ![Pokemon Details](screenshots/pokemon-details.webp) |

| Mobile view                                                  |
| ------------------------------------------------------------ |
| ![pokemon Mobile view](screenshots/pokemon-mobile-view.webp) |

<br>

## Fuente de Datos

Esta aplicación utiliza PokéAPI para obtener datos de Pokémon, incluyendo tipos, generaciones, cadenas de evolución y sprites.
