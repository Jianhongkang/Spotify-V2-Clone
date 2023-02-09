import type { NextPage } from 'next';
import { getSession, getProviders, useSession } from "next-auth/react";
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';
import Login from "./login";



export default function Home({ providers }) {
  const { data: session, status } = useSession();
  return (
    <div className="bg-black h-screen overflow-hidden">
     
      {session ? (
        <>
          <main className="flex">
            <Sidebar />
            <Center />
          </main>
          <div className="sticky bottom-0">
            <Player />
          </div>
        </>
      ) : (
        <Login providers={providers} />
      )}
    </div>
  );
}

export async function getServerSideProps(){
  const session = await getSession();
  const providers = await getProviders();

  return {
    props: {
      session,
      providers,

    },
  };
}




