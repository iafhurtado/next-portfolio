import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "8b4d10a715840445ccd7f90a6f984fb8";

// Create client with fallback to your actual client ID
export const client = createThirdwebClient({
  clientId: clientId,
});
