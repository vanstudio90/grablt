// Parallel slot default — renders nothing when no intercepting route matches.
// Required by Next.js for parallel routes so unmatched slots have a fallback.
export default function Default() {
  return null;
}
