import { connection } from "next/server";
import { Suspense } from "react";

async function CurrentYearValue() {
  await connection();
  return new Date().getFullYear();
}

export default function CurrentYear() {
  return (
    <Suspense fallback={null}>
      <CurrentYearValue />
    </Suspense>
  );
}
