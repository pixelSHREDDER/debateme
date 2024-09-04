import { UserProfile } from '@auth0/nextjs-auth0/client'

export const getUsers: () => UserProfile[] = () => [
    {
      nickname: 'ron.swanson12345',
      name: 'Ron Swanson',
      picture: 'https://s.gravatar.com/avatar/7642279092c16299a6a93e7523cc9ed2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Frs.png',
      updated_at: '2024-08-17T04:12:58.145Z',
      email: 'ron.swanson12345@excellent-parser.name',
      email_verified: false,
      sub: 'auth0|1234567890abcdefghij1234',
      sid: 'o_abcdefgh12345678-ABCDEF12345',
    },
    {
      nickname: 'leslie.knope54321',
      name: 'Leslie Knope',
      picture: 'https://s.gravatar.com/avatar/7642279092c16299a6a93e7523cc9ed2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Flk.png',
      updated_at: '2024-08-17T04:12:58.145Z',
      email: 'leslie.knope54321@excellent-parser.name',
      email_verified: false,
      sub: 'auth0|abcdefghij1234567890abcd',
      sid: 'o_12345678abcdefgh-12345ABCDEF',
    },
  ] as const
