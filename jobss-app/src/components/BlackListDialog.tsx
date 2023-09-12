import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import BlockIcon from '@mui/icons-material/Block';
import UsersTable from './UsersTable';




export default function BlackListDialog() {
    return (
        <Dialog>
            <DialogTrigger className="w-full text-start text-sm hover:bg-input/60 h-full p-2 flex justify-between">
                Blacklist <BlockIcon/>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]" >
                <DialogHeader>
                    <DialogTitle>Blacklist</DialogTitle>
                </DialogHeader>
                <UsersTable/>
            </DialogContent>
        </Dialog >
    )
}
