import { Heart } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { FoodCard, EmptyState, PageIntro } from "@/components/qbite/shared";
import { foodItems } from "@/data/qbite";
import { useQBite } from "@/context/qbite-context";
export const Route=createFileRoute("/favorites")({head:()=>({meta:[{title:"Favorites — QBite"},{name:"description",content:"Quickly reorder your favorite campus canteen food."},{property:"og:title",content:"Favorites — QBite"},{property:"og:description",content:"Your campus food favorites in one place."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Favorites});
function Favorites(){const{favorites}=useQBite();const items=foodItems.filter(i=>favorites.includes(i.id));return <div className="space-y-6"><PageIntro eyebrow="Saved for later" title="Your Favorites" description="The campus picks you come back to."/>{items.length?<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(i=><FoodCard key={i.id} item={i}/>)}</div>:<EmptyState icon={<Heart/>} title="No favorites yet" description="Tap the heart on a food item to keep it close." actionLabel="Browse Menu" to="/menu"/>}</div>}
