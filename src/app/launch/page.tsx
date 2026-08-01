import { redirect } from "next/navigation";

/** Launches folded into roster to avoid duplicate surfaces. */
export default function LaunchRedirect() {
  redirect("/cohort");
}
