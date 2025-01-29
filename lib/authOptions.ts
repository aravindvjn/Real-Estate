import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { query } from './db';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },

    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account, profile }: { token: JWT; account?: any; profile?: any }) {
            if (account?.provider && profile) {
                try {
                    const existingUser = await query(
                        'SELECT user_id, profile_picture_url FROM users WHERE email = $1',
                        [profile.email]
                    );
                    if (existingUser.rows.length > 0) {
                        const user = existingUser.rows[0];
                        token.id = user.user_id;
                        token.email = profile.email;
                        token.picture = user.profile_picture_url || profile.picture || null;
                    } else {
                        token.isNewUser = true;
                    }
                } catch (error) {
                    console.error('Error during user check:', error);
                }
            }

            return token;
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: { session: any; token: JWT }) {
            if (token) {
                session.user = session.user || {};
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.isNewUser = token.isNewUser || false; 
            }
            return session;
        },


    },

    secret: process.env.SECRET,

    pages: {
        signIn: '/auth',
    },
};
