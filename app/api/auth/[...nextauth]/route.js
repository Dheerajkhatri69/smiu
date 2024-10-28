import { dbConnect } from "@/lib/dbConnect"; // Assuming dbConnect is created
import { Users } from "@/lib/model/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { StudentSignupEmail } from "@/lib/model/studentSignupEmail";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                id: { label: "ID", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { id, email, password } = credentials;
                await dbConnect(); // Centralized DB connection

                let user;

                // Check if credentials for CMS or admission
                if (email) {
                    user = await StudentSignupEmail.findOne({ email });
                    if (!user) {
                        console.error("Admission user not found:", email);
                        throw new Error('Invalid email or password');
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        console.error("Password mismatch for admission user:", email);
                        throw new Error('Invalid email or password');
                    }

                    return {
                        cnic: user.cnic,
                        email: user.email,
                        role: "admissionUser",
                    };
                } else if (id) {
                    user = await Users.findOne({ id });
                    if (!user) {
                        console.error("CMS user not found:", id);
                        throw new Error('Invalid ID or password');
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        console.error("Password mismatch for CMS user:", id);
                        throw new Error('Invalid ID or password');
                    }

                    return {
                        id: user.id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        image: user.image,
                        role: "cmsUser",
                    };
                }

                throw new Error('Please provide either an email or ID');
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/", // Use a custom sign-in page for both CMS and Admission
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                if (user.role === "cmsUser") {
                    token.id = user.id;
                    token.fname = user.fname;
                    token.lname = user.lname;
                    token.email = user.email;
                    token.role = "cmsUser";
                } else if (user.role === "admissionUser") {
                    token.cnic = user.cnic;
                    token.email = user.email;
                    token.role = "admissionUser";
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role === "cmsUser") {
                session.user.id = token.id;
                session.user.fname = token.fname;
                session.user.lname = token.lname;
                session.user.email = token.email;
                session.user.role = token.role;
            } else if (token.role === "admissionUser") {
                session.user.cnic = token.cnic;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
        async redirect({ url, baseUrl, token }) {
            if (token?.role === "cmsUser") {
                return `${baseUrl}/dashboard`;
            } else if (token?.role === "admissionUser") {
                return `${baseUrl}/admissiondashboard`;
            }
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
