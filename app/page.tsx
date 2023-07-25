import Link from "next/link"
import CryptoInfo from "@/components/CryptoInfo"
import Post from "@/components/Post"

export default function Home() {
  return (
    <main className=""> 
       <CryptoInfo/>
       <Post/>
    </main>
  )
}
