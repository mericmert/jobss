import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"}>
            <h1 className='font-bold text-2xl text-secondary-foreground'>
                jobs<span className='text-sky-500'>s</span>
            </h1>
        </Link>
    )
}
