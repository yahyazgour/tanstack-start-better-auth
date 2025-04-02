import { tanstackStartCookies } from "@/lib/auth/plugins/tanstack-start-cookies";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization, username } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  appName: "tanstack-start-better-auth",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "https://tanstack-start-better-auth.vercel.app",
    "https://tanstack-start-better-auth.netlify.app/",
    "https://tanstack-start-better-auth.pages.dev/",
    "http://localhost:3000/",
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 5 * 60, // 5 minutes
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "Lax",
      secure: true,
      partitioned: true,
      httpOnly: true,
    },
    cookiePrefix: "tanstack-start-better-auth",
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 100, // max requests in the window
    storage: "database",
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
    /* additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    }, */
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    /* async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    }, */
  },
  emailVerification: {
    // sendOnSignUp: true,
    // autoSignInAfterVerification: true,
    /* async sendVerificationEmail({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: to || user.email,
        subject: "Verify your email address",
        html: `<a href="${url}">Verify your email address</a>`,
      });
      console.log(res, user.email);
    }, */
  },
  account: {
    accountLinking: {
      trustedProviders: [
        "discord",
        "twitch",
        "google",
        /* "github",
        "facebook",
        "microsoft",
        "twitter",
        "demo-app", */
      ],
    },
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    },
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    /* github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }, */
  },
  plugins: [
    username({
      minUsernameLength: 5,
      maxUsernameLength: 25,
    }),
    // nextCookies(),
    tanstackStartCookies(),
    openAPI(),
    organization({
      /* allowUserToCreateOrganization: async (user) => { 
        const subscription = await getSubscription(user.id) 
        return subscription.plan === "pro"
      }, */
      /* organizationCreation: {
        disabled: false, // Set to true to disable organization creation
        beforeCreate: async ({ organization, user }, request) => {
            // Run custom logic before organization is created
            // Optionally modify the organization data
            return {
                data: {
                    ...organization,
                    metadata: {
                        customField: "value"
                    }
                }
            }
        },
        afterCreate: async ({ organization, member, user }, request) => {
            // Run custom logic after organization is created
            // e.g., create default resources, send notifications
            await setupDefaultResources(organization.id)
        }
      }, */
      /* schema: {
        organization: {
          modelName: "server",
          fields: {
            name: "title",
          },
        },
      }, */
      /* async sendInvitationEmail(data) {
        await resend.emails.send({
          from,
          to: data.email,
          subject: "You've been invited to join an organization",
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink:
            process.env.NODE_ENV === "development"
            ? `http://localhost:3000/accept-invitation/${data.id}`
            : `${
              process.env.BETTER_AUTH_URL || "https://demo.better-auth.com"
            }/accept-invitation/${data.id}`,
          }),
        });
      }, */
    }),
    // oAuthProxy(),
    /* genericOAuth({
      config: [
        {
          providerId: "provider-id",
          clientId: "test-client-id",
          clientSecret: "test-client-secret",
          discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
          authorizationUrl: "https://slack.com/oauth/v2/authorize",
          tokenUrl: "https://slack.com/api/oauth.v2.access",
          scopes: ["users:read", "users:read.email"],
        },
      ],
    }), */
    /* twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Your OTP",
            html: `Your OTP is ${otp}`,
          });
        },
      },
    }), */
    /* magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {},
    }), */
    // passkey(),
    // bearer(),
    // admin(),
    // multiSession(),
    // oneTap(),
    /* oidcProvider({
      loginPage: "/sign-in",
    }), */
  ],
});

/* export type Session = typeof auth.$Infer.Session;
export type Organization = typeof auth.$Infer.Organization;
export type User = typeof auth.$Infer.Session["user"];
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type Invitation = typeof auth.$Infer.Invitation;
export type Member = typeof auth.$Infer.Member;
export type Team = typeof auth.$Infer.Team; */
