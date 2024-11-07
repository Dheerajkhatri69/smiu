"use client"

import { HoverEffect } from "../ui/card-hover-effect-addmiss";

export function NotificationAddmiss({projects}) {

  return (
    (<div className="container mx-auto px-8">
      <HoverEffect items={projects} />
    </div>)
  );
}