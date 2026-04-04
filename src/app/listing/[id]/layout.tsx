import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    alternates: {
      canonical: `/listing/${id}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
