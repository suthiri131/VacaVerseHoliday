"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function Feed() {
  return (
    <div className="flex flex-wrap align-middle gap-4">
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="following" title="For You" />
        <Tab key="music" title="Music" />
        <Tab key="videos" title="Videos" />
      </Tabs>
    </div>
  );
}
