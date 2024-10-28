import { withAuth } from "next-auth/middleware";

export const config = {
  // Protect both /dashboard and /admissiondashboard routes and their sub-routes
  matcher: ["/dashboard/:path*", "/admissiondashboard/:path*"],
};

// Export the middleware with role-based authorization logic
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Ensure the user is authenticated by checking if a valid token exists
      if (!token) return false;

      const pathname = req.nextUrl.pathname;

      // Check if the user is accessing the /dashboard route and has the cmsUser role
      if (pathname.startsWith("/dashboard") && token.role === "cmsUser") {
        return true;
      }

      // Check if the user is accessing the /admissiondashboard route and has the admissionUser role
      if (pathname.startsWith("/admissiondashboard") && token.role === "admissionUser") {
        return true;
      }

      // Deny access if the role does not match the path
      return false;
    },
  },
});
