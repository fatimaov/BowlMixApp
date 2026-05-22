# BowlMix Public Architecture

## Overview

BowlMix is designed as a decoupled full-stack application with a separate frontend, backend API, and PostgreSQL database.

## Stack

- React + Vite for the frontend
- Flask for the backend API
- PostgreSQL for data storage

## Architecture Split

### Frontend

- renders the interface
- manages navigation and forms
- sends requests to the backend

### Backend

- handles authentication
- runs bowl generation logic
- validates requests
- persists application data

### Database

- stores users
- stores ingredients and availability state
- stores saved bowls

## Authentication Overview

BowlMix uses JWT-based authentication for protected features. Public demo access is intended to remain available without login.

## Generation System Overview

The app supports two main generation paths:

- Build Mode for user-led bowl creation
- Generate Mode for automatic bowl suggestions

Generation logic lives on the backend so behavior stays centralized and consistent.

## Deployment Overview

The planned deployment model separates:

- a static frontend
- a Flask API backend
- a PostgreSQL database

