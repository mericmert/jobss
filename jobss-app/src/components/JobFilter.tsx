"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "./ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { useJobs } from "@/contexts/JobProvider"



export default function JobFilter() {

   const {setQuery} = useJobs();

    const handleRemoteCheckbox = (checked: boolean | string): void => {
        setQuery((prev) => (checked ? { ...prev, eligibility: "remote" } : { ...prev, eligibility: "" }))
    }
    const handleSortSelect = (e: string): void => {
        setQuery((prev) => ({ ...prev, sortBy: e }));
    }

    const resetFilters = () => {
        setQuery({
            location: "",
            eligibility: "",
            level: [],
            sortBy: "",
        });

        const inputs = document.querySelectorAll(".filter-container input");
        const checkboxes = document.querySelectorAll('button[data-state="checked"]');
        inputs.forEach((input: any) => {
            input.value = "";
        })

        checkboxes.forEach((checkbox: any) => {
            checkbox.click();
        })

    }

    return (
        <div className="hidden md:block filter-container fixed w-72 h-full bg-background border-r-[1px] pt-6">
            <div className="w-full flex justify-end">
                <Button onClick={resetFilters} className="bg-none! hover:bg-none! text-sky-500 text-sm">Clear filters</Button>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-3">Location</AccordionTrigger>
                    <AccordionContent className="p-3 pb-0">
                        <Input onChange={(e) => setQuery((prev) => ({ ...prev, location: e.target.value }))} className="h-8" placeholder="Enter your location preference" />
                        <div className="flex ml-1 items-center gap-x-1 mt-4">
                            <Checkbox id="remote-eligibility" onCheckedChange={(e) => handleRemoteCheckbox(e)} />
                            <Label htmlFor="remote-eligibility" className="text-primary/80">Remote Eligible</Label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-3">Level</AccordionTrigger>
                    <AccordionContent className="p-3">
                        <section className="flex flex-wrap gap-y-6 justify-center items-center">
                            <div className="flex items-center gap-x-1 w-32">
                                <Checkbox
                                    id="junior-level"
                                    onCheckedChange={(e) => setQuery((prev) => (e ? { ...prev, level: [...prev.level, "junior"] } : { ...prev, level: prev.level.filter(level => level !== "junior") }))}
                                />
                                <Label htmlFor="junior-level" className="text-primary/80">Junior</Label>
                            </div>
                            <div className="flex items-center gap-x-1 w-32">
                                <Checkbox
                                    id="senior-level"
                                    onCheckedChange={(e) => setQuery((prev) => (e ? { ...prev, level: [...prev.level, "senior"] } : { ...prev, level: prev.level.filter(level => level !== "senior") }))}
                                />
                                <Label htmlFor="senior-level" className="text-primary/80">Senior</Label>
                            </div>
                            <div className="flex items-center gap-x-1 w-32">
                                <Checkbox
                                    id="intern-level"
                                    onCheckedChange={(e) => setQuery((prev) => (e ? { ...prev, level: [...prev.level, "intern"] } : { ...prev, level: prev.level.filter(level => level !== "intern") }))}
                                />
                                <Label htmlFor="intern-level" className="text-primary/80">Intern</Label>
                            </div>
                            <div className="flex items-center gap-x-1 w-32">
                                <Checkbox
                                    id="mid-level"
                                    onCheckedChange={(e) => setQuery((prev) => (e ? { ...prev, level: [...prev.level, "mid"] } : { ...prev, level: prev.level.filter(level => level !== "mid") }))}
                                />
                                <Label htmlFor="mid-level" className="text-primary/80">Mid</Label>
                            </div>
                        </section>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-3">Sort By</AccordionTrigger>
                    <AccordionContent className="p-3">
                        <Select defaultValue="" onValueChange={(e) => handleSortSelect(e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sort Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Relevance</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
