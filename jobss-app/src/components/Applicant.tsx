import { Application } from "models";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ApplicationUtil } from "@/lib/ApplicationUtil";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export default function Applicant({ data }: { data: Application }) {

    const [status, setStatus] = useState<string>(data.status);
    const {toast} = useToast();

    const verify = async () => {
        try {
            await ApplicationUtil.verify(data.id);
            setStatus("VERIFIED");
            toast({
                title: "Succesful",
                description : "You have succesfully set the status!"
            })

        } catch (err) {
            console.log(err);
        }
    }
    const reject = async () => {
        try {
            await ApplicationUtil.reject(data.id);
            setStatus("REJECTED");
            toast({
                title: "Succesful",
                description : "You have succesfully set the status!"
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex items-start w-full justify-start gap-x-2 bg-primary text-background p-2'>
            <Button onClick={verify} disabled={status === "VERIFIED"} className='h-8 w-8 bg-green-700 hover:bg-green-900 text-white'><CheckIcon /></Button>
            <Button onClick={reject} disabled={status === "REJECTED"} className='h-8 w-8 bg-destructive hover:bg-destructive/50 text-white'><CloseIcon /></Button>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="h-8 w-[370px] text-sm">{data.fullName}</AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li><span className='font-bold'>Status: </span>{status}</li>
                            <li><span className='font-bold'>Major: </span>{data.major}</li>
                            <li><span className='font-bold'>School:</span> {data.school}</li>
                            <li><span className='font-bold'>Cover Letter:</span> {data.coverLetter}</li>

                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
