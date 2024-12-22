import { checkUser } from "@/lib/checkUser";

export async function UserCheck() {
  await checkUser({ isForServerAction: false });
  return null;
}
