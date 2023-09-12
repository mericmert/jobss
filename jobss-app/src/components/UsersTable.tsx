import { ThemeProvider, createTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { User } from 'models';
import { UserUtil } from '@/lib/UserUtil';
import Image from 'next/image';
import Blacklist from './Blacklist';


export default function UsersTable() {


    const columns: GridColDef[] = [
        {
            field: 'picture', headerName: "", width: 70,
            renderCell: (params) => {
                return <Image src={params.row.picture} alt='avatar' width={40} height={40} />
            }
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'full_name', headerName: 'Full name', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 240,
        },
        {
            field: "blacklist", headerName: "", width: 120, sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return <Blacklist params={params} />
            }
        }
    ]
    const [users, setUsers] = useState<User[]>([]);
    const theme = useTheme();
    const darkTheme = createTheme({
        palette: {
            mode: theme.resolvedTheme === "dark" ? "dark" : "light",
        },
    });

    const fetchUsers = async () => {
        let data: User[] = await UserUtil.getUsers();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <DataGrid className="!text-primary"
                style={{ minHeight: "150px" }}
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                rowSelection={false}
            />
        </ThemeProvider>
    )
}
