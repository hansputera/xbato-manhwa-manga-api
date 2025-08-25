import { type } from 'arktype';

export const searchQueryValidator = type({
    query: 'string > 2',
});
