/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MatchImport } from './routes/match'
import { Route as LoginImport } from './routes/login'
import { Route as FavoritesImport } from './routes/favorites'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const MatchRoute = MatchImport.update({
  id: '/match',
  path: '/match',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const FavoritesRoute = FavoritesImport.update({
  id: '/favorites',
  path: '/favorites',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/favorites': {
      id: '/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof FavoritesImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/match': {
      id: '/match'
      path: '/match'
      fullPath: '/match'
      preLoaderRoute: typeof MatchImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/favorites': typeof FavoritesRoute
  '/login': typeof LoginRoute
  '/match': typeof MatchRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/favorites': typeof FavoritesRoute
  '/login': typeof LoginRoute
  '/match': typeof MatchRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/favorites': typeof FavoritesRoute
  '/login': typeof LoginRoute
  '/match': typeof MatchRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/favorites' | '/login' | '/match'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/favorites' | '/login' | '/match'
  id: '__root__' | '/' | '/favorites' | '/login' | '/match'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FavoritesRoute: typeof FavoritesRoute
  LoginRoute: typeof LoginRoute
  MatchRoute: typeof MatchRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FavoritesRoute: FavoritesRoute,
  LoginRoute: LoginRoute,
  MatchRoute: MatchRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/favorites",
        "/login",
        "/match"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/favorites": {
      "filePath": "favorites.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/match": {
      "filePath": "match.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
