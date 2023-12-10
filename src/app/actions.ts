"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export const getAllEntries = async () => {
    const response = await fetch('http://localhost:3000/api/journal', {
      next: {
        revalidate: 0
      }
    });
    const data = await response.json()
    return data
}

export const getSpecificEntry = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/journal/${id}`,{
        next: {
          revalidate: 0
        }
    });
    const data = await response.json();
    return data
}

export const createEntry = async (data: {title: string, content: string}) =>{
    await fetch("http://localhost:3000/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send title and content data
      });
    revalidatePath("/")
    redirect('/')
}

export const editEntry = async (id:string, data:{title:string, content:string}) => {
    await fetch(`http://localhost:3000/api/journal/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    revalidatePath("/")
    redirect(`/entry/${id}`)
}

export const deleteEntry = async (id:string) => {
    await fetch(`http://localhost:3000/api/journal/${id}`, {
        method: "DELETE",
    });
    revalidatePath("/")
    redirect("/")
}