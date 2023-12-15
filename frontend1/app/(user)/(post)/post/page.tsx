import React from "react";
import { Tabs, Tab } from "@nextui-org/react";


export default function PostMain() {

  return (
    <div className="flex flex-wrap gap-4">
 
        <Tabs variant='underlined'>
        
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
      
    </div>
  );
}
