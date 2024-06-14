import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [GitHub],
  callbacks: {
    authorized({ auth }: any) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }: any) {
      try {
        const { email, fullName } = user;
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email, fullName });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }: any) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
