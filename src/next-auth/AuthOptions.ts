
import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';


export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "My Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your Password",
        },
      },

      async authorize(credentials) {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

          if (!response.ok) {
          throw new Error( "Login failed");
        }
        const payload = await response.json();
        console.log("payload:", payload);

        const decoded: { id: string } = jwtDecode(payload.token);
        console.log("MyToken:", payload.token);
          console.log("decoded:", decoded);

        return {
          id: decoded.id,
          name: payload.user.name,
          email: payload.user.email,
          token: payload.token,
        };
      },
    }),
  ],
 callbacks: {
  jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.token = user.token;
        token.email = user.email;
      token.accessToken = user.token;
    }
    console.log("Token....",token);
    return token;
  },
  session({session,token}){
     if(token){
      session.user.id=token.id ?? "";
     session.user.name = token.name;
     session.user.email = token.email ?? "";     }
     return session
  }
},
  pages: {
    signIn: '/login',
  },
};


