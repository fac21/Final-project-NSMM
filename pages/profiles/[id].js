// import Image from "next/image";
import Link from "next/link";


import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
export default function Profile() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
          <Link><a href="/"> Go to log in page</a> </Link>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div>
        <h1> "Name" Chummy profile ...</h1>
        <p>{content}</p>
      </div>
    </main>
  );
}
