"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
export default function About() {
    const {slag} = useParams();
    const [data, setData] = useState([]);
    const router = useRouter();
    console.log("https://jsonplaceholder.typicode.com/posts/"+slag);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/"+slag)
            .then((res) => res.json())
            .then((data) => setData(data)); 
    }, []);
    return (
        <div>
            <h1>{slag}</h1>
            <ul >
               <li> {JSON.stringify(data)}</li>
               <li> <button onClick={() => router.back()}>Back</button></li>
            </ul>
        </div>
    )
}