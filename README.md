# Sudoku

Sudoku web application built with React, consuming an external API to automatically generate new boards.

## Technologies

- React
- Vite
- TypeScript
- CSS
- Sudoku API (`https://sudoku-api.vercel.app`)

## Demo

Live project:  
[https://sudoku-vicbaltazar.netlify.app/](https://sudoku-vicbaltazar.netlify.app/)

## Features

- Generate new puzzles from the API
- Highlight row, column, and 3x3 box of the selected cell
- **Check** button to validate the current solution
- **Reset** button to restore the initial puzzle state
- **New Puzzle** button to load a fresh board

## How to run locally

```bash
git clone https://github.com/vicbaltazar/sudoku.git
cd sudoku/sudoku
npm install
npm run dev
