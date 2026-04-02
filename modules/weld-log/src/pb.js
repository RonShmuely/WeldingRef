import PocketBase from 'pocketbase';

// Dev → localhost. Production (served by PocketBase) → same origin.
const url = import.meta.env.DEV
  ? 'http://127.0.0.1:8090'
  : window.location.origin;

export const pb = new PocketBase(url);
