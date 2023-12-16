"use client";
import { useRouter,useParams  } from "next/navigation";
import React from "react";
import { Tab, Tabs } from "@nextui-org/react";

export default function Search() {
  const router = useRouter();
  const { q } = useParams();


  return (
    <div className="flex">
      <h3>Search value: {q}</h3>
      <Tabs size="md" aria-label="Tabs sizes">
        <Tab key="places" title="Places" />
        <Tab key="posts" title="Posts" />
        <Tab key="account" title="Account" />
        <Tab key="Tags" title="Tags" />
      </Tabs>
    </div>
  );
}
