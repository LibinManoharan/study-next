// async function dataFetch() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     return data;
// }   

// export default async function About() {
//     const data = await dataFetch();
//     return (
//         <div>
//             <h1>{JSON.stringify(data)}</h1>
//         </div>
//     )
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function About() {

    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setData(data)); 
    }, []);
    console.log(data);  
    return (
        <div>
            <h1>About</h1>
            <ul >
                {data.map((item: any) => (
                    <li key={item.id} onClick={() => router.push(`/about/${item.id}`)}>{item.id}</li>
                ))}
            </ul>
        </div>
    )
}