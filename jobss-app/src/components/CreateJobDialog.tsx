"use client"
import { useState } from "react";
import CreateJobForm from "./CreateJobForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";


export default function CreateJobDialog() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    return (
        <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
            <DialogTrigger className="w-full text-start text-sm hover:bg-input/60 h-full p-2 flex justify-between">
                New Post <AddCircleOutlineIcon />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    New Post
                </DialogHeader>
                <CreateJobForm setOpenDialog={setOpenCreateModal} />
            </DialogContent>
        </Dialog>
    )
}
