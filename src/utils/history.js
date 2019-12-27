import { createHistory, createMemorySource } from '@reach/router';

const source = createMemorySource('/');
export const history = createHistory(source);
export const { navigate } = history;
