import { createClient } from 'contentful';

// conect to contentful
export const client = createClient({
    // space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
    // accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY ?? '',
    space: 'tyfq63c2cv6i' ?? '',
    accessToken: '8vVV70QWvNUOVo4u5E1raH7JodHrLoFx6tnAUx3VhQ8' ?? '',
});
