import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const Page = () => {
  redirect(ROUTES.USER_LOGIN);
};

export default Page;
