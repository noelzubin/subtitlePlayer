interface ISubtitle {
    subtitle: string;
    closeSubtitle: VoidFunction;
}

const Subtitle: React.FC<ISubtitle> = ({ subtitle, closeSubtitle }) => {
    return <div className="bg-zinc-900 rounded-md text-gray-200 p-4 text-center grow">
        {subtitle}
        <button className="absolute right-3 top-3" onClick={() => closeSubtitle()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
        </button>
    </div>
}

export default Subtitle;