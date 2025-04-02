import { auth } from "@/lib/auth";
import {
  inferAdditionalFields,
  organizationClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_HOST!,
  plugins: [
    usernameClient(),
    organizationClient(),
    inferAdditionalFields<typeof auth>(),
    // genericOAuthClient(),
    // adminClient(),
    /* twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }), */
    // passkeyClient(),
    // multiSessionClient(),
    /* oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }), */
    // oidcClient(),
    // magicLinkClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const {
  signIn,
  signOut,
  signUp,
  updateUser,
  changePassword,
  changeEmail,
  deleteUser,
  useSession,
  revokeSession,
  getSession,
  resetPassword,
  sendVerificationEmail,
  linkSocial,
  forgetPassword,
  verifyEmail,
  listAccounts,
  listSessions,
  revokeOtherSessions,
  revokeSessions,
} = authClient;

/* export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session["user"];
export type Organization = typeof authClient.$Infer.Organization;
export type ActiveOrganization = typeof authClient.$Infer.ActiveOrganization;
export type Invitation = typeof authClient.$Infer.Invitation;
export type Member = typeof authClient.$Infer.Member;
export type Team = typeof authClient.$Infer.Team; */
