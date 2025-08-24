import { type } from 'arktype';

export const searchQueryValidator = type({
    query: 'string.trim',
});
