import { redirect } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { ROUTES } from "@/constants/routes";
import ClientPage from "./page.client";

const Page = async ({ params }: { params: { id: string } }) => {
  const docRef = doc(db, 'admin', params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return redirect(ROUTES.ADMIN_LOGIN);
  }
  return (
    <ClientPage />
  );
};

export default Page;
